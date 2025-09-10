# Database Design

## Entity Relationship Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     USERS       │    │   COMPANIES     │    │   OPERATORS     │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ id (PK)         │◄──┐│ id (PK)         │    │ id (PK)         │
│ email           │   └┤ user_id (FK)    │    │ user_id (FK)    │◄─┐
│ password_hash   │    │ name            │    │ name            │  │
│ role            │    │ address         │    │ license_no      │  │
│ phone           │    │ tin_number      │    │ phone           │  │
│ is_verified     │    │ status          │    │ status          │  │
│ created_at      │    │ bank_details    │    │ bank_details    │  │
│ updated_at      │    │ created_at      │    │ rating_avg      │  │
└─────────────────┘    └─────────┬───────┘    │ is_online       │  │
                                 │            │ current_lat     │  │
┌─────────────────┐              │            │ current_lng     │  │
│    VEHICLES     │              │            │ created_at      │  │
├─────────────────┤              │            └─────────┬───────┘  │
│ id (PK)         │              │                      │          │
│ company_id (FK) │◄─────────────┘                      │          │
│ registration_no │                                     │          │
│ vehicle_type    │              ┌─────────────────┐    │          │
│ capacity_weight │              │   SHIPMENTS     │    │          │
│ capacity_volume │              ├─────────────────┤    │          │
│ status          │              │ id (PK)         │    │          │
│ created_at      │              │ company_id (FK) │────┘          │
└─────────────────┘              │ operator_id(FK) │───────────────┘
                                 │ vehicle_id (FK) │◄──────────────┐
┌─────────────────┐              │ title           │               │
│     STOPS       │              │ description     │               │
├─────────────────┤              │ pickup_address  │               │
│ id (PK)         │              │ pickup_lat      │               │
│ shipment_id(FK) │◄─────────────┤ pickup_lng      │               │
│ type            │              │ pickup_contact  │               │
│ address         │              │ delivery_address│               │
│ latitude        │              │ delivery_lat    │               │
│ longitude       │              │ delivery_lng    │               │
│ contact_name    │              │ delivery_contact│               │
│ contact_phone   │              │ weight          │               │
│ status          │              │ dimensions      │               │
│ sequence_order  │              │ goods_value     │               │
│ completed_at    │              │ shipment_cost   │               │
└─────────────────┘              │ status          │               │
                                 │ priority        │               │
┌─────────────────┐              │ created_at      │               │
│    PAYMENTS     │              │ pickup_time     │               │
├─────────────────┤              │ delivery_time   │               │
│ id (PK)         │              │ estimated_time  │               │
│ shipment_id(FK) │◄─────────────┤ tracking_code   │               │
│ company_id (FK) │              └─────────────────┘               │
│ operator_id(FK) │                                                │
│ amount          │              ┌─────────────────┐               │
│ commission_rate │              │   TRACKINGS     │               │
│ commission_amt  │              ├─────────────────┤               │
│ net_payout      │              │ id (PK)         │               │
│ payment_method  │              │ shipment_id(FK) │◄──────────────┘
│ gateway_txn_id  │              │ operator_id(FK) │
│ status          │              │ latitude        │
│ created_at      │              │ longitude       │
│ processed_at    │              │ timestamp       │
└─────────────────┘              │ speed           │
                                 │ heading         │
┌─────────────────┐              │ accuracy        │
│    RATINGS      │              └─────────────────┘
├─────────────────┤              
│ id (PK)         │              ┌─────────────────┐
│ shipment_id(FK) │◄─────────────┤ NOTIFICATIONS   │
│ rated_by_type   │              ├─────────────────┤
│ rated_by_id     │              │ id (PK)         │
│ rated_to_id     │              │ user_id (FK)    │
│ rating          │              │ shipment_id(FK) │
│ comment         │              │ type            │
│ created_at      │              │ title           │
└─────────────────┘              │ message         │
                                 │ channel         │
┌─────────────────┐              │ status          │
│SUPPORT_TICKETS  │              │ sent_at         │
├─────────────────┤              │ read_at         │
│ id (PK)         │              └─────────────────┘
│ user_id (FK)    │              
│ shipment_id(FK) │              ┌─────────────────┐
│ subject         │              │   DOCUMENTS     │
│ message         │              ├─────────────────┤
│ priority        │              │ id (PK)         │
│ status          │              │ shipment_id(FK) │
│ assigned_to     │              │ type            │
│ created_at      │              │ file_url        │
│ resolved_at     │              │ file_name       │
└─────────────────┘              │ uploaded_by     │
                                 │ uploaded_at     │
