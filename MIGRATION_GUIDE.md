# Moving Admin into Front - Migration Guide

## Overview
This guide shows how to integrate the admin dashboard into the front application as `/admin` routes.

## 📁 New Structure

```
front/
├── src/
│   ├── App.jsx                    # Main app with routing
│   ├── main.jsx                   # Entry point
│   ├── index.css                  # Global styles
│   ├── components/
│   │   ├── public/                # Public website components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── sections/
│   │   └── admin/                 # Admin dashboard components
│   │       ├── auth/
│   │       ├── common/
│   │       ├── dashboard/
│   │       └── ui/
│   ├── pages/
│   │   ├── public/                # Public pages
│   │   │   └── Home.jsx
│   │   └── admin/                 # Admin pages
│   │       ├── Login.jsx
│   │       ├── Dashboard.jsx
│   │       ├── Inquiries.jsx
│   │       ├── Leads.jsx
│   │       ├── Potentials.jsx
│   │       └── Clients.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx        # From admin
│   ├── hooks/
│   │   └── use-mobile.ts          # From admin
│   ├── lib/
│   │   └── utils.ts               # From admin
│   └── utils/
│       ├── buttonVariants.js      # Existing
│       ├── cn.js                  # Merge both
│       └── scrollToSection.js     # Existing
```

## 🚀 Step-by-Step Migration

### Step 1: Install Missing Dependencies

```bash
cd front
npm install react-router-dom
```

The front app already has all other dependencies needed.

### Step 2: Create Admin Route Structure

Create `front/src/App.jsx` with routing:

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/admin/auth/ProtectedRoute';
import LoadingScreen from './components/common/LoadingScreen';

// Lazy load pages
const PublicHome = lazy(() => import('./pages/public/Home'));
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminInquiries = lazy(() => import('./pages/admin/Inquiries'));
const AdminLeads = lazy(() => import('./pages/admin/Leads'));
const AdminPotentials = lazy(() => import('./pages/admin/Potentials'));
const AdminClients = lazy(() => import('./pages/admin/Clients'));

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicHome />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="inquiries" element={<AdminInquiries />} />
                    <Route path="leads" element={<AdminLeads />} />
                    <Route path="potentials" element={<AdminPotentials />} />
                    <Route path="clients" element={<AdminClients />} />
                    <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
                  </Routes>
                </ProtectedRoute>
              }
            />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
