# User Role Specifications

## Role-Based Access Control (RBAC)

### Permission Matrix

| Feature | Admin | Company | Operator | Customer |
|---------|-------|---------|----------|----------|
| User Management | ✅ | ❌ | ❌ | ❌ |
| Company Approval | ✅ | ❌ | ❌ | ❌ |
| Driver Approval | ✅ | ❌ | ❌ | ❌ |
| Vehicle Approval | ✅ | ❌ | ❌ | ❌ |
| Commission Settings | ✅ | ❌ | ❌ | ❌ |
| System Settings | ✅ | ❌ | ❌ | ❌ |
| Create Shipments | ❌ | ✅ | ❌ | ❌ |
| Manage Vehicles | ❌ | ✅ | ❌ | ❌ |
| View Company Analytics | ❌ | ✅ | ❌ | ❌ |
| Accept Shipments | ❌ | ❌ | ✅ | ❌ |
| Update Location | ❌ | ❌ | ✅ | ❌ |
| Upload POD | ❌ | ❌ | ✅ | ❌ |
| Track Shipments | ❌ | ✅ | ✅ | ✅ |
| Rate Experience | ❌ | ✅ | ❌ | ✅ |
| Create Support Tickets | ✅ | ✅ | ✅ | ✅ |

## 1. Admin Role

### Responsibilities
- Platform oversight and governance
- User verification and approval
- Commission management
- System configuration
- Analytics and reporting
- Support ticket resolution

### Key Features

#### 1.1 Company/Vehicle/Driver Approval System
```javascript
// Approval workflow
const approvalProcess = {
  stages: [
    'DOCUMENT_VERIFICATION',
    'BACKGROUND_CHECK',
    'COMPLIANCE_REVIEW',
    'FINAL_APPROVAL'
  ],
  
  requiredDocuments: {
    company: ['GST_CERTIFICATE', 'PAN_CARD', 'BANK_DETAILS', 'TRADE_LICENSE'],
    driver: ['DRIVING_LICENSE', 'AADHAR_CARD', 'BANK_DETAILS', 'POLICE_VERIFICATION'],
    vehicle: ['RC_BOOK', 'INSURANCE', 'PERMIT', 'FITNESS_CERTIFICATE']
  },
  
  autoApprovalCriteria: {
    documentQuality: 'HIGH',
    backgroundCheck: 'CLEAR',
    complianceScore: '>= 80'
  }
};
```

#### 1.2 Commission Configuration (0-10%)
```javascript
const commissionSettings = {
  global: {
    defaultRate: 5.0,
    minRate: 0.0,
    maxRate: 10.0,
    collectionMode: 'POSTPAID' // or 'PREPAID'
  },
  
  companySpecific: {
    'company_id_1': { rate: 4.5, mode: 'PREPAID' },
    'company_id_2': { rate: 5.5, mode: 'POSTPAID' }
  },
  
  categoryBased: {
    'ELECTRONICS': 3.0,
    'FURNITURE': 5.0,
    'PERISHABLES': 7.0
  },
  
  volumeBased: [
    { minShipments: 0, maxShipments: 100, rate: 5.0 },
    { minShipments: 101, maxShipments: 500, rate: 4.5 },
    { minShipments: 501, maxShipments: Infinity, rate: 4.0 }
  ]
};
```

#### 1.3 Comprehensive Reporting Dashboard
```javascript
const adminAnalytics = {
  kpis: {
    totalRevenue: 'SUM(commission_amount)',
    activeShipments: 'COUNT(shipments WHERE status IN (ACTIVE_STATUSES))',
    userGrowth: 'COUNT(users WHERE created_at >= LAST_MONTH)',
    platformUtilization: 'PERCENTAGE(active_users / total_users)'
  },
  
  reports: [
    'REVENUE_REPORT',
    'USER_ACTIVITY_REPORT',
    'SHIPMENT_ANALYTICS',
    'COMMISSION_BREAKDOWN',
    'PERFORMANCE_METRICS',
    'COMPLIANCE_REPORT'
  ],
  
  realTimeMetrics: [
    'ACTIVE_SHIPMENTS',
    'ONLINE_DRIVERS',
    'PENDING_APPROVALS',
    'SUPPORT_TICKETS'
  ]
};
```

