import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    subject: '',
    teacher: '',
    curriculum: 'Cambridge O-Level'
  });

  const [teacherModal, setTeacherModal] = useState({
    isOpen: false,
    teacher: null
  });

  const [syllabusModal, setSyllabusModal] = useState({
    isOpen: false,
    subject: null
  });

  const [tutorModal, setTutorModal] = useState({
    isOpen: false
  });

  const [thankYouModal, setThankYouModal] = useState({
    isOpen: false,
    title: '',
    name: '',
    message: '',
    urduMessage: '',
    whatsapp: '',
    details: [],
    waUrl: ''
  });

  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: 'success'
  });

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4500);
  };

  const openBookingModal = (opts = {}) => {
    setTeacherModal({ isOpen: false, teacher: null });
    setSyllabusModal({ isOpen: false, subject: null });
    setTutorModal({ isOpen: false });
    setBookingModal({
      isOpen: true,
      subject: typeof opts === 'string' ? opts : (opts.subject || ''),
      teacher: opts.teacher || '',
      curriculum: opts.curriculum || 'Cambridge O-Level'
    });
  };

  const closeBookingModal = () => {
    setBookingModal(prev => ({ ...prev, isOpen: false }));
  };

  const openTeacherModal = (teacher) => {
    setTeacherModal({ isOpen: true, teacher });
  };

  const closeTeacherModal = () => {
    setTeacherModal({ isOpen: false, teacher: null });
  };

  const openSyllabusModal = (subject) => {
    setSyllabusModal({ isOpen: true, subject });
  };

  const closeSyllabusModal = () => {
    setSyllabusModal({ isOpen: false, subject: null });
  };

  const openTutorModal = () => {
    setBookingModal(prev => ({ ...prev, isOpen: false }));
    setTeacherModal({ isOpen: false, teacher: null });
    setSyllabusModal({ isOpen: false, subject: null });
    setTutorModal({ isOpen: true });
  };

  const closeTutorModal = () => {
    setTutorModal({ isOpen: false });
  };

  const openThankYouModal = (config = {}) => {
    setBookingModal(prev => ({ ...prev, isOpen: false }));
    setTutorModal({ isOpen: false });
    setThankYouModal({
      isOpen: true,
      title: config.title || 'Inquiry Received',
      name: config.name || 'Valued Applicant',
      message: config.message || 'Your inquiry has been successfully received by The Readly Institute. Our academic desk will review your profile and contact you shortly.',
      urduMessage: config.urduMessage || 'ہم سے رابطہ کرنے کا بہت شکریہ۔ آپ کی تفصیلات کامیابی سے موصول ہو گئی ہیں۔',
      whatsapp: config.whatsapp || '',
      details: config.details || [],
      waUrl: config.waUrl || ''
    });
  };

  const closeThankYouModal = () => {
    setThankYouModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <ModalContext.Provider
      value={{
        bookingModal,
        openBookingModal,
        closeBookingModal,
        teacherModal,
        openTeacherModal,
        closeTeacherModal,
        syllabusModal,
        openSyllabusModal,
        closeSyllabusModal,
        tutorModal,
        openTutorModal,
        closeTutorModal,
        thankYouModal,
        openThankYouModal,
        closeThankYouModal,
        toast,
        showToast
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
