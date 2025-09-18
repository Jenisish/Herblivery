#!/bin/bash

# Railway Deployment Script for HerbTrace
echo "🚀 Deploying HerbTrace to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Please install it first:"
    echo "   npm install -g @railway/cli"
    exit 1
fi

# Check if .env file exists
if [ ! -f .env ]; then
    echo "❌ .env file not found. Please create it first with your environment variables."
    exit 1
fi

# Login to Railway (if not already logged in)
echo "🔐 Checking Railway authentication..."
railway login

# Link to Railway project (you'll need to create one first)
echo "🔗 Linking to Railway project..."
railway link

# Load and set environment variables from .env file
echo "⚙️  Setting environment variables from .env file..."
echo "📝 Loading environment variables..."

# Read .env file and set variables in Railway
while IFS= read -r line; do
    # Skip comments and empty lines
    if [[ $line =~ ^[[:space:]]*# ]] || [[ -z "${line// }" ]]; then
        continue
    fi
    
    # Extract key-value pairs
    if [[ $line =~ ^([^=]+)=(.*)$ ]]; then
        key="${BASH_REMATCH[1]}"
        value="${BASH_REMATCH[2]}"
        
        # Skip certain local development variables
        if [[ $key != "DEBUG" && $key != "HOST" && $key != "PORT" ]]; then
            echo "Setting $key..."
            railway variables set "$key=$value"
        fi
    fi
done < .env

echo "✅ Environment variables set successfully!"

# Deploy to Railway
echo "🚀 Deploying application..."
railway up

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at your Railway domain"
echo "🔧 Don't forget to update your mobile app's production URL with the new Railway domain"