### Admin Dashboard Features

#### Real-time Monitoring
- Live shipment tracking across all companies
- Driver availability and location monitoring
- System health and performance metrics
- Alert management for critical issues

#### Financial Management
- Commission collection and distribution
- Payment gateway monitoring
- Refund and dispute management
- Financial reporting and reconciliation

#### User Management
- Bulk user operations
- Role and permission management
- Account suspension and reactivation
- Audit trail and activity logs

## 2. Logistics Company Role

### Responsibilities
- Fleet and driver management
- Shipment creation and tracking
- Customer relationship management
- Payment and billing oversight

### Key Features

#### 2.1 Registration Workflow
```javascript
const companyRegistration = {
  steps: [
    {
      step: 'BASIC_INFO',
      fields: ['companyName', 'email', 'phone', 'address'],
      validation: 'REQUIRED'
    },
    {
      step: 'BUSINESS_DETAILS',
      fields: ['gstNumber', 'panNumber', 'tinNumber', 'businessType'],
      validation: 'GOVERNMENT_VERIFICATION'
    },
    {
      step: 'BANK_DETAILS',
      fields: ['accountNumber', 'ifscCode', 'bankName', 'accountHolderName'],
      validation: 'BANK_VERIFICATION'
    },
    {
      step: 'DOCUMENT_UPLOAD',
      documents: ['gstCertificate', 'panCard', 'bankStatement', 'tradeLicense'],
      validation: 'DOCUMENT_VERIFICATION'
    }
  ],
  
  approvalTime: '24-48 hours',
  status: 'PENDING' // PENDING -> APPROVED -> ACTIVE
};
```

#### 2.2 Vehicle/Driver Management
```javascript
const fleetManagement = {
  vehicles: {
    registration: {
      requiredFields: ['registrationNumber', 'vehicleType', 'capacity', 'insurance'],
      verification: 'RTO_DATABASE_CHECK',
      documents: ['rcBook', 'insurance', 'permit', 'fitnessCertificate']
    },
    
    tracking: {
      gpsEnabled: true,
      maintenanceSchedule: 'AUTOMATED',
      fuelTracking: 'OPTIONAL',
      routeOptimization: 'AI_POWERED'
    }
  },
  
  drivers: {
    onboarding: {
      verification: ['LICENSE_CHECK', 'BACKGROUND_VERIFICATION', 'TRAINING_COMPLETION'],
      documents: ['drivingLicense', 'aadharCard', 'bankDetails'],
      training: 'MANDATORY_SAFETY_TRAINING'
    },
    
    performance: {
      ratings: 'CUSTOMER_FEEDBACK',
      efficiency: 'DELIVERY_METRICS',
      safety: 'INCIDENT_TRACKING'
    }
  }
};
```

#### 2.3 Shipment Creation with Auto-cost Calculation
```javascript
const shipmentPricing = {
  factors: {
    distance: 'GOOGLE_MAPS_API',
    weight: 'WEIGHT_BASED_MULTIPLIER',
    volume: 'VOLUMETRIC_WEIGHT',
    priority: 'URGENCY_MULTIPLIER',
    goodsType: 'CATEGORY_BASED_RATE',
    route: 'TRAFFIC_AND_TOLL_CONSIDERATION'
  },
  
  calculation: {
    baseRate: 'DISTANCE * BASE_RATE_PER_KM',
    weightCharge: 'WEIGHT > FREE_WEIGHT ? (WEIGHT - FREE_WEIGHT) * WEIGHT_RATE : 0',
    priorityCharge: 'PRIORITY_MULTIPLIER * BASE_RATE',
    fuelSurcharge: 'CURRENT_FUEL_PRICE_ADJUSTMENT',
    tollCharges: 'ROUTE_BASED_TOLL_CALCULATION',
    taxes: 'GST_CALCULATION'
  },
  
  discounts: {
    volumeDiscount: 'BULK_SHIPMENT_DISCOUNT',
    loyaltyDiscount: 'CUSTOMER_TIER_BASED',
    seasonalOffers: 'PROMOTIONAL_DISCOUNTS'
  }
};
```

