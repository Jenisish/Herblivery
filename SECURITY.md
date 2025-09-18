# HerbTrace Security Documentation

## Environment Variables Setup

This document explains how to securely configure HerbTrace using environment variables.

### Backend Environment Variables (.env)

Create a `.env` file in the root directory with the following variables:

```bash
# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
MONGO_DB_NAME=database
MONGO_COLLECTION_NAME=packaging

# Server Configuration
PORT=8001
HOST=0.0.0.0
DEBUG=True

# API Configuration
API_TITLE=HerbTrace API
API_DESCRIPTION=Ayurvedic Herb Traceability System
API_VERSION=1.0.0

# CORS Configuration
ALLOWED_ORIGINS=*

# Security Keys
SECRET_KEY=your-secret-key-here
API_KEY=your-api-key-here

# Railway Deployment URL
RAILWAY_URL=https://your-app.railway.app
```

### Mobile App Environment Variables (.env)

Create a `.env` file in `mobile-app/HerbTraceApp/` with:

```bash
# Development Backend URL
EXPO_PUBLIC_API_DEV_URL=http://192.168.40.183:8001

# Production Backend URL
EXPO_PUBLIC_API_PROD_URL=https://your-app.railway.app

# API Configuration
EXPO_PUBLIC_API_TIMEOUT=10000
EXPO_PUBLIC_CONNECTION_TIMEOUT=5000

# App Configuration
EXPO_PUBLIC_APP_NAME=HerbTrace
EXPO_PUBLIC_APP_VERSION=1.0.0
EXPO_PUBLIC_DEBUG_LOGS=true
```

### Security Best Practices

1. **Never commit `.env` files to git**
2. **Use strong, unique passwords for MongoDB**
3. **Generate secure SECRET_KEY for production**
4. **Restrict CORS origins in production**
5. **Use HTTPS in production**
6. **Regularly rotate API keys**

### Production Deployment

For production deployment:

1. Set `DEBUG=False` in backend `.env`
2. Update `ALLOWED_ORIGINS` to specific domains
3. Use strong `SECRET_KEY` and `API_KEY`
4. Update mobile app production URL after Railway deployment
5. Enable MongoDB IP whitelisting

### Environment Files Structure

```
HerbTrace/
├── .env                          # Backend environment variables
├── .env.example                  # Backend template
├── mobile-app/HerbTraceApp/
│   ├── .env                      # Mobile app environment variables
│   └── .env.example              # Mobile app template
```

### Loading Environment Variables

- **Backend**: Uses `python-dotenv` to load `.env` file
- **Mobile App**: Expo automatically loads variables with `EXPO_PUBLIC_` prefix
- **Deployment**: Railway deployment script reads `.env` and sets variables

### Troubleshooting

- Ensure `.env` files are in correct directories
- Check that `python-dotenv` is installed for backend
- Verify Expo environment variables have `EXPO_PUBLIC_` prefix
- Restart servers after changing environment variables