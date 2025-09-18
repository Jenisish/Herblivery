#!/bin/bash

# HerbTrace Development Setup Script
echo "🌱 Setting up HerbTrace development environment..."

# Check if .env files exist
check_env_file() {
    if [ ! -f "$1" ]; then
        echo "❌ Missing: $1"
        echo "📝 Please copy from $1.example and update with your values"
        exit 1
    else
        echo "✅ Found: $1"
    fi
}

# Check backend .env
check_env_file ".env"

# Check mobile app .env
check_env_file "mobile-app/HerbTraceApp/.env"

echo ""
echo "🔒 Security checklist:"
echo "   • MongoDB credentials are in .env (not hardcoded)"
echo "   • .env files are in .gitignore"
echo "   • Production URLs are environment-specific"
echo "   • Debug mode is configurable"
echo ""

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd /Users/king/Documents/HerbTrace
source .venv/bin/activate
pip install -r requirements.txt

# Test environment loading
echo "🧪 Testing environment variable loading..."
python -c "
from dotenv import load_dotenv
import os
load_dotenv()

# Check critical variables
mongo_uri = os.getenv('MONGO_URI')
if mongo_uri and 'mongodb' in mongo_uri:
    print('✅ MongoDB URI loaded')
else:
    print('❌ MongoDB URI missing or invalid')
    
api_title = os.getenv('API_TITLE', 'HerbTrace API')
print(f'✅ API Title: {api_title}')

debug = os.getenv('DEBUG', 'False')
print(f'✅ Debug mode: {debug}')
"

# Install mobile app dependencies
echo "📱 Checking mobile app dependencies..."
cd mobile-app/HerbTraceApp
if [ -f "package.json" ]; then
    npm install
    echo "✅ Mobile app dependencies installed"
else
    echo "⚠️  Mobile app package.json not found"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🚀 To start development:"
echo "   Backend:    cd /Users/king/Documents/HerbTrace && source .venv/bin/activate && uvicorn main:app --reload --host 0.0.0.0 --port 8001"
echo "   Mobile App: cd mobile-app/HerbTraceApp && npx expo start"
echo ""
echo "🔧 Configuration files:"
echo "   Backend config: .env"
echo "   Mobile config:  mobile-app/HerbTraceApp/.env"
echo "   Security docs:  SECURITY.md"