#### 2.4 Escrow Payment System
```javascript
const escrowSystem = {
  workflow: {
    'SHIPMENT_CREATED': 'PAYMENT_HOLD',
    'PICKUP_COMPLETED': 'PARTIAL_RELEASE_TO_DRIVER',
    'DELIVERY_COMPLETED': 'FULL_RELEASE_MINUS_COMMISSION',
    'DISPUTE_RAISED': 'PAYMENT_FREEZE',
    'DISPUTE_RESOLVED': 'PAYMENT_RELEASE_AS_PER_RESOLUTION'
  },
  
  commissionDeduction: {
    timing: 'CONFIGURABLE', // UPFRONT or POST_DELIVERY
    calculation: 'SHIPMENT_VALUE * COMMISSION_RATE',
    minimumCommission: 'PLATFORM_DEFINED',
    maximumCommission: 'CATEGORY_BASED_CAP'
  },
  
  paymentMethods: [
    'CREDIT_CARD',
    'DEBIT_CARD',
    'NET_BANKING',
    'UPI',
    'WALLET',
    'CASH_ON_DELIVERY'
  ]
};
```

### Company Dashboard Features

#### Shipment Management
- Bulk shipment creation
- Template-based recurring shipments
- Advanced filtering and search
- Export capabilities (PDF, Excel)

#### Analytics and Reporting
- Delivery performance metrics
- Cost analysis and optimization
- Customer satisfaction scores
- Driver performance reports

#### Customer Management
- Customer database management
- Communication history
- Feedback and ratings
- Loyalty program management

## 3. Driver/Operator Role

### Responsibilities
- Shipment acceptance and execution
- Real-time location updates
- Proof of delivery collection
- Customer interaction and service

### Key Features

#### 3.1 License Verification
```javascript
const driverVerification = {
  licenseCheck: {
    api: 'SARATHI_API', // Government driving license verification
    fields: ['licenseNumber', 'dateOfBirth', 'name'],
    verification: 'REAL_TIME',
    validity: 'EXPIRY_DATE_CHECK'
  },
  
  backgroundCheck: {
    criminalRecord: 'POLICE_VERIFICATION',
    previousEmployment: 'REFERENCE_CHECK',
    creditScore: 'OPTIONAL',
    medicalFitness: 'REQUIRED_FOR_COMMERCIAL'
  },
  
  training: {
    safetyTraining: 'MANDATORY',
    appUsageTraining: 'REQUIRED',
    customerServiceTraining: 'RECOMMENDED',
    certification: 'PLATFORM_CERTIFICATE'
  }
};
```

#### 3.2 Bank Detail Integration
```javascript
const driverBanking = {
  verification: {
    accountVerification: 'PENNY_DROP_TEST',
    ifscValidation: 'BANK_API_CHECK',
    nameMatching: 'FUZZY_MATCHING_ALGORITHM',
    documentVerification: 'BANK_STATEMENT_ANALYSIS'
  },
  
  paymentSchedule: {
    frequency: 'WEEKLY', // DAILY, WEEKLY, MONTHLY
    minimumPayout: 500,
    processingTime: '24-48 HOURS',
    charges: 'PLATFORM_ABSORBED'
  },
  
  earningsBreakdown: {
    baseEarnings: 'SHIPMENT_VALUE - COMMISSION',
    incentives: 'PERFORMANCE_BASED',
    bonuses: 'MILESTONE_ACHIEVEMENTS',
    deductions: 'FUEL_ADVANCE, PENALTIES'
  }
};
```

