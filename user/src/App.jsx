import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CategoriesPage from './pages/CategoriesPage';
import AllCategories from './pages/AllCategories';
import Catalogue from './pages/Catalogue';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import PrivacyPolicy from './pages/legal pages/PrivacyPolicy';
import TermsConditions from './pages/legal pages/TermsCondition';
import RefundReturnPolicy from './pages/legal pages/RefundReturnPolicy';
import ShippingDeliveryPolicy from './pages/legal pages/ShippingDeliveryPolicy';
import Disclaimer from './pages/legal pages/Disclaimer';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='/catalogue' element={<Catalogue />} />
          <Route path='/collection/:id' element={<CategoriesPage />} />
          <Route path='/all_collections' element={<AllCategories />} />
          <Route path='/product/:id' element={<ProductPage />} />

          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/refund-policy" element={<RefundReturnPolicy />} />
          <Route path="/shipping" element={<ShippingDeliveryPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
