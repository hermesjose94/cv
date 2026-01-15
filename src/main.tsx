import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'; // Tailwind 4 CSS
import './i18n'; // Initialize i18n
import App from './App.tsx';
import { PrintPreview } from './pages/PrintPreview.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/print" element={<PrintPreview />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