┌─────────────────┐              └─────────────────┘
│   SETTINGS      │              
├─────────────────┤              ┌─────────────────┐
│ id (PK)         │              │    WALLETS      │
│ key             │              ├─────────────────┤
│ value           │              │ id (PK)         │
│ description     │              │ user_id (FK)    │
│ type            │              │ balance         │
│ created_at      │              │ locked_amount   │
│ updated_at      │              │ created_at      │
└─────────────────┘              │ updated_at      │
                                 └─────────────────┘
```

## Table Definitions

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('ADMIN', 'COMPANY', 'OPERATOR', 'CUSTOMER')),
    phone VARCHAR(15),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    reset_token VARCHAR(255),
    reset_token_expires TIMESTAMP,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_phone ON users(phone);
```

### Companies Table
```sql
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    tin_number VARCHAR(50),
    gst_number VARCHAR(50),
    pan_number VARCHAR(20),
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED')),
    bank_account_number VARCHAR(50),
    bank_ifsc VARCHAR(20),
    bank_name VARCHAR(255),
    account_holder_name VARCHAR(255),
    commission_rate DECIMAL(5,2) DEFAULT 5.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_companies_user_id ON companies(user_id);
CREATE INDEX idx_companies_status ON companies(status);
```

### Operators Table
```sql
CREATE TABLE operators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    license_number VARCHAR(50) NOT NULL,
    license_expiry DATE,
    phone VARCHAR(15) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED')),
    bank_account_number VARCHAR(50),
    bank_ifsc VARCHAR(20),
    bank_name VARCHAR(255),
    account_holder_name VARCHAR(255),
    rating_average DECIMAL(3,2) DEFAULT 0.00,
    total_ratings INTEGER DEFAULT 0,
    is_online BOOLEAN DEFAULT FALSE,
    current_latitude DECIMAL(10,8),
    current_longitude DECIMAL(11,8),
    last_location_update TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_operators_user_id ON operators(user_id);
CREATE INDEX idx_operators_status ON operators(status);
CREATE INDEX idx_operators_is_online ON operators(is_online);
CREATE INDEX idx_operators_location ON operators(current_latitude, current_longitude);
```

### Vehicles Table
```sql
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    registration_number VARCHAR(20) UNIQUE NOT NULL,
    vehicle_type VARCHAR(50) NOT NULL,
    make VARCHAR(100),
    model VARCHAR(100),
    year INTEGER,
    capacity_weight DECIMAL(10,2),
    capacity_volume DECIMAL(10,2),
    fuel_type VARCHAR(20),
    insurance_number VARCHAR(100),
    insurance_expiry DATE,
    permit_number VARCHAR(100),
    permit_expiry DATE,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'MAINTENANCE')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_vehicles_company_id ON vehicles(company_id);
CREATE INDEX idx_vehicles_registration ON vehicles(registration_number);
CREATE INDEX idx_vehicles_status ON vehicles(status);
```

### Shipments Table
```sql
CREATE TABLE shipments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id),
    operator_id UUID REFERENCES operators(id),
    vehicle_id UUID REFERENCES vehicles(id),
    tracking_code VARCHAR(20) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- Pickup Details
    pickup_address TEXT NOT NULL,
    pickup_latitude DECIMAL(10,8),
    pickup_longitude DECIMAL(11,8),
    pickup_contact_name VARCHAR(255),
    pickup_contact_phone VARCHAR(15),
    pickup_contact_email VARCHAR(255),
    pickup_scheduled_time TIMESTAMP,
    pickup_actual_time TIMESTAMP,
    
    -- Delivery Details
    delivery_address TEXT NOT NULL,
    delivery_latitude DECIMAL(10,8),
    delivery_longitude DECIMAL(11,8),
    delivery_contact_name VARCHAR(255),
    delivery_contact_phone VARCHAR(15),
    delivery_contact_email VARCHAR(255),
    delivery_scheduled_time TIMESTAMP,
    delivery_actual_time TIMESTAMP,
    
    -- Shipment Details
    weight DECIMAL(10,2),
    length DECIMAL(8,2),
    width DECIMAL(8,2),
    height DECIMAL(8,2),
    volume DECIMAL(10,2),
    goods_type VARCHAR(100),
    goods_value DECIMAL(12,2),
    special_instructions TEXT,
    
    -- Pricing
    shipment_cost DECIMAL(10,2) NOT NULL,
    commission_rate DECIMAL(5,2) DEFAULT 5.00,
    commission_amount DECIMAL(10,2),
    
    -- Status and Priority
    status VARCHAR(20) DEFAULT 'CREATED' CHECK (status IN ('CREATED', 'ASSIGNED', 'PICKED_UP', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED')),
    priority VARCHAR(10) DEFAULT 'NORMAL' CHECK (priority IN ('LOW', 'NORMAL', 'HIGH', 'URGENT')),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estimated_delivery TIMESTAMP,
    
    -- Additional fields
    distance_km DECIMAL(8,2),
    estimated_duration_minutes INTEGER
);

CREATE INDEX idx_shipments_company_id ON shipments(company_id);
CREATE INDEX idx_shipments_operator_id ON shipments(operator_id);
CREATE INDEX idx_shipments_tracking_code ON shipments(tracking_code);
CREATE INDEX idx_shipments_status ON shipments(status);
CREATE INDEX idx_shipments_created_at ON shipments(created_at);
```

