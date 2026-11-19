import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import ProductPage from '../pages/ProductPage'
import AuthPage from '../pages/AuthPage'
import PixSurpresaPage from '../pages/Pix'
import HistoryPage from '../pages/HistoryPage'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/produto" element={<ProductPage />} />
        <Route path="/historico" element={<HistoryPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signin" element={<AuthPage initialMode="signup" />} />
        <Route path="/pix" element={<PixSurpresaPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}
