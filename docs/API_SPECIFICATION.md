# API Specification

## Base URL
```
Production: https://api.trackas.com/v1
Development: http://localhost:4000/api/v1
```

## Authentication
All authenticated endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Response Format
All API responses follow this structure:
```json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

Error responses:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {}
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## Authentication Endpoints

### POST /auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "role": "COMPANY",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+919876543210",
  "companyDetails": {
    "name": "ABC Logistics",
    "address": "123 Business Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "tinNumber": "TIN123456789",
    "gstNumber": "GST123456789",
    "panNumber": "ABCDE1234F"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "COMPANY",
      "isVerified": false
    },
    "message": "Registration successful. Please verify your email."
  }
}
```

### POST /auth/login
Authenticate user and get access token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "COMPANY",
      "firstName": "John",
      "lastName": "Doe"
    },
    "expiresIn": 86400
  }
}
```

### POST /auth/verify-email
Verify email address with token.

**Request Body:**
```json
{
  "token": "verification_token"
}
```

### POST /auth/forgot-password
Request password reset.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

### POST /auth/reset-password
Reset password with token.

**Request Body:**
```json
{
  "token": "reset_token",
  "newPassword": "newSecurePassword123"
}
```

## Company Endpoints

### GET /companies/profile
Get company profile information.

**Headers:** `Authorization: Bearer <token>`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "ABC Logistics",
    "email": "company@example.com",
    "address": "123 Business Street",
    "city": "Mumbai",
    "state": "Maharashtra",
    "status": "APPROVED",
    "commissionRate": 5.00,
    "bankDetails": {
      "accountNumber": "1234567890",
      "ifsc": "HDFC0001234",
      "bankName": "HDFC Bank",
      "accountHolderName": "ABC Logistics"
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

### PUT /companies/profile
Update company profile.

**Request Body:**
```json
{
  "name": "ABC Logistics Ltd",
  "address": "456 New Business Street",
  "city": "Mumbai",
  "state": "Maharashtra",
  "pincode": "400002"
}
```

### GET /companies/vehicles
Get company vehicles.

**Query Parameters:**
- `status` (optional): Filter by status
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "success": true,
  "data": {
    "vehicles": [
      {
        "id": "uuid",
        "registrationNumber": "MH01AB1234",
        "vehicleType": "Truck",
        "make": "Tata",
        "model": "407",
        "capacityWeight": 2000.00,
        "capacityVolume": 15.00,
        "status": "APPROVED",
        "createdAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

### POST /companies/vehicles
Add new vehicle.

**Request Body:**
```json
{
  "registrationNumber": "MH01AB1234",
  "vehicleType": "Truck",
  "make": "Tata",
  "model": "407",
  "year": 2020,
  "capacityWeight": 2000.00,
  "capacityVolume": 15.00,
  "fuelType": "Diesel",
  "insuranceNumber": "INS123456789",
  "insuranceExpiry": "2025-12-31",
  "permitNumber": "PER123456789",
  "permitExpiry": "2025-06-30"
}
```

## Shipment Endpoints

### POST /shipments
Create new shipment.

**Request Body:**
```json
{
  "title": "Electronics Delivery",
  "description": "Laptop and accessories delivery",
  "pickup": {
    "address": "123 Pickup Street, Mumbai",
    "latitude": 19.0760,
    "longitude": 72.8777,
    "contactName": "John Doe",
    "contactPhone": "+919876543210",
    "contactEmail": "john@example.com",
    "scheduledTime": "2024-01-16T10:00:00Z"
  },
  "delivery": {
    "address": "456 Delivery Avenue, Pune",
    "latitude": 18.5204,
    "longitude": 73.8567,
    "contactName": "Jane Smith",
    "contactPhone": "+919876543211",
    "contactEmail": "jane@example.com",
    "scheduledTime": "2024-01-16T18:00:00Z"
  },
  "shipmentDetails": {
    "weight": 5.5,
    "length": 50,
    "width": 30,
    "height": 20,
    "goodsType": "Electronics",
    "goodsValue": 50000,
    "specialInstructions": "Handle with care, fragile items"
  },
  "pricing": {
    "shipmentCost": 2000,
    "priority": "NORMAL"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "shipment": {
      "id": "uuid",
      "trackingCode": "TRK123456789",
      "title": "Electronics Delivery",
      "status": "CREATED",
      "estimatedDelivery": "2024-01-16T18:00:00Z",
      "shipmentCost": 2000,
      "commissionAmount": 100,
      "createdAt": "2024-01-15T10:00:00Z"
    }
  }
}
```

### GET /shipments
Get shipments list.

**Query Parameters:**
- `status` (optional): Filter by status
- `page` (optional): Page number
- `limit` (optional): Items per page
- `startDate` (optional): Filter from date
- `endDate` (optional): Filter to date

**Response:**
```json
{
  "success": true,
  "data": {
    "shipments": [
      {
        "id": "uuid",
        "trackingCode": "TRK123456789",
        "title": "Electronics Delivery",
        "status": "IN_TRANSIT",
        "pickup": {
          "address": "123 Pickup Street, Mumbai",
          "scheduledTime": "2024-01-16T10:00:00Z",
          "actualTime": "2024-01-16T10:15:00Z"
        },
        "delivery": {
          "address": "456 Delivery Avenue, Pune",
          "scheduledTime": "2024-01-16T18:00:00Z"
        },
        "operator": {
          "id": "uuid",
          "name": "Driver Name",
          "phone": "+919876543212",
          "rating": 4.5
        },
        "vehicle": {
          "registrationNumber": "MH01AB1234",
          "vehicleType": "Truck"
        },
        "shipmentCost": 2000,
        "commissionAmount": 100,
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "pages": 5
    }
  }
}
```

### GET /shipments/:id
Get shipment details.

**Response:**
```json
{
  "success": true,
  "data": {
    "shipment": {
      "id": "uuid",
      "trackingCode": "TRK123456789",
      "title": "Electronics Delivery",
      "description": "Laptop and accessories delivery",
      "status": "IN_TRANSIT",
      "priority": "NORMAL",
      "pickup": {
        "address": "123 Pickup Street, Mumbai",
        "latitude": 19.0760,
        "longitude": 72.8777,
        "contactName": "John Doe",
        "contactPhone": "+919876543210",
        "scheduledTime": "2024-01-16T10:00:00Z",
        "actualTime": "2024-01-16T10:15:00Z"
      },
      "delivery": {
        "address": "456 Delivery Avenue, Pune",
        "latitude": 18.5204,
        "longitude": 73.8567,
        "contactName": "Jane Smith",
        "contactPhone": "+919876543211",
        "scheduledTime": "2024-01-16T18:00:00Z"
      },
      "shipmentDetails": {
        "weight": 5.5,
        "dimensions": "50x30x20 cm",
        "goodsType": "Electronics",
        "goodsValue": 50000,
        "specialInstructions": "Handle with care"
      },
      "operator": {
        "id": "uuid",
        "name": "Driver Name",
        "phone": "+919876543212",
        "rating": 4.5,
        "currentLocation": {
          "latitude": 18.8,
          "longitude": 73.2,
          "lastUpdate": "2024-01-16T14:30:00Z"
        }
      },
      "vehicle": {
        "registrationNumber": "MH01AB1234",
        "vehicleType": "Truck",
        "make": "Tata",
        "model": "407"
      },
      "pricing": {
        "shipmentCost": 2000,
        "commissionRate": 5.00,
        "commissionAmount": 100,
        "netPayout": 1900
      },
      "timeline": [
        {
          "status": "CREATED",
          "timestamp": "2024-01-15T10:00:00Z",
          "description": "Shipment created"
        },
        {
          "status": "ASSIGNED",
          "timestamp": "2024-01-15T11:00:00Z",
          "description": "Assigned to driver"
        },
        {
          "status": "PICKED_UP",
          "timestamp": "2024-01-16T10:15:00Z",
          "description": "Package picked up"
        }
      ],
      "createdAt": "2024-01-15T10:00:00Z",
      "estimatedDelivery": "2024-01-16T18:00:00Z"
    }
  }
}
```

### GET /shipments/:id/tracking
Get real-time tracking data.

**Response:**
```json
{
  "success": true,
  "data": {
    "currentLocation": {
      "latitude": 18.8,
      "longitude": 73.2,
      "timestamp": "2024-01-16T14:30:00Z",
      "speed": 45.5,
      "heading": 180.0
    },
    "route": {
      "totalDistance": 150.5,
      "remainingDistance": 75.2,
      "estimatedArrival": "2024-01-16T17:45:00Z"
    },
    "trackingHistory": [
      {
        "latitude": 19.0760,
        "longitude": 72.8777,
        "timestamp": "2024-01-16T10:15:00Z",
        "event": "PICKUP_COMPLETED"
      },
      {
        "latitude": 18.9,
        "longitude": 73.0,
        "timestamp": "2024-01-16T12:00:00Z",
        "event": "IN_TRANSIT"
      }
    ]
  }
}
```

### PUT /shipments/:id/cancel
Cancel shipment.

**Request Body:**
```json
{
  "reason": "Customer requested cancellation",
  "refundAmount": 2000
}
```

## Operator Endpoints

### GET /operators/profile
Get operator profile.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "Driver Name",
    "email": "driver@example.com",
    "phone": "+919876543212",
    "licenseNumber": "DL123456789",
    "licenseExpiry": "2025-12-31",
    "status": "APPROVED",
    "rating": {
      "average": 4.5,
      "totalRatings": 150
    },
    "bankDetails": {
      "accountNumber": "9876543210",
      "ifsc": "HDFC0001234",
      "bankName": "HDFC Bank",
      "accountHolderName": "Driver Name"
    },
    "isOnline": true,
    "currentLocation": {
      "latitude": 19.0760,
      "longitude": 72.8777,
      "lastUpdate": "2024-01-16T14:30:00Z"
    }
  }
}
```

### PUT /operators/status
Update online status.

**Request Body:**
```json
{
  "isOnline": true,
  "latitude": 19.0760,
  "longitude": 72.8777
}
```

### GET /operators/available-shipments
Get available shipments for assignment.

**Query Parameters:**
- `radius` (optional): Search radius in km (default: 50)
- `vehicleType` (optional): Filter by vehicle type

**Response:**
```json
{
  "success": true,
  "data": {
    "shipments": [
      {
        "id": "uuid",
        "trackingCode": "TRK123456789",
        "title": "Electronics Delivery",
        "pickup": {
          "address": "123 Pickup Street, Mumbai",
          "latitude": 19.0760,
          "longitude": 72.8777,
          "scheduledTime": "2024-01-16T10:00:00Z"
        },
        "delivery": {
          "address": "456 Delivery Avenue, Pune",
          "latitude": 18.5204,
          "longitude": 73.8567
        },
        "distance": 25.5,
        "estimatedEarnings": 1900,
        "priority": "NORMAL",
        "shipmentDetails": {
          "weight": 5.5,
          "goodsType": "Electronics"
        }
      }
    ]
  }
}
```

### POST /operators/accept-shipment
Accept shipment assignment.

**Request Body:**
```json
{
  "shipmentId": "uuid",
  "estimatedPickupTime": "2024-01-16T10:00:00Z"
}
```

### POST /operators/update-location
Update current location.

**Request Body:**
```json
{
  "latitude": 19.0760,
  "longitude": 72.8777,
  "speed": 45.5,
  "heading": 180.0,
  "accuracy": 5.0,
  "timestamp": "2024-01-16T14:30:00Z"
}
```

### POST /operators/complete-pickup
Mark pickup as completed.

**Request Body:**
```json
{
  "shipmentId": "uuid",
  "pickupTime": "2024-01-16T10:15:00Z",
  "notes": "Package collected successfully",
  "photos": ["photo_url_1", "photo_url_2"]
}
```

### POST /operators/complete-delivery
Mark delivery as completed.

**Request Body:**
```json
{
  "shipmentId": "uuid",
  "deliveryTime": "2024-01-16T17:45:00Z",
  "recipientName": "Jane Smith",
  "notes": "Delivered successfully",
  "podPhotos": ["pod_photo_url"],
  "signature": "signature_data_url"
}
```

## Payment Endpoints

### GET /payments
Get payment history.

**Query Parameters:**
- `status` (optional): Filter by status
- `startDate` (optional): Filter from date
- `endDate` (optional): Filter to date
- `page` (optional): Page number
- `limit` (optional): Items per page

**Response:**
```json
{
  "success": true,
  "data": {
    "payments": [
      {
        "id": "uuid",
        "shipmentId": "uuid",
        "trackingCode": "TRK123456789",
        "amount": 2000,
        "commissionAmount": 100,
        "netPayout": 1900,
        "paymentMethod": "ONLINE",
        "status": "COMPLETED",
        "gatewayTransactionId": "txn_123456789",
        "createdAt": "2024-01-15T10:00:00Z",
        "completedAt": "2024-01-16T18:00:00Z"
      }
    ],
    "summary": {
      "totalEarnings": 50000,
      "pendingPayments": 5000,
      "completedPayments": 45000,
      "totalCommission": 2500
    },
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 100,
      "pages": 10
    }
  }
}
```

### POST /payments/create-order
Create payment order.

**Request Body:**
```json
{
  "shipmentId": "uuid",
  "amount": 2000,
  "paymentMethod": "ONLINE",
  "gateway": "RAZORPAY"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "order_123456789",
    "amount": 2000,
    "currency": "INR",
    "gatewayOrderId": "order_razorpay_123",
    "keyId": "rzp_test_key"
  }
}
```

### POST /payments/verify
Verify payment completion.

**Request Body:**
```json
{
  "orderId": "order_123456789",
  "paymentId": "pay_123456789",
  "signature": "signature_hash"
}
```

### GET /payments/wallet
Get wallet balance and transactions.

**Response:**
```json
{
  "success": true,
  "data": {
    "wallet": {
      "balance": 15000,
      "lockedAmount": 2000,
      "availableBalance": 13000
    },
    "recentTransactions": [
      {
        "id": "uuid",
        "type": "CREDIT",
        "amount": 1900,
        "description": "Payment for shipment TRK123456789",
        "balanceAfter": 15000,
        "createdAt": "2024-01-16T18:00:00Z"
      }
    ]
  }
}
```

## Rating Endpoints

### POST /ratings
Submit rating for shipment.

**Request Body:**
```json
{
  "shipmentId": "uuid",
  "operatorId": "uuid",
  "rating": 5,
  "comment": "Excellent service, on-time delivery"
}
```

### GET /ratings/operator/:id
Get operator ratings.

**Response:**
```json
{
  "success": true,
  "data": {
    "operator": {
      "id": "uuid",
      "name": "Driver Name",
      "averageRating": 4.5,
      "totalRatings": 150
    },
    "ratings": [
      {
        "id": "uuid",
        "rating": 5,
        "comment": "Excellent service",
        "ratedBy": "COMPANY",
        "shipmentId": "uuid",
        "createdAt": "2024-01-16T18:00:00Z"
      }
    ],
    "ratingDistribution": {
      "5": 80,
      "4": 50,
      "3": 15,
      "2": 3,
      "1": 2
    }
  }
}
```

## Support Endpoints

### POST /support/tickets
Create support ticket.

**Request Body:**
```json
{
  "subject": "Issue with shipment delivery",
  "message": "The package was not delivered on time",
  "priority": "HIGH",
  "shipmentId": "uuid"
}
```

### GET /support/tickets
Get support tickets.

**Response:**
```json
{
  "success": true,
  "data": {
    "tickets": [
      {
        "id": "uuid",
        "subject": "Issue with shipment delivery",
        "status": "OPEN",
        "priority": "HIGH",
        "createdAt": "2024-01-16T10:00:00Z",
        "lastUpdated": "2024-01-16T10:00:00Z"
      }
    ]
  }
}
```

## Admin Endpoints

### GET /admin/pending-approvals
Get pending approvals.

**Response:**
```json
{
  "success": true,
  "data": {
    "companies": [
      {
        "id": "uuid",
        "name": "ABC Logistics",
        "email": "company@example.com",
        "status": "PENDING",
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "operators": [
      {
        "id": "uuid",
        "name": "Driver Name",
        "email": "driver@example.com",
        "licenseNumber": "DL123456789",
        "status": "PENDING",
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ],
    "vehicles": [
      {
        "id": "uuid",
        "registrationNumber": "MH01AB1234",
        "vehicleType": "Truck",
        "companyName": "ABC Logistics",
        "status": "PENDING",
        "createdAt": "2024-01-15T10:00:00Z"
      }
    ]
  }
}
```

### POST /admin/approve
Approve pending entity.

**Request Body:**
```json
{
  "entityType": "COMPANY",
  "entityId": "uuid",
  "status": "APPROVED",
  "remarks": "All documents verified"
}
```

### GET /admin/settings
Get system settings.

**Response:**
```json
{
  "success": true,
  "data": {
    "settings": {
      "defaultCommissionRate": 5.00,
      "maxCommissionRate": 10.00,
      "autoAssignmentEnabled": true,
      "trackingUpdateInterval": 30,
      "supportEmail": "support@trackas.com"
    }
  }
}
```

### PUT /admin/settings
Update system settings.

**Request Body:**
```json
{
  "defaultCommissionRate": 5.50,
  "autoAssignmentEnabled": false
}
```

## AI Assistant Endpoints

### POST /ai/chat
Send message to AI assistant.

**Request Body:**
```json
{
  "message": "Where is my shipment TRK123456789?",
  "language": "en",
  "context": {
    "userId": "uuid",
    "role": "COMPANY"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "response": "Your shipment TRK123456789 is currently in transit and expected to be delivered by 6:00 PM today.",
    "suggestions": [
      "Track shipment",
      "Contact driver",
      "Get delivery updates"
    ],
    "escalateToSupport": false
  }
}
```

### GET /ai/faqs
Get role-based FAQs.

**Query Parameters:**
- `role`: User role (COMPANY, OPERATOR, CUSTOMER)
- `language`: Language code (en, hi)

**Response:**
```json
{
  "success": true,
  "data": {
    "faqs": [
      {
        "id": "uuid",
        "question": "How to create a shipment?",
        "answer": "To create a shipment, go to the dashboard and click on 'Create Shipment' button...",
        "category": "SHIPMENT_MANAGEMENT",
        "language": "en"
      }
    ]
  }
}
```

## WebSocket Events

### Connection
```javascript
const socket = io('ws://localhost:4000', {
  auth: {
    token: 'jwt_token'
  }
});
```

### Events

#### Join Shipment Room
```javascript
socket.emit('join_shipment', { shipmentId: 'uuid' });
```

#### Location Update
```javascript
socket.emit('location_update', {
  shipmentId: 'uuid',
  latitude: 19.0760,
  longitude: 72.8777,
  timestamp: '2024-01-16T14:30:00Z'
});
```

#### Receive Location Update
```javascript
socket.on('location_update', (data) => {
  console.log('New location:', data);
});
```

#### Status Update
```javascript
socket.on('status_update', (data) => {
  console.log('Status changed:', data);
});
```

## Rate Limiting
- Authentication endpoints: 5 requests per minute
- General API endpoints: 100 requests per minute
- WebSocket connections: 10 connections per user

## Error Codes
- `VALIDATION_ERROR`: Invalid input data
- `AUTHENTICATION_REQUIRED`: Missing or invalid token
- `AUTHORIZATION_FAILED`: Insufficient permissions
- `RESOURCE_NOT_FOUND`: Requested resource not found
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INTERNAL_SERVER_ERROR`: Server error
- `PAYMENT_FAILED`: Payment processing error
- `SHIPMENT_NOT_AVAILABLE`: Shipment already assigned
- `LOCATION_UPDATE_FAILED`: GPS tracking error