### Stops Table (for multi-drop shipments)
```sql
CREATE TABLE stops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
    type VARCHAR(10) NOT NULL CHECK (type IN ('PICKUP', 'DELIVERY')),
    address TEXT NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    contact_name VARCHAR(255),
    contact_phone VARCHAR(15),
    contact_email VARCHAR(255),
    sequence_order INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'COMPLETED', 'FAILED')),
    scheduled_time TIMESTAMP,
    completed_at TIMESTAMP,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_stops_shipment_id ON stops(shipment_id);
CREATE INDEX idx_stops_sequence ON stops(shipment_id, sequence_order);
```

### Trackings Table (GPS tracking data)
```sql
CREATE TABLE trackings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shipment_id UUID NOT NULL REFERENCES shipments(id) ON DELETE CASCADE,
    operator_id UUID NOT NULL REFERENCES operators(id),
    latitude DECIMAL(10,8) NOT NULL,
    longitude DECIMAL(11,8) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    speed DECIMAL(5,2),
    heading DECIMAL(5,2),
    accuracy DECIMAL(8,2),
    battery_level INTEGER,
    is_moving BOOLEAN DEFAULT TRUE
);

CREATE INDEX idx_trackings_shipment_id ON trackings(shipment_id);
CREATE INDEX idx_trackings_timestamp ON trackings(timestamp);
CREATE INDEX idx_trackings_operator_id ON trackings(operator_id);
```

### Payments Table
```sql
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shipment_id UUID NOT NULL REFERENCES shipments(id),
    company_id UUID NOT NULL REFERENCES companies(id),
    operator_id UUID REFERENCES operators(id),
    
    -- Amount Details
    amount DECIMAL(12,2) NOT NULL,
    commission_rate DECIMAL(5,2) NOT NULL,
    commission_amount DECIMAL(10,2) NOT NULL,
    net_payout DECIMAL(10,2) NOT NULL,
    
    -- Payment Details
    payment_method VARCHAR(20) NOT NULL CHECK (payment_method IN ('ONLINE', 'CASH', 'WALLET')),
    gateway_name VARCHAR(50),
    gateway_transaction_id VARCHAR(255),
    gateway_payment_id VARCHAR(255),
    
    -- Status
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED')),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP,
    completed_at TIMESTAMP,
    
    -- Additional Details
    failure_reason TEXT,
    refund_amount DECIMAL(10,2),
    refund_reason TEXT
);

CREATE INDEX idx_payments_shipment_id ON payments(shipment_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at);
```

### Ratings Table
```sql
CREATE TABLE ratings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shipment_id UUID NOT NULL REFERENCES shipments(id),
    rated_by_type VARCHAR(20) NOT NULL CHECK (rated_by_type IN ('COMPANY', 'CUSTOMER')),
    rated_by_id UUID NOT NULL,
    rated_to_id UUID NOT NULL REFERENCES operators(id),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ratings_shipment_id ON ratings(shipment_id);
CREATE INDEX idx_ratings_rated_to_id ON ratings(rated_to_id);
```

