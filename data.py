import json
from pymongo import MongoClient

# Connect to MongoDB Atlas
client = MongoClient("mongodb+srv://HerbTraceDBAdmin:Dqml1HerbTrace@herbtracedb.bpo4akz.mongodb.net/HerbTraceDB?retryWrites=true&w=majority")
db = client["database"]

# Load dataset
with open("ayurvedic_traceability_dataset_v2.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# Insert into collections
db.herbs.insert_many(data["herbs"])
db.farm_batches.insert_many(data["farm_batches"])
db.processing.insert_many(data["processing"])
db.packaging.insert_many(data["packaging"])
db.retailers.insert_many(data["retailers"])
db.blockchain_ledger.insert_many(data["blockchain_ledger"])

print("✅ Data inserted successfully into MongoDB Atlas!")