#### 3.3 AI-Optimized Routing
```javascript
const routeOptimization = {
  algorithms: {
    primary: 'GOOGLE_MAPS_DIRECTIONS_API',
    secondary: 'MAPBOX_OPTIMIZATION_API',
    fallback: 'OSRM_ROUTING'
  },
  
  factors: {
    traffic: 'REAL_TIME_TRAFFIC_DATA',
    roadConditions: 'WEATHER_AND_CONSTRUCTION',
    fuelEfficiency: 'VEHICLE_SPECIFIC_OPTIMIZATION',
    deliveryWindows: 'TIME_CONSTRAINT_OPTIMIZATION',
    multipleStops: 'TRAVELING_SALESMAN_OPTIMIZATION'
  },
  
  features: {
    voiceNavigation: 'MULTILINGUAL_SUPPORT',
    offlineMode: 'CACHED_MAPS',
    alternateRoutes: 'DYNAMIC_REROUTING',
    tollAvoidance: 'COST_OPTIMIZATION'
  }
};
```

#### 3.4 POD Upload System
```javascript
const proofOfDelivery = {
  captureOptions: {
    photo: {
      required: true,
      quality: 'HIGH',
      geotagging: 'ENABLED',
      timestamp: 'AUTOMATIC'
    },
    
    signature: {
      digital: 'TOUCH_SIGNATURE',
      verification: 'BIOMETRIC_OPTIONAL',
      storage: 'ENCRYPTED'
    },
    
    otp: {
      customerVerification: 'SMS_OTP',
      fallback: 'CALL_VERIFICATION',
      attempts: 3
    }
  },
  
  validation: {
    imageQuality: 'AI_QUALITY_CHECK',
    locationVerification: 'GPS_RADIUS_CHECK',
    timeValidation: 'DELIVERY_WINDOW_CHECK',
    duplicateCheck: 'HASH_COMPARISON'
  },
  
  storage: {
    cloudStorage: 'AWS_S3',
    encryption: 'AES_256',
    retention: '7_YEARS',
    backup: 'MULTI_REGION'
  }
};
```

### Driver Mobile App Features

#### Earnings Dashboard
- Real-time earnings tracking
- Daily/weekly/monthly summaries
- Incentive and bonus tracking
- Payment history and statements

#### Performance Metrics
- Delivery success rate
- Customer ratings
- On-time delivery percentage
- Fuel efficiency tracking

#### Support and Training
- In-app help and tutorials
- Emergency contact features
- Feedback and suggestion system
- Performance improvement tips

## 4. Customer Role

### Responsibilities
- Shipment tracking and monitoring
- Feedback and rating provision
- Communication with logistics providers

### Key Features

#### 4.1 Multi-channel Tracking Links
```javascript
const trackingChannels = {
  sms: {
    provider: 'TWILIO',
    template: 'Your shipment {trackingCode} is {status}. Track: {link}',
    frequency: 'STATUS_CHANGE',
    language: 'AUTO_DETECT'
  },
  
  whatsapp: {
    provider: 'TWILIO_WHATSAPP_API',
    features: ['RICH_MEDIA', 'INTERACTIVE_BUTTONS', 'LOCATION_SHARING'],
    template: 'APPROVED_TEMPLATE',
    chatbot: 'AI_POWERED'
  },
  
  email: {
    provider: 'SENDGRID',
    template: 'RESPONSIVE_HTML',
    attachments: ['INVOICE', 'TRACKING_MAP'],
    personalization: 'CUSTOMER_PREFERENCES'
  },
  
  web: {
    publicTracking: 'NO_LOGIN_REQUIRED',
    realTimeUpdates: 'WEBSOCKET',
    mapIntegration: 'GOOGLE_MAPS',
    notifications: 'BROWSER_PUSH'
  }
};
```

