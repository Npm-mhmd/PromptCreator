import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import GeneratePrompt from './pages/GeneratePrompt';
import PromptLibrary from './pages/PromptLibrary';
import PromptDetail from './pages/PromptDetail';
import Templates from './pages/Templates';
import Settings from './pages/Settings';
import Profile from './pages/Profile';

const AppLayout = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) return children;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-page)' }}>
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="lg:pl-64 pt-16">
        {children}
      </main>
    </div>
  );
};

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />
      <Route
        path="/generate"
        element={<ProtectedRoute><GeneratePrompt /></ProtectedRoute>}
      />
      <Route
        path="/library"
        element={<ProtectedRoute><PromptLibrary /></ProtectedRoute>}
      />
      <Route
        path="/library/:id"
        element={<ProtectedRoute><PromptDetail /></ProtectedRoute>}
      />
      <Route
        path="/templates"
        element={<ProtectedRoute><Templates /></ProtectedRoute>}
      />
      <Route
        path="/settings"
        element={<ProtectedRoute><Settings /></ProtectedRoute>}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute><Profile /></ProtectedRoute>}
      />
      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />}
      />
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppLayout>
            <AppRoutes />
          </AppLayout>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '2px solid var(--border-color)',
                borderRadius: '16px',
                boxShadow: 'var(--shadow-md)',
              },
              success: { iconTheme: { primary: 'var(--accent-sage)', secondary: 'var(--bg-card)' } },
              error: { iconTheme: { primary: 'var(--accent-rose)', secondary: 'var(--bg-card)' } },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
