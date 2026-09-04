import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ModalProvider } from './context/ModalContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { Toast } from './components/Toast';
import { BookingModal } from './components/BookingModal';
import { TeacherModal } from './components/TeacherModal';
import { SyllabusModal } from './components/SyllabusModal';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programs } from './pages/Programs';
import { Subjects } from './pages/Subjects';
import { Teachers } from './pages/Teachers';
import { HowItWorks } from './pages/HowItWorks';
import { Resources } from './pages/Resources';
import { Contact } from './pages/Contact';
import { BookDemo } from './pages/BookDemo';
import { SubjectDetail } from './pages/SubjectDetail';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <ModalProvider>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white text-slate-800 font-body">
        <Header />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/subjects/:slug" element={<SubjectDetail />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-demo" element={<BookDemo />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        <WhatsAppFloat />
        <Toast />

        {/* Global Modals */}
        <BookingModal />
        <TeacherModal />
        <SyllabusModal />
      </div>
    </ModalProvider>
  );
}
