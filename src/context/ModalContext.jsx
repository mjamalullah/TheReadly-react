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
        toast,
        showToast
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