```

### Step 3: Copy Files from Admin to Front

#### A. Copy Admin Components
```bash
# From project root
cp -r admin/src/components/auth front/src/components/admin/
cp -r admin/src/components/common/* front/src/components/admin/common/
cp -r admin/src/components/dashboard front/src/components/admin/
cp -r admin/src/components/ui front/src/components/admin/
```

#### B. Copy Admin Pages
```bash
mkdir -p front/src/pages/admin
cp admin/src/pages/*.jsx front/src/pages/admin/
```

#### C. Copy Admin Utilities
```bash
cp admin/src/contexts/AuthContext.jsx front/src/contexts/
cp -r admin/src/hooks front/src/
cp -r admin/src/lib front/src/
```

#### D. Merge CSS
Append admin styles to front's index.css:
```bash
cat admin/src/index.css >> front/src/index.css
```

### Step 4: Move Public Components

```bash
# Move current front components to public folder
mkdir -p front/src/components/public
mkdir -p front/src/pages/public

# Move components
mv front/src/components/Header.jsx front/src/components/public/
mv front/src/components/Footer.jsx front/src/components/public/
mv front/src/components/sections front/src/components/public/
mv front/src/components/layout front/src/components/public/

# Keep common components at root
# front/src/components/common/ (used by both)
```

### Step 5: Create Home Page

Create `front/src/pages/public/Home.jsx`:

```jsx
import { useState, useEffect, lazy, Suspense } from "react";
import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import ScrollableLayout from "../../components/public/layout/ScrollableLayout";
import HeroSection from "../../components/public/sections/HeroSection";
import LoadingScreen from "../../components/common/LoadingScreen";
import TopographicCanvas from "../../components/common/TopographicCanvas";

// Lazy load sections
const ClientsSection = lazy(() => import("../../components/public/sections/ClientsSection"));
const MessageSection = lazy(() => import("../../components/public/sections/MessageSection"));
const ServicesSection = lazy(() => import("../../components/public/sections/ServicesSection"));
const WasteStreamsShowcase = lazy(() => import("../../components/public/sections/WasteStreamsShowcase"));
const ProcessSection = lazy(() => import("../../components/public/sections/ProcessSection"));
const ServicesSlideshow = lazy(() => import("../../components/public/sections/ServicesSlideshow"));
const CTASection = lazy(() => import("../../components/public/sections/CTASection"));

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}

      <div className="relative">
        <div className="fixed inset-0" style={{ zIndex: 0 }}>
          <TopographicCanvas />
        </div>

        <div className="pointer-events-none relative" style={{ zIndex: 1 }}>
          <ScrollableLayout>
            <Header />
            <main className="pt-20">
              <HeroSection />
              <Suspense fallback={<div className="min-h-screen" />}>
                <MessageSection />
                <ServicesSection />
                <WasteStreamsShowcase />
                <ProcessSection />
                <ServicesSlideshow />
                <CTASection />
                <ClientsSection />
              </Suspense>
            </main>
            <Footer />
          </ScrollableLayout>
        </div>
      </div>
    </>
  );
};

export default Home;
```

### Step 6: Update Package.json

Update `front/package.json`:

```json
{
  "name": "wasteph",
  "dependencies": {
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-tooltip": "^1.2.8",
    "@react-map/philippines": "^1.0.9",
    "@tailwindcss/vite": "^4.1.18",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.23.25",
    "lucide-react": "^0.562.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.11.0",
    "tailwind-merge": "^3.4.0",
    "tailwindcss": "^4.1.18"
  }
}
```

### Step 7: Update Vite Config

Update `front/vite.config.js`:

```js
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### Step 8: Update Import Paths

Update all admin component imports to use the new structure:

**Before (admin standalone):**
```jsx
import DashboardCard from '../components/common/DashboardCard';
```

**After (integrated):**
```jsx
import DashboardCard from '../../components/admin/common/DashboardCard';
```

Use find & replace in your editor for efficiency.

### Step 9: Update tsconfig (for TypeScript files)

Create/update `front/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Step 10: Clean Up

After migration is complete and tested:

```bash
# Remove the old admin folder
rm -rf admin

# Remove old build scripts
rm build-merge.js
rm DEPLOYMENT.md (we'll create a new one)
```

## 🏗️ Final Project Structure

```
wasteph-grim/
├── front/                          # Main application
│   ├── src/
│   │   ├── App.jsx                # Router setup
│   │   ├── main.jsx               # Entry point
│   │   ├── components/
│   │   │   ├── public/            # Public site
│   │   │   ├── admin/             # Admin dashboard
│   │   │   └── common/            # Shared components
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   └── admin/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
└── comingSoon/                     # Keep if still needed
```

## 🚀 Build & Deploy

### Development
```bash
cd front
npm run dev
# All routes available:
# - http://localhost:5173/
# - http://localhost:5173/admin/login
# - http://localhost:5173/admin/dashboard
```

### Production Build
```bash
cd front
npm run build
```

### Deploy
Deploy the `front/dist` folder to any static hosting:

- **Netlify**: Drag & drop `front/dist` or connect Git
- **Vercel**: Deploy `front` folder
- **Cloudflare Pages**: Deploy `front` folder

The routing will work automatically with React Router!

## 📝 Benefits of This Approach

✅ **Single Build**: One build process instead of two
✅ **Simpler Deployment**: Deploy one folder
✅ **Shared Dependencies**: No duplicate packages
✅ **Easier Maintenance**: Everything in one place
✅ **Better Performance**: Shared code splitting
✅ **Cleaner Structure**: Logical organization

## 🔄 Routing

| URL | Component | Description |
|-----|-----------|-------------|
| `/` | Home (public) | Main website |
| `/admin` | Redirect to `/admin/dashboard` | - |
| `/admin/login` | Login | Admin login page |
| `/admin/dashboard` | Dashboard | Protected route |
| `/admin/inquiries` | Inquiries | Protected route |
| `/admin/leads` | Leads | Protected route |
| `/admin/potentials` | Potentials | Protected route |
| `/admin/clients` | Clients | Protected route |

All admin routes except `/admin/login` are protected and require authentication.

---

Need help with the migration? Let me know! 🚀