### Support Tickets Table
```sql
CREATE TABLE support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    shipment_id UUID REFERENCES shipments(id),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority VARCHAR(10) DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')),
    status VARCHAR(20) DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')),
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);

CREATE INDEX idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX idx_support_tickets_status ON support_tickets(status);
CREATE INDEX idx_support_tickets_created_at ON support_tickets(created_at);
```

### Notifications Table
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    shipment_id UUID REFERENCES shipments(id),
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    channel VARCHAR(20) NOT NULL CHECK (channel IN ('EMAIL', 'SMS', 'WHATSAPP', 'PUSH', 'IN_APP')),
    status VARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SENT', 'DELIVERED', 'FAILED')),
    sent_at TIMESTAMP,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_status ON notifications(status);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);
```

### Documents Table
```sql
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shipment_id UUID REFERENCES shipments(id),
    user_id UUID NOT NULL REFERENCES users(id),
    type VARCHAR(50) NOT NULL CHECK (type IN ('POD', 'INVOICE', 'RECEIPT', 'LICENSE', 'INSURANCE', 'PERMIT')),
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    uploaded_by UUID NOT NULL REFERENCES users(id),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_documents_shipment_id ON documents(shipment_id);
CREATE INDEX idx_documents_type ON documents(type);
```

### Wallets Table
```sql
CREATE TABLE wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    balance DECIMAL(12,2) DEFAULT 0.00,
    locked_amount DECIMAL(12,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_wallets_user_id ON wallets(user_id);
```

### Wallet Transactions Table
```sql
CREATE TABLE wallet_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id UUID NOT NULL REFERENCES wallets(id),
    shipment_id UUID REFERENCES shipments(id),
    type VARCHAR(20) NOT NULL CHECK (type IN ('CREDIT', 'DEBIT', 'LOCK', 'UNLOCK')),
    amount DECIMAL(12,2) NOT NULL,
    balance_after DECIMAL(12,2) NOT NULL,
    description TEXT,
    reference_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wallet_transactions_wallet_id ON wallet_transactions(wallet_id);
CREATE INDEX idx_wallet_transactions_created_at ON wallet_transactions(created_at);
```

### Settings Table
```sql
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    description TEXT,
    type VARCHAR(20) DEFAULT 'STRING' CHECK (type IN ('STRING', 'NUMBER', 'BOOLEAN', 'JSON')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX idx_settings_key ON settings(key);
```

## Indexes and Performance Optimization

### Composite Indexes
```sql
-- For shipment queries by company and status
CREATE INDEX idx_shipments_company_status ON shipments(company_id, status);

-- For operator availability queries
CREATE INDEX idx_operators_online_location ON operators(is_online, current_latitude, current_longitude) WHERE is_online = TRUE;

-- For tracking queries
CREATE INDEX idx_trackings_shipment_time ON trackings(shipment_id, timestamp DESC);

-- For payment queries
CREATE INDEX idx_payments_company_status ON payments(company_id, status);
```

### Partitioning Strategy
```sql
-- Partition trackings table by month for better performance
CREATE TABLE trackings_y2024m01 PARTITION OF trackings
FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');

-- Similar partitioning for notifications and wallet_transactions
```

## Data Constraints and Business Rules

### Triggers for Data Integrity
```sql
-- Update shipment status based on tracking
CREATE OR REPLACE FUNCTION update_shipment_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Auto-update shipment status based on stops completion
    UPDATE shipments 
    SET status = CASE 
        WHEN (SELECT COUNT(*) FROM stops WHERE shipment_id = NEW.shipment_id AND status = 'COMPLETED') = 
             (SELECT COUNT(*) FROM stops WHERE shipment_id = NEW.shipment_id)
        THEN 'DELIVERED'
        ELSE 'IN_TRANSIT'
    END
    WHERE id = NEW.shipment_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_shipment_status
    AFTER UPDATE ON stops
    FOR EACH ROW
    EXECUTE FUNCTION update_shipment_status();
```

### Data Validation Rules
```sql
-- Ensure pickup time is before delivery time
ALTER TABLE shipments ADD CONSTRAINT check_pickup_before_delivery 
CHECK (pickup_scheduled_time < delivery_scheduled_time);

-- Ensure rating is between 1 and 5
ALTER TABLE ratings ADD CONSTRAINT check_rating_range 
CHECK (rating >= 1 AND rating <= 5);

-- Ensure positive amounts
ALTER TABLE payments ADD CONSTRAINT check_positive_amount 
CHECK (amount > 0);
```