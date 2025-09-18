#!/bin/bash

# Railway Deployment Script for HerbTrace
echo "🚀 Deploying HerbTrace to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Please install it first:"
    echo "   npm install -g @railway/cli"
    exit 1
fi

# Login to Railway (if not already logged in)
echo "🔐 Checking Railway authentication..."
railway login

# Link to Railway project (you'll need to create one first)
echo "🔗 Linking to Railway project..."
railway link

# Set environment variables
echo "⚙️  Setting environment variables..."
# railway variables set MONGO_URI="your-mongodb-connection-string"

# Deploy to Railway
echo "🚀 Deploying application..."
railway up

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at your Railway domain"