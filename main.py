from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI(
    title=os.getenv("API_TITLE", "HerbTrace API"),
    description=os.getenv("API_DESCRIPTION", "Ayurvedic Herb Traceability System"),
    version=os.getenv("API_VERSION", "1.0.0")
)

# Get CORS origins from environment
allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")

# Add CORS middleware for mobile app support
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Get MongoDB configuration from environment
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise ValueError("MONGO_URI environment variable is required")

MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "database")
MONGO_COLLECTION_NAME = os.getenv("MONGO_COLLECTION_NAME", "packaging")

client = MongoClient(MONGO_URI, tls=True, tlsAllowInvalidCertificates=True)
db = client[MONGO_DB_NAME]
collection = db[MONGO_COLLECTION_NAME]

# Debug info (only in development)
if os.getenv("DEBUG", "False").lower() == "true":
    print(f"📊 Connected to MongoDB: {MONGO_DB_NAME}")
    print(f"📦 Using collection: {MONGO_COLLECTION_NAME}")

packaging_col = db["packaging"]
retailers_col = db["retailers"]
farm_batches_col = db["farm_batches"]
herbs_col = db["herbs"]
processing_col = db["processing"]

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/get_package/{package_id}")
async def get_package(package_id: str):
    # 1. Package details
    package = packaging_col.find_one({"package_id": package_id}, {"_id": 0})
    if not package:
        return {"error": "Package not found"}

    # 2. Retailer details
    retailer = retailers_col.find_one({"package_id": package_id}, {"_id": 0})

    # 3. Ingredients → join farm, herb, processing
    detailed_ingredients = []
    for ing in package.get("ingredients", []):
        batch_id = ing["batch_id"]

        # farm batch
        farm = farm_batches_col.find_one({"batch_id": batch_id}, {"_id": 0}) or {}

        # herb details
        herb = {}
        if farm.get("herb_id"):
            herb = herbs_col.find_one({"herb_id": farm["herb_id"]}, {"_id": 0}) or {}

        # processing
        processes = list(processing_col.find({"batch_id": batch_id}, {"_id": 0}))

        # normalize output_form to always include english + sanskrit
        for p in processes:
            if isinstance(p.get("output_form"), dict):
                pass  # already has both
            else:
                # fallback if DB only has one string
                p["output_form"] = {"english": str(p.get("output_form")), "sanskrit": "-"}

        detailed_ingredients.append({
            "batch_id": batch_id,
            "form": ing.get("form") if isinstance(ing.get("form"), dict) else {"english": str(ing.get("form")), "sanskrit": "-"},
            "farm_details": farm,
            "herb_details": herb,
            "processing_details": processes
        })

    # normalize packaging_type
    if isinstance(package.get("packaging_type"), dict):
        pass
    else:
        package["packaging_type"] = {"english": str(package.get("packaging_type")), "sanskrit": "-"}

    response = {
        "package_details": package,
        "retailer_details": retailer,
        "ingredients": detailed_ingredients
    }
    return JSONResponse(content=response)
