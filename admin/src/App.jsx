import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import PrivacyPolicy from './pages/legal pages/PrivacyPolicy';
import Login from './pages/authentication/Login';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminCollections from './pages/AdminCollections';
import AdminProducts from './pages/AdminProducts';
import AdminHeaderSlider from './pages/AdminHeaderSlider';
import AdminContactForm from './pages/AdminContactForm';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Protected Routes */}
          <Route 
            path='/' 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/collections' 
            element={
              <ProtectedRoute>
                <AdminCollections />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/products' 
            element={
              <ProtectedRoute>
                <AdminProducts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/slider' 
            element={
              <ProtectedRoute>
                <AdminHeaderSlider />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/contact' 
            element={
              <ProtectedRoute>
                <AdminContactForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path='/faq' 
            element={
              <ProtectedRoute>
                <PrivacyPolicy />
              </ProtectedRoute>
            } 
          />

          {/* Public route */}
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
