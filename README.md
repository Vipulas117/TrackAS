# TrackAS - Complete Logistics Management Platform MVP

## Project Overview
TrackAS is a comprehensive logistics management and tracking platform that connects logistics companies, drivers, and customers through a unified ecosystem with admin oversight.

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+ LTS
- PostgreSQL 15+
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd trackas-mvp
```

2. **Install dependencies**
```bash
npm run install:all
```

3. **Database Setup**
```bash
# Start PostgreSQL (if using Docker)
docker run --name trackas-db -e POSTGRES_USER=trackas -e POSTGRES_PASSWORD=trackas -e POSTGRES_DB=trackas -p 5432:5432 -d postgres:15

# Or create database manually
createdb trackas
```

4. **Environment Configuration**
```bash
# Backend environment
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration

# Frontend environment  
cp frontend/.env.local.example frontend/.env.local
# Edit frontend/.env.local with your configuration
```

5. **Database Migration & Seeding**
```bash
npm run backend:migrate
npm run backend:seed
```

6. **Start Development Servers**
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:4000
- API Health Check: http://localhost:4000/health

### Default Login Credentials

**Admin:**
- Email: admin@trackas.local
- Password: admin123

**Company:**
- Email: company1@trackas.local  
- Password: company123

**Driver:**
- Email: driver1@trackas.local
- Password: driver123

## Quick Start
```bash
# Complete setup in one command
npm run setup
npm run dev
```

## 🏗️ Project Structure

```
trackas-mvp/
├── backend/                 # Node.js/Express API server
│   ├── routes/             # API route handlers
│   ├── services/           # Business logic services
│   ├── migrations/         # Database migration files
│   ├── scripts/            # Utility scripts
│   └── index.js           # Server entry point
├── frontend/               # Next.js web application
│   ├── pages/             # Next.js pages and API routes
│   ├── components/        # Reusable React components
│   ├── styles/            # CSS and styling files
│   └── public/            # Static assets
├── docs/                  # Project documentation
└── package.json          # Root package.json with scripts
```

## Architecture Overview
- **Frontend**: Next.js 14 with TypeScript
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Supabase
- **Real-time**: WebSocket connections
- **Payments**: Razorpay + Stripe integration
- **Maps**: Google Maps + Mapbox
- **AI**: OpenAI GPT-4 integration
- **Notifications**: Twilio (SMS/WhatsApp) + SendGrid

## 🎯 Key Features

### For Logistics Companies
- **Shipment Management**: Create, track, and manage shipments
- **Fleet Management**: Vehicle and driver coordination
- **Real-time Tracking**: Live GPS tracking with accurate ETAs
- **Payment Processing**: Secure escrow-based payment system
- **Analytics Dashboard**: Comprehensive reporting and insights

### For Drivers/Operators
- **Mobile App**: React Native app for drivers
- **Route Optimization**: AI-powered route planning
- **Earnings Tracking**: Real-time earnings and payment history
- **Proof of Delivery**: Digital POD with photos and signatures
- **Performance Metrics**: Ratings and performance tracking

### For Customers
- **Real-time Tracking**: Live shipment tracking
- **Multi-channel Notifications**: SMS, WhatsApp, Email updates
- **Rating System**: Rate and review delivery experience
- **Support**: 24/7 AI-powered customer support

### For Administrators
- **User Management**: Approve companies, drivers, and vehicles
- **Commission Management**: Configurable commission rates (0-10%)
- **System Monitoring**: Platform health and performance metrics
- **Financial Oversight**: Payment processing and reconciliation

## User Roles
1. **Admin**: Platform oversight, approvals, commission management
2. **Logistics Company**: Shipment management, driver coordination
3. **Driver/Operator**: Route optimization, delivery execution
4. **Customer**: Shipment tracking, rating system

## 🛠️ Available Scripts

### Root Level Scripts
```bash
npm run dev              # Start both backend and frontend in development
npm run setup            # Complete project setup (install + migrate + seed)
npm run install:all      # Install dependencies for both backend and frontend
npm run backend:dev      # Start backend development server
npm run frontend:dev     # Start frontend development server
npm run backend:migrate  # Run database migrations
npm run backend:seed     # Seed database with sample data
```

### Backend Scripts
```bash
cd backend
npm run dev              # Start development server with nodemon
npm start                # Start production server
npm run migrate          # Run database migrations
npm run seed             # Seed database with sample data
```

### Frontend Scripts
```bash
cd frontend
npm run dev              # Start Next.js development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
```

## 🔧 Configuration

### Backend Environment Variables
```env
DATABASE_URL=postgres://trackas:trackas@localhost:5432/trackas
JWT_SECRET=your-super-secret-jwt-key
OPENAI_API_KEY=your-openai-api-key
TWILIO_SID=your-twilio-sid
TWILIO_AUTH=your-twilio-auth-token
SENDGRID_KEY=your-sendgrid-api-key
MAPBOX_KEY=your-mapbox-api-key
RAZORPAY_KEY=your-razorpay-key
RAZORPAY_SECRET=your-razorpay-secret
PORT=4000
NODE_ENV=development
```

### Frontend Environment Variables
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_TRACKING_URL=http://localhost:3000
NEXT_PUBLIC_WEBSOCKET_URL=http://localhost:4000
```

## 📱 Mobile App Development

The driver mobile app is built with React Native. To set up mobile development:

```bash
# Install React Native CLI
npm install -g @react-native-community/cli

# For iOS (macOS only)
cd ios && pod install

# Run on iOS
npx react-native run-ios

# Run on Android
npx react-native run-android
```

## 🧪 Testing

```bash
# Run backend tests
cd backend && npm test

# Run frontend tests
cd frontend && npm test

# Run E2E tests
npm run test:e2e
```

## 📊 API Documentation

API documentation is available at:
- Development: http://localhost:4000/api-docs
- Swagger/OpenAPI specification in `/docs/API_SPECIFICATION.md`

## 🚀 Deployment

### Using Docker
```bash
# Build and run with Docker Compose
docker-compose up --build
```

### Manual Deployment
```bash
# Build frontend
cd frontend && npm run build

# Start production servers
npm run start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed documentation
- **Issues**: Report bugs and request features via GitHub Issues
- **Email**: support@trackas.com
- **Discord**: Join our community server

## 🗺️ Roadmap

See [DEVELOPMENT_ROADMAP.md](docs/DEVELOPMENT_ROADMAP.md) for detailed development phases and timeline.

## Development Phases
- **MVP Phase**: 8-12 weeks (Core functionality)
- **Beta Phase**: 4-6 weeks (Advanced features)
- **Scale Phase**: Ongoing (Performance optimization)

---

**Built with ❤️ by the TrackAS Team**