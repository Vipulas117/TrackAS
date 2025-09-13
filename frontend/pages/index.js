@@ .. @@
-export default function Home(){ return (<div style={{padding:20}}><h2>TrackAS Demo</h2><p>Use /company/dashboard, /driver/dashboard, /admin/approvals</p></div>); }
+import Link from 'next/link';
+import Head from 'next/head';
+
+export default function Home() {
+  return (
+    <>
+      <Head>
+        <title>TrackAS - Complete Logistics Management Platform</title>
+        <meta name="description" content="Streamline your logistics operations with real-time tracking, AI-powered routing, and comprehensive management tools." />
+      </Head>
+      
+      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
+        {/* Header */}
+        <header className="bg-white shadow-sm">
+          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
+            <div className="flex justify-between items-center py-6">
+              <div className="flex items-center">
+                <h1 className="text-3xl font-bold text-primary-600">TrackAS</h1>
+                <span className="ml-2 text-sm text-gray-500">Logistics Platform</span>
+              </div>
+              <nav className="hidden md:flex space-x-8">
+                <Link href="#features" className="text-gray-600 hover:text-primary-600">Features</Link>
+                <Link href="#about" className="text-gray-600 hover:text-primary-600">About</Link>
+                <Link href="#contact" className="text-gray-600 hover:text-primary-600">Contact</Link>
+              </nav>
+            </div>
+          </div>
+        </header>
+
+        {/* Hero Section */}
+        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
+          <div className="text-center">
+            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
+              Complete Logistics
+              <span className="text-primary-600"> Management Platform</span>
+            </h2>
+            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
+              Streamline your logistics operations with real-time tracking, AI-powered routing, 
+              automated payments, and comprehensive management tools.
+            </p>
+          </div>
+
+          {/* Portal Selection */}
+          <div className="grid md:grid-cols-3 gap-8 mt-16">
+            <div className="card hover:shadow-lg transition-shadow duration-300">
+              <div className="text-center">
+                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
+                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
+                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
+                  </svg>
+                </div>
+                <h3 className="text-xl font-semibold text-gray-900 mb-2">Company Portal</h3>
+                <p className="text-gray-600 mb-4">Manage shipments, track deliveries, and coordinate with drivers</p>
+                <div className="space-y-2">
+                  <Link href="/company/login" className="block btn-primary">
+                    Company Login
+                  </Link>
+                  <Link href="/company/register" className="block btn-secondary">
+                    Register Company
+                  </Link>
+                </div>
+              </div>
+            </div>
+
+            <div className="card hover:shadow-lg transition-shadow duration-300">
+              <div className="text-center">
+                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
+                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
+                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
+                  </svg>
+                </div>
+                <h3 className="text-xl font-semibold text-gray-900 mb-2">Driver Portal</h3>
+                <p className="text-gray-600 mb-4">Accept shipments, navigate routes, and manage deliveries</p>
+                <div className="space-y-2">
+                  <Link href="/driver/login" className="block btn-primary">
+                    Driver Login
+                  </Link>
+                  <Link href="/driver/register" className="block btn-secondary">
+                    Register as Driver
+                  </Link>
+                </div>
+              </div>
+            </div>
+
+            <div className="card hover:shadow-lg transition-shadow duration-300">
+              <div className="text-center">
+                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
+                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
+                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
+                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
+                  </svg>
+                </div>
+                <h3 className="text-xl font-semibold text-gray-900 mb-2">Admin Portal</h3>
+                <p className="text-gray-600 mb-4">Platform management, approvals, and system configuration</p>
+                <div className="space-y-2">
+                  <Link href="/admin/login" className="block btn-primary">
+                    Admin Login
+                  </Link>
+                </div>
+              </div>
+            </div>
+          </div>
+
+          {/* Tracking Section */}
+          <div className="mt-16 text-center">
+            <div className="card max-w-md mx-auto">
+              <h3 className="text-xl font-semibold text-gray-900 mb-4">Track Your Shipment</h3>
+              <div className="flex gap-2">
+                <input
+                  type="text"
+                  placeholder="Enter tracking number..."
+                  className="form-input flex-1"
+                />
+                <button className="btn-primary">Track</button>
+              </div>
+            </div>
+          </div>
+
+          {/* Features Section */}
+          <div id="features" className="mt-20">
+            <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">Platform Features</h3>
+            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
+              <div className="text-center">
+                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
+                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
+                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
+                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
+                  </svg>
+                </div>
+                <h4 className="font-semibold text-gray-900 mb-2">Real-time Tracking</h4>
+                <p className="text-sm text-gray-600">Live GPS tracking with accurate ETAs</p>
+              </div>
+              
+              <div className="text-center">
+                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
+                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
+                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
+                  </svg>
+                </div>
+                <h4 className="font-semibold text-gray-900 mb-2">Secure Payments</h4>
+                <p className="text-sm text-gray-600">Escrow system with multiple payment options</p>
+              </div>
+              
+              <div className="text-center">
+                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
+                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
+                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
+                  </svg>
+                </div>
+                <h4 className="font-semibold text-gray-900 mb-2">AI Assistant</h4>
+                <p className="text-sm text-gray-600">24/7 multilingual support chatbot</p>
+              </div>
+              
+              <div className="text-center">
+                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
+                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
+                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
+                  </svg>
+                </div>
+                <h4 className="font-semibold text-gray-900 mb-2">Analytics</h4>
+                <p className="text-sm text-gray-600">Comprehensive reporting and insights</p>
+              </div>
+            </div>
+          </div>
+        </main>

+        {/* Footer */}
+        <footer className="bg-gray-900 text-white py-12 mt-20">
+          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
+            <div className="grid md:grid-cols-4 gap-8">
+              <div>
+                <h3 className="text-xl font-bold mb-4">TrackAS</h3>
+                <p className="text-gray-400">Complete logistics management platform for modern businesses.</p>
+              </div>
+              <div>
+                <h4 className="font-semibold mb-4">Platform</h4>
+                <ul className="space-y-2 text-gray-400">
+                  <li><Link href="/company/register">For Companies</Link></li>
+                  <li><Link href="/driver/register">For Drivers</Link></li>
+                  <li><Link href="/features">Features</Link></li>
+                  <li><Link href="/pricing">Pricing</Link></li>
+                </ul>
+              </div>
+              <div>
+                <h4 className="font-semibold mb-4">Support</h4>
+                <ul className="space-y-2 text-gray-400">
+                  <li><Link href="/help">Help Center</Link></li>
+                  <li><Link href="/contact">Contact Us</Link></li>
+                  <li><Link href="/api-docs">API Documentation</Link></li>
+                  <li><Link href="/status">System Status</Link></li>
+                </ul>
+              </div>
+              <div>
+                <h4 className="font-semibold mb-4">Company</h4>
+                <ul className="space-y-2 text-gray-400">
+                  <li><Link href="/about">About Us</Link></li>
+                  <li><Link href="/careers">Careers</Link></li>
+                  <li><Link href="/privacy">Privacy Policy</Link></li>
+                  <li><Link href="/terms">Terms of Service</Link></li>
+                </ul>
+              </div>
+            </div>
+            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
+              <p>&copy; 2024 TrackAS. All rights reserved.</p>
+            </div>
+          </div>
+        </footer>
+      </div>
+    </>
+  );
+}