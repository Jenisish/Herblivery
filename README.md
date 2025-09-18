# HerbTrace - Ayurvedic Herb Traceability System

A modern web application for tracking Ayurvedic herbs from farm to consumer, ensuring authenticity and transparency in the supply chain.

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