#### 4.2 Real-time Updates
```javascript
const realTimeTracking = {
  updateFrequency: {
    inTransit: '30_SECONDS',
    idle: '5_MINUTES',
    delivered: 'FINAL_UPDATE'
  },
  
  notifications: {
    pickup: 'IMMEDIATE',
    milestones: 'ROUTE_CHECKPOINTS',
    delays: 'PROACTIVE_ALERTS',
    delivery: 'IMMEDIATE_WITH_POD'
  },
  
  dataPoints: {
    location: 'GPS_COORDINATES',
    eta: 'DYNAMIC_CALCULATION',
    speed: 'VEHICLE_TELEMETRY',
    route: 'OPTIMIZED_PATH',
    weather: 'WEATHER_CONDITIONS'
  }
};
```

#### 4.3 Rating Interface
```javascript
const ratingSystem = {
  categories: {
    overall: 'MANDATORY',
    timeliness: 'DELIVERY_TIME_VS_PROMISED',
    packaging: 'CONDITION_OF_GOODS',
    driverBehavior: 'PROFESSIONALISM_RATING',
    communication: 'UPDATES_AND_RESPONSIVENESS'
  },
  
  scale: {
    type: 'FIVE_STAR',
    granularity: 'HALF_STAR_PRECISION',
    comments: 'OPTIONAL_TEXT',
    photos: 'DAMAGE_EVIDENCE'
  },
  
  incentives: {
    ratingRewards: 'LOYALTY_POINTS',
    detailedFeedback: 'DISCOUNT_COUPONS',
    photoEvidence: 'PRIORITY_SUPPORT'
  },
  
  moderation: {
    spamDetection: 'AI_CONTENT_FILTER',
    fairnessCheck: 'BIAS_DETECTION',
    verification: 'DELIVERY_CONFIRMATION_REQUIRED'
  }
};
```

### Customer Experience Features

#### Self-Service Portal
- Order history and tracking
- Invoice downloads
- Address book management
- Preference settings

#### Communication Tools
- Direct chat with drivers
- Company contact information
- Support ticket creation
- FAQ and help center

#### Loyalty Program
- Points for ratings and feedback
- Tier-based benefits
- Referral rewards
- Exclusive offers and discounts

## Role Transition and Permissions

### Dynamic Role Assignment
```javascript
const roleManagement = {
  multipleRoles: {
    allowed: true,
    example: 'COMPANY_OWNER + DRIVER',
    permissions: 'UNION_OF_ROLE_PERMISSIONS'
  },
  
  roleUpgrade: {
    customer_to_company: 'BUSINESS_VERIFICATION_REQUIRED',
    driver_to_company: 'FLEET_OWNERSHIP_PROOF',
    company_to_admin: 'PLATFORM_INVITATION_ONLY'
  },
  
  temporaryPermissions: {
    duration: 'TIME_BOUND',
    scope: 'FEATURE_SPECIFIC',
    approval: 'ADMIN_REQUIRED'
  }
};
```

### Security and Compliance

#### Data Access Control
- Role-based data filtering
- Field-level permissions
- API endpoint restrictions
- Audit logging for all actions

#### Privacy Protection
- Personal data encryption
- GDPR compliance
- Data retention policies
- Right to deletion

#### Fraud Prevention
- Behavioral analysis
- Anomaly detection
- Multi-factor authentication
- Device fingerprinting

## Integration Points

### Third-party Services
- Government APIs for verification
- Banking APIs for payments
- Mapping services for routing
- Communication platforms for notifications

### Webhook Support
- Real-time event notifications
- Custom integration endpoints
- Retry mechanisms
- Event filtering and routing

### API Rate Limiting
- Role-based rate limits
- Feature-specific quotas
- Burst allowances
- Fair usage policies