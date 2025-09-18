# 🌱 HerbTrace - Complete Herb Traceability System

[![React Native](https://img.shields.io/badge/React%20Native-0.72-blue.svg)](https://reactnative.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.104-green.svg)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://mongodb.com/)
[![Expo](https://img.shields.io/badge/Expo-SDK%2049-000020.svg)](https://expo.dev/)

A comprehensive herb traceability application providing complete transparency in the ayurvedic herb supply chain from farm to consumer.

## 🎯 Features

### 📱 Mobile App (React Native + Expo)
- **QR Code Scanner**: Native camera integration for instant package scanning
- **Complete Traceability**: View entire supply chain journey
- **Professional UI**: Modern design with smooth navigation
- **Cross-Platform**: iOS and Android support
- **Real-time Data**: Live connection to backend API

### 🌐 Web Application
- **Modern Interface**: Responsive design with animations
- **Interactive Scanner**: Web-based QR code scanning
- **Herb Tracking**: Real-time package lookup
- **Professional Landing**: Business-ready presentation

### ⚙️ Backend API (FastAPI)
- **RESTful API**: Complete herb data endpoints
- **MongoDB Integration**: Cloud database with Atlas
- **CORS Support**: Mobile and web app connectivity
- **Environment Security**: Secure configuration management

## 🏗️ Architecture

```
📱 React Native Mobile App     🌐 Web Application
        ↓                            ↓
        🔗 HTTP/JSON API
        ↓
🐍 FastAPI Backend Server
        ↓
🗄️ MongoDB Atlas Database
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB Atlas account
- Expo CLI

### 1. Backend Setup

```bash
# Clone repository
git clone https://github.com/Jenisish/Herblivery.git
cd Herblivery

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your MongoDB credentials

# Start backend server
uvicorn main:app --reload --host 0.0.0.0 --port 8001
```

### 2. Mobile App Setup

```bash
# Navigate to mobile app directory
cd mobile-app/HerbTraceApp

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your API URLs

# Start Expo development server
npx expo start
```

### 3. Access Applications

- **Backend API**: http://localhost:8001
- **Web Interface**: http://localhost:8001 (served by FastAPI)
- **Mobile App**: Scan QR code with Expo Go app

## 📊 Sample Data

Test the system with these package IDs:
- **PK001**: Brain Health Tonic
- **PK005**: Immunity Booster  
- **PK009**: Digestive Aid
- **PK010**: Sleep Support

## 🔒 Security & Environment Variables

### Backend (.env)
```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
MONGO_DB_NAME=database
MONGO_COLLECTION_NAME=packaging
DEBUG=True
API_TITLE=HerbTrace API
ALLOWED_ORIGINS=*
```

### Mobile App (.env)
```bash
EXPO_PUBLIC_API_DEV_URL=http://192.168.1.100:8001
EXPO_PUBLIC_API_PROD_URL=https://your-app.railway.app
EXPO_PUBLIC_API_TIMEOUT=10000
```

## 🚀 Deployment

### Railway Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy with environment variables
./deploy-railway.sh
```

### Docker Deployment
```bash
# Build Docker image
docker build -t herbtrace .

# Run container
docker run -p 8001:8001 herbtrace
```

## 📱 Mobile App Features

### Screen Architecture
- **HomeScreen**: Landing page with navigation options
- **ScannerScreen**: QR code camera scanning
- **ResultsScreen**: Complete traceability display
- **AboutScreen**: App information and features

### Key Components
- Native camera access with permissions
- Real-time API communication
- Professional UI with animations
- Error handling and loading states

## 🌐 Web Application Features

### Modern UI Components
- Responsive navigation with smooth scrolling
- Animated hero section with floating cards
- Interactive QR code scanner
- Professional results display
- Mobile-optimized design

## 📊 Database Schema

### Collections
- **packaging**: Package information and status
- **farmers**: Farmer details and certifications
- **retailers**: Retailer information and locations
- **farm_batches**: Harvest and farming data
- **processing**: Manufacturing and processing steps

## 🛠️ Tech Stack

### Frontend
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **TypeScript**: Type-safe development
- **React Navigation**: Screen navigation

### Backend
- **FastAPI**: Modern Python web framework
- **MongoDB Atlas**: Cloud database
- **Uvicorn**: ASGI server
- **python-dotenv**: Environment management

### Deployment
- **Docker**: Containerization
- **Railway**: Cloud deployment platform
- **GitHub Actions**: CI/CD pipeline ready

## 📖 Documentation

- [Security Guide](SECURITY.md)
- [Deployment Guide](DEPLOYMENT.md)
- [API Documentation](http://localhost:8001/docs) (when running)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🎯 Future Enhancements

- [ ] Blockchain integration for immutable records
- [ ] IoT sensor data integration
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Offline capability
- [ ] Push notifications
- [ ] Advanced search and filtering

## 📞 Support

For support or questions:
- Create an [Issue](https://github.com/Jenisish/Herblivery/issues)

---

<div align="center">
  <strong>🌱 Built with passion for transparency in herbal medicine 🌱</strong>
</div>

## Features

- **QR Code Scanning**: Instant product verification using camera or file upload
- **Complete Traceability**: Track herbs from farm origin through processing to retail
- **Modern UI**: Clean, responsive design with smooth animations
- **Real-time Data**: Live connection to MongoDB database for up-to-date information
- **Mobile Friendly**: Optimized for mobile devices and tablets

## Technology Stack

- **Backend**: FastAPI (Python)
- **Database**: MongoDB Atlas
- **Frontend**: HTML5, CSS3, JavaScript
- **QR Scanner**: HTML5-QRCode library
- **Deployment**: Docker, Railway/Heroku ready

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the application:
   ```bash
   uvicorn main:app --reload --port 8000
   ```
4. Open your browser to `http://localhost:8000`

## Environment Variables

- `MONGO_URI`: MongoDB connection string (configured in main.py)
- `PORT`: Application port (default: 8000)

## Deployment

### Using Docker
```bash
docker build -t herbtrace .
docker run -p 8000:8000 herbtrace
```

### Using Railway
1. Connect your GitHub repository to Railway
2. Set the start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. Deploy automatically on push

### Using Heroku
```bash
heroku create your-app-name
git push heroku main
```

## API Endpoints

- `GET /`: Main application interface
- `GET /get_package/{package_id}`: Retrieve package details and traceability data

## Database Schema

The application connects to MongoDB collections:
- `packaging`: Product packaging information
- `retailers`: Retailer details
- `farm_batches`: Farm batch data
- `herbs`: Herb specifications
- `processing`: Processing history

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.