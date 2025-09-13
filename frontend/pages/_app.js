@@ .. @@
-import '../styles.css'; import ChatWidget from './components/ChatWidget'; export default function MyApp({ Component, pageProps }) { return (<><Component {...pageProps} /><ChatWidget /></>); }
+import '../styles/globals.css';
+import ChatWidget from '../components/ChatWidget';
+import Head from 'next/head';
+
+export default function MyApp({ Component, pageProps }) {
+  return (
+    <>
+      <Head>
+        <title>TrackAS - Logistics Management Platform</title>
+        <meta name="description" content="Complete logistics management and tracking platform" />
+        <meta name="viewport" content="width=device-width, initial-scale=1" />
+        <link rel="icon" href="/favicon.ico" />
+      </Head>
+      <Component {...pageProps} />
+      <ChatWidget />
+    </>
+  );
+}