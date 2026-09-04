// ==========================================================================
// THE READLY INSTITUTE — MAIN JAVASCRIPT CONTROLLER
// Features: 3s Hero Slider, Sticky Header, FAQ Accordion, Stats Counter,
// Subject Syllabus Dialog Box, Teacher Profile Dialog Box, Booking Dialog Box
// ==========================================================================

// ================= 0. BACKEND CONFIGURATION (WHATSAPP & GOOGLE SHEET) =================
window.READLY_CONFIG = {
  // Official WhatsApp Admissions Number (International format without '+')
  whatsappNumber: "923337221552",

  // Google Sheets Web App URL (Connected & Live)
  googleSheetWebAppUrl: "https://script.google.com/macros/s/AKfycbyTd3OnnYBMC_TqZSvuryAdVewcV3uQxB84s9TV3F3lZwhqyMugC7JZry9kMmTHINWj/exec", 

  // Dual Dispatch Toggles
  enableWhatsAppRedirect: true,
  enableGoogleSheetLogging: true
};

// Verified Faculty Dataset
const tutorsData = [
  {
    id: "tutor-sohail-urdu",
    name: "Sohail Anjum",
    role: "Cambridge Urdu Specialist",
    qualifications: "Master in Urdu",
    level: "O-Level • IGCSE",
    category: "languages",
    experience: "15+ Years in O-Level (First & Second Language) and IGCSE",
    bio: "Distinguished Cambridge Urdu specialist with 15+ years of dedicated teaching experience in Cambridge O-Level (as First Language & Second Language) and IGCSE. Renowned for structured essay composition, comprehension analysis, precis writing, and Cambridge examiner mark-scheme precision.",
    subjects: ["O-Level Urdu First Language (3247)", "O-Level Urdu Second Language (3248)", "Cambridge IGCSE Urdu (0539)", "Urdu Essay Composition & Translation"],
    achievements: "15+ years of verified distinction results, mentoring hundreds of students to straight A* grades across international centers.",
    image: "images/teachers/sohail-anjum.jpg"
  },
  {
    id: "tutor-sarah-maths",
    name: "Dr. Sarah Ahmed",
    role: "Mathematics Specialist",
    qualifications: "MSc Mathematics • Cambridge Distinction Coach",
    level: "O-Level • A-Level",
    category: "maths",
    experience: "10+ Years Experience",
    bio: "Specializes in Pure Mathematics (9709 P1 & P3) and Mechanics vectors. Known for breaking down complex differential equations and vector geometry into intuitive step-by-step algorithms.",
    subjects: ["A-Level Mathematics (9709)", "O-Level Mathematics (4024)", "Additional Mathematics (4037)", "Edexcel Pure P1-P4"],
    achievements: "Over 300+ students guided to straight A* distinctions across Cambridge exam centers.",
    image: "images/teachers/sarah-ahmed.jpg"
  },
  {
    id: "tutor-hamza-physics",
    name: "Mr. Hamza Khan",
    role: "Physics Specialist",
    qualifications: "MPhil Physics • Practical ATP Lead",
    level: "O-Level • A-Level",
    category: "sciences",
    experience: "8+ Years Experience",
    bio: "Experienced educator focusing on first-principles kinematics, quantum physics, and electromagnetic induction. Expert in Paper 4 theory derivations and Paper 5 experiment design.",
    subjects: ["A-Level Physics (9702)", "O-Level Physics (5054)", "IGCSE Physics (0625)", "Paper 5 Planning"],
    achievements: "Specialized laboratory simulation worksheets credited with 94% distinctions in Paper 4 & 5.",
    image: "images/teachers/hamza-khan.jpg"
  },
  {
    id: "tutor-farhan-chem",
    name: "Dr. Farhan Siddiqui",
    role: "Chemistry Specialist",
    qualifications: "PhD Chemistry • Medical Entrance Mentor",
    level: "O-Level • A-Level",
    category: "sciences",
    experience: "12+ Years Experience",
    bio: "Teaches organic reaction pathways, equilibrium kinetics, and stoichiometry calculations with absolute clarity. Guides pre-medical students toward straight A*s.",
    subjects: ["A-Level Chemistry (9701)", "O-Level Chemistry (5070)", "IGCSE Chemistry (0620)", "Organic Synthesis"],
    achievements: "Authored specialized reaction mechanism roadmaps adopted by international students worldwide.",
    image: "images/teachers/farhan-siddiqui.jpg"
  },
  {
    id: "tutor-daniyal-cs",
    name: "Mr. Daniyal Qureshi",
    role: "Computer Science Specialist",
    qualifications: "MS Software Engineering • Senior Engineer",
    level: "O-Level • A-Level",
    category: "technology",
    experience: "8+ Years Experience",
    bio: "Teaches live screen Python programming, OOP design patterns, and pseudocode algorithms for A-Level Paper 4 and O-Level Computer Science (2210/9618).",
    subjects: ["A-Level Computer Science (9618)", "O-Level CS (2210)", "IGCSE CS (0478)", "Python Paper 4 Live Coding"],
    achievements: "Full hands-on screen-sharing labs with zero-loss debugging methodologies.",
    image: "images/teachers/daniyal-qureshi.jpg"
  },
  {
    id: "tutor-mahnoor-econ",
    name: "Ms. Mahnoor Tariq",
    role: "Economics Specialist",
    qualifications: "BSc Economics (LSE) • Certified Examiner",
    level: "O-Level • A-Level",
    category: "commerce",
    experience: "9+ Years Experience",
    bio: "Expert in macroeconomic fiscal models, monetary policy diagrams, and the BLT (Because-Leading-To) method for 20-mark Cambridge evaluation essays.",
    subjects: ["A-Level Economics (9708)", "O-Level Economics (2281)", "Business Studies (7115)", "Micro/Macro Policy"],
    achievements: "Trained hundreds of students who achieved Cambridge Top in Region and Top in Country in Economics.",
    image: "images/teachers/mahnoor-tariq.jpg"
  },
  {
    id: "tutor-ayesha-english",
    name: "Ms. Ayesha Malik",
    role: "English Language Specialist",
    qualifications: "MA English • Cambridge Certified",
    level: "O-Level • IGCSE",
    category: "humanities",
    experience: "9+ Years Experience",
    bio: "Specialist in critical reading comprehension, 10-point summary formulas, and advanced narrative & discursive essay writing for CAIE 1123 and IGCSE 0500.",
    subjects: ["English Language (1123)", "Cambridge IGCSE English (0500)", "Creative Writing", "Directed Essays"],
    achievements: "Master of 10-point summary structure; students consistently score 28+/30 on Directed Writing.",
    image: "images/teachers/ayesha-malik.jpg"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  try { initTeachersSection(); } catch (err) { console.error('Teacher section init error:', err); }
  try { initDemoForms(); } catch (err) { console.error('Demo forms init error:', err); }
  try { initSubjectFiltering(); } catch (err) { console.error('Subject filtering init error:', err); }
  try { initHeaderScroll(); } catch (err) {}
  try { initMobileMenu(); } catch (err) {}
  try { initHeroSlider(); } catch (err) {}
  try { initFaqAccordion(); } catch (err) {}
  try { initStatsCounter(); } catch (err) {}
  try {
    if (typeof lucide !== 'undefined' && lucide && lucide.createIcons) {
      lucide.createIcons();
    }
  } catch (err) {}
});

// ================= 1. HEADER SHRINK ON SCROLL =================
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ================= 2. MOBILE MENU DRAWER =================
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
      const isOpen = drawer.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', (e) => {
      if (!drawer.contains(e.target) && !toggleBtn.contains(e.target) && drawer.classList.contains('open')) {
        drawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

// ================= 3. HERO SLIDER (AUTOMATIC 3-SECOND ROTATION) =================
function initHeroSlider() {
  const sliderWrapper = document.querySelector('.hero-slider-wrapper');
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-arrow-prev');
  const nextBtn = document.querySelector('.slider-arrow-next');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval = null;
  const ROTATION_INTERVAL = 3000; // Exact 3-second auto-play

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active-slide');
      if (dots[i]) dots[i].classList.remove('active-dot');
    });

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active-slide');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active-dot');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(nextSlide, ROTATION_INTERVAL);
  }

  function stopAutoplay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); startAutoplay(); });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      startAutoplay();
    });
  });

  if (sliderWrapper) {
    sliderWrapper.addEventListener('mouseenter', stopAutoplay);
    sliderWrapper.addEventListener('mouseleave', startAutoplay);
  }

  startAutoplay();
}

// ================= 4. FAQ ACCORDION =================
function initFaqAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (!accordionItems.length) return;

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        accordionItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });

        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

// ================= 5. ANIMATED STATS COUNTERS =================
function initStatsCounter() {
  const statElements = document.querySelectorAll('.stat-number');
  if (!statElements.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statElements.forEach(el => {
          const target = parseFloat(el.getAttribute('data-target') || '0');
          const suffix = el.getAttribute('data-suffix') || '';
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const duration = 1600;
          const steps = 30;
          const increment = target / steps;
          const stepTime = duration / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// Curriculum to Subject & Grade Directory Datasets
const curriculumSubjectsMap = {
  "Cambridge O-Level": [
    "Urdu - First Language (3247)",
    "Urdu - Second Language (3248)",
    "Mathematics - Syllabus D (4024)",
    "Additional Mathematics (4037)",
    "Physics (5054)",
    "Chemistry (5070)",
    "Biology (5090)",
    "Computer Science (2210)",
    "English Language (1123)",
    "Economics (2281)",
    "Business Studies (7115)",
    "Principles of Accounts (7707)",
    "Islamiyat (2058)",
    "Pakistan Studies (2059)",
    "Environmental Management (5014)",
    "Multiple O-Level Subjects (Full Package)"
  ],
  "Cambridge IGCSE": [
    "IGCSE Urdu as First Language (0539)",
    "IGCSE English - First Language (0500)",
    "IGCSE English - Second Language (0510)",
    "IGCSE Mathematics (0580)",
    "IGCSE Additional Mathematics (0606)",
    "IGCSE Physics (0625)",
    "IGCSE Chemistry (0620)",
    "IGCSE Biology (0610)",
    "IGCSE Computer Science (0478)",
    "IGCSE Economics (0455)",
    "IGCSE Business Studies (0450)",
    "IGCSE Accounting (0452)",
    "IGCSE Islamiyat (0493)",
    "IGCSE Pakistan Studies (0448)",
    "Multiple IGCSE Subjects (Full Package)"
  ],
  "Cambridge A-Level": [
    "Mathematics - Pure & Mechanics (9709)",
    "Further Mathematics (9231)",
    "Physics (9702)",
    "Chemistry (9701)",
    "Biology (9700)",
    "Computer Science (9618)",
    "Economics (9708)",
    "Business (9609)",
    "Accounting (9706)",
    "English General Paper (8021)",
    "Urdu (9686 / 9676)",
    "Law (9084)",
    "Psychology (9990)",
    "Sociology (9699)",
    "Multiple A-Level Subjects (Full Package)"
  ],
  "Pearson Edexcel": [
    "Edexcel Pure Mathematics (P1–P4)",
    "Edexcel Mechanics & Statistics",
    "Edexcel IGCSE / IAL Sciences",
    "Edexcel IGCSE / IAL Economics & Business",
    "Multiple Edexcel Subjects (Full Package)"
  ],
  "IT & Professional Certifications": [
    "Digital Marketing & Performance Strategy",
    "CSIS Certification (Information Security & Cyber Systems)",
    "Full-Stack Web Development & Modern JavaScript",
    "Python for Data Analytics & Artificial Intelligence",
    "All IT & Professional Certifications (Full Track)"
  ]
};

const curriculumGradesMap = {
  "Cambridge O-Level": [
    "O-1 / Grade 9",
    "O-2 / Grade 10",
    "O-3 / Grade 11"
  ],
  "Cambridge IGCSE": [
    "IGCSE-1 / Grade 9",
    "IGCSE-2 / Grade 10",
    "IGCSE-3 / Grade 11"
  ],
  "Cambridge A-Level": [
    "AS-Level (Year 12)",
    "A2-Level (Year 13)",
    "Composite AS & A2"
  ],
  "Pearson Edexcel": [
    "Edexcel IGCSE (Grade 9–11)",
    "International AS-Level",
    "International A2-Level"
  ],
  "IT & Professional Certifications": [
    "Professional Certification Track",
    "Beginner to Advanced",
    "Accelerated Career Bootcamp"
  ]
};

// ================= 6. DEMO BOOKING FORM VALIDATION & CURRICULUM SYNC =================
function initDemoForms() {
  const forms = document.querySelectorAll('.demo-booking-form');
  if (!forms.length) return;

  forms.forEach(form => {
    const programSelect = form.querySelector('select[name="program"]');
    const subjectSelect = form.querySelector('select[name="subject"]');
    const gradeSelect = form.querySelector('select[name="grade"]');

    function syncCurriculumOptions() {
      if (!programSelect || !subjectSelect || subjectSelect.tagName !== 'SELECT') return;
      const rawVal = (programSelect.value || '').toLowerCase();

      let key = "Cambridge O-Level";
      if (rawVal.includes('it') || rawVal.includes('cert') || rawVal.includes('market') || rawVal.includes('csis')) {
        key = "IT & Professional Certifications";
      } else if (rawVal.includes('igcse')) {
        key = "Cambridge IGCSE";
      } else if (rawVal.includes('a-level') || rawVal.includes('alevel')) {
        key = "Cambridge A-Level";
      } else if (rawVal.includes('edexcel')) {
        key = "Pearson Edexcel";
      }

      // Populate ONLY the subjects that belong to this curriculum
      const subjects = curriculumSubjectsMap[key] || curriculumSubjectsMap["Cambridge O-Level"];
      const currentSubjectVal = subjectSelect.value;

      subjectSelect.innerHTML = `
        <option value="" disabled selected>Select Subject for ${key}</option>
        ${subjects.map(s => `<option value="${s}">${s}</option>`).join('')}
      `;

      if (currentSubjectVal && subjects.includes(currentSubjectVal)) {
        subjectSelect.value = currentSubjectVal;
      }

      // Populate ONLY the grades that belong to this curriculum
      if (gradeSelect) {
        const grades = curriculumGradesMap[key] || curriculumGradesMap["Cambridge O-Level"];
        const currentGradeVal = gradeSelect.value;
        gradeSelect.innerHTML = grades.map(g => `<option value="${g}">${g}</option>`).join('');
        if (currentGradeVal && grades.includes(currentGradeVal)) {
          gradeSelect.value = currentGradeVal;
        }
      }
    }

    if (programSelect && subjectSelect) {
      programSelect.addEventListener('change', syncCurriculumOptions);
      syncCurriculumOptions(); // Initial sync on page load
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';

      const studentName = form.querySelector('[name="student_name"]')?.value.trim();
      const parentName = form.querySelector('[name="parent_name"]')?.value.trim() || 'N/A';
      const rawPhone = form.querySelector('[name="whatsapp_phone"]')?.value.trim() || form.querySelector('[name="whatsapp"]')?.value.trim() || '';
      const countryCode = form.querySelector('[name="country_code"]')?.value || '+92';
      let whatsapp = rawPhone;
      if (countryCode && !rawPhone.startsWith('+')) {
        whatsapp = (countryCode === '+' ? '+' : countryCode + ' ') + rawPhone;
      }
      const email = form.querySelector('[name="email"]')?.value.trim() || 'N/A';
      const program = form.querySelector('[name="program"]')?.value || 'Cambridge Academic';
      const grade = form.querySelector('[name="grade"]')?.value || 'N/A';
      const subject = form.querySelector('#selectedSubjectInput')?.value || form.querySelector('[name="subject"]')?.value || 'General Consultation';
      const teacher = form.querySelector('#selectedTeacherInput')?.value || form.querySelector('[name="teacher"]')?.value || 'Assigned Faculty Specialist';
      const examSeries = form.querySelector('[name="exam_series"]')?.value || 'N/A';
      const message = form.querySelector('[name="message"]')?.value.trim() || 'None';

      if (!studentName || !rawPhone) {
        showToast("Please fill in required fields (Student Name & WhatsApp Number).", "error");
        return;
      }

      // Determine Page & Form Type
      const isContactPage = window.location.pathname.includes('contact') || form.closest('#contact') !== null;
      const formType = isContactPage ? "Contact / Admissions Inquiry" : "Free Trial Demo Booking";
      const pageSource = document.title ? document.title.split('|')[0].trim() : "The Readly Institute";

      // 1. Loading State on Submit Button
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="inline-flex items-center gap-2">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Recording & Opening WhatsApp...
          </span>
        `;
      }

      // 2. Google Sheets Background Logging
      const payload = {
        form_type: formType,
        student_name: studentName,
        parent_name: parentName,
        whatsapp: whatsapp,
        email: email,
        program: program,
        grade: grade,
        subject: subject,
        teacher: teacher,
        exam_series: examSeries,
        message: message,
        page: pageSource
      };

      const sheetUrl = (window.READLY_CONFIG && window.READLY_CONFIG.googleSheetWebAppUrl) || "";
      if (sheetUrl && sheetUrl.startsWith('http')) {
        try {
          fetch(sheetUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          }).catch(sheetErr => {
            console.warn('Google Sheet background logging notice:', sheetErr);
          });
        } catch (err) {
          console.warn('Google Sheet logging error:', err);
        }
      } else {
        console.info('Google Sheet URL not set yet. Submissions are saved when you add your Web App URL to READLY_CONFIG.');
      }

      // 3. Format WhatsApp Dispatch (Polite, Professional Student Inquiry)
      let waLines = [];
      if (isContactPage) {
        waLines = [
          "Hello Team Readly,",
          "",
          "I am interested in admission and courses at The Readly Institute. Here are my inquiry details:",
          "",
          `• Full Name: ${studentName}`,
          (parentName && parentName !== 'N/A') ? `• Parent / Guardian: ${parentName}` : null,
          `• WhatsApp: ${whatsapp}`,
          (email && email !== 'N/A') ? `• Email: ${email}` : null,
          `• Program of Interest: ${program}`,
          `• Primary Subject: ${subject}`,
          (message && message !== 'None') ? `• Message: ${message}` : null,
          "",
          "Please connect with me with further details. Thank you!"
        ].filter(Boolean);
      } else {
        waLines = [
          "Hello Team Readly,",
          "",
          "I am interested in admission at The Readly Institute and would like to book a Free Trial Demo Class.",
          "",
          "Here are my details:",
          `• Student Name: ${studentName}`,
          (parentName && parentName !== 'N/A') ? `• Parent Name: ${parentName}` : null,
          `• WhatsApp: ${whatsapp}`,
          (email && email !== 'N/A') ? `• Email: ${email}` : null,
          `• Program: ${program}`,
          (grade && grade !== 'N/A') ? `• Grade / Level: ${grade}` : null,
          `• Subject for Demo: ${subject}`,
          (teacher && teacher !== 'Assigned Faculty Specialist') ? `• Preferred Mentor: ${teacher}` : null,
          (examSeries && examSeries !== 'N/A') ? `• Target Exam Series: ${examSeries}` : null,
          (message && message !== 'None') ? `• Notes / Target Topics: ${message}` : null,
          "",
          "Looking forward to hearing from you. Thank you!"
        ].filter(Boolean);
      }

      const waText = encodeURIComponent(waLines.join('\n'));
      const waNumber = (window.READLY_CONFIG && window.READLY_CONFIG.whatsappNumber) || "923337221552";
      const waUrl = `https://wa.me/${waNumber}?text=${waText}`;

      // 4. Toast notification
      showToast(`Inquiry received for ${studentName}! Opening WhatsApp to connect with admissions desk...`, "success");

      // 5. Close Modal & Reset Form
      window.closeBookingModal();
      form.reset();

      // 6. Reset button & Open WhatsApp
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
        if (window.READLY_CONFIG && window.READLY_CONFIG.enableWhatsAppRedirect !== false) {
          window.open(waUrl, '_blank');
        }
      }, 600);
    });
  });
}

// ================= 7. SUBJECT FILTERING & ATTRACTIVE BOX LAYOUT =================
function initSubjectFiltering() {
  const subjectsGrid = document.getElementById('subjectsGrid');
  const subjectsData = window.subjectsData || window.readlySubjects;
  if (!subjectsGrid || !subjectsData) return;

  const isCatalogPage = document.getElementById('isFullCatalog') !== null || window.location.pathname.includes('subjects.html');
  const boardTabs = document.querySelectorAll('.subject-board-tab, .filter-board-btn');
  const categoryPills = document.querySelectorAll('.subject-category-pill');
  const searchInput = document.getElementById('subjectSearchInput');
  const subjectCountBadge = document.getElementById('subjectCountBadge');
  const emptyState = document.getElementById('emptyState');

  let activeBoard = 'all';
  let activeCategory = 'all';
  let searchQuery = '';

  function renderSubjects() {
    const filtered = subjectsData.filter(subject => {
      const matchesBoard = activeBoard === 'all' || 
        subject.boardCategory === activeBoard || 
        (activeBoard === 'it-certifications' && (subject.boardCategory === 'it-certifications' || subject.category === 'it-professional')) ||
        (subject.boards && subject.boards.some(b => b.toLowerCase().replace(/[-\s]/g, '').includes(activeBoard.replace(/[-\s]/g, ''))));

      const matchesCategory = activeCategory === 'all' || subject.category === activeCategory ||
        (activeCategory === 'maths-cs' && (subject.category === 'maths' || subject.category === 'technology')) ||
        (activeCategory === 'it-professional' && (subject.category === 'it-professional' || subject.category === 'technology'));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        subject.title.toLowerCase().includes(q) || 
        (subject.description && subject.description.toLowerCase().includes(q)) ||
        (subject.codes && subject.codes.some(c => c.toLowerCase().includes(q)));

      return matchesBoard && matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      subjectsGrid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      if (subjectCountBadge) subjectCountBadge.textContent = '0 Subjects Found';
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    let displayList = filtered;

    if (!isCatalogPage) {
      // ON HOME PAGE: Limit to 3 attractive cards per active category/board to maintain spaciousness
      displayList = filtered.slice(0, 3);
      if (subjectCountBadge) {
        subjectCountBadge.textContent = `Showing 3 of ${filtered.length} Subjects`;
      }
    } else {
      // ON FULL DIRECTORY PAGE: Show all matching subjects
      if (subjectCountBadge) {
        subjectCountBadge.textContent = `${filtered.length} Subjects Available`;
      }
    }

    subjectsGrid.innerHTML = displayList.map(item => createSubjectCardHtml(item)).join('');

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  function createSubjectCardHtml(item) {
    let iconName = item.icon || 'book-open';
    if (item.category === 'sciences') iconName = 'atom';
    if (item.title.toLowerCase().includes('chemistry')) iconName = 'flask-conical';
    if (item.title.toLowerCase().includes('biology')) iconName = 'dna';
    if (item.category === 'maths' || item.category === 'maths-cs') iconName = 'calculator';
    if (item.title.toLowerCase().includes('computer')) iconName = 'code-2';
    if (item.category === 'commerce') iconName = 'trending-up';
    if (item.category === 'humanities') iconName = 'landmark';
    if (item.category === 'languages') iconName = 'languages';

    const badgesHtml = (item.boards || []).map(b => {
      let badgeClass = 'badge-tag-alevel';
      if (b.includes('O-Level') || b.includes('O Level') || b.includes('IGCSE')) badgeClass = 'badge-tag-olevel';
      if (b.includes('Edexcel')) badgeClass = 'badge-tag-edexcel';
      return `<span class="px-2 py-0.5 rounded text-[10px] font-bold ${badgeClass}">${b}</span>`;
    }).join(' ');

    const featuresList = ((item.features || item.topics) && (item.features || item.topics).length > 0) 
      ? (item.features || item.topics).slice(0, 2) 
      : ["15-Year Topical Past Papers", "Examiner Keyword Rubrics"];

    return `
      <div class="subject-premium-box bg-white">
        <div>
          <!-- Top Row: Icon + Badges -->
          <div class="flex items-start justify-between gap-3 mb-4">
            <div class="subject-icon-box shrink-0">
              <i data-lucide="${iconName}" class="w-5 h-5"></i>
            </div>
            <div class="flex flex-wrap gap-1 justify-end">
              ${badgesHtml}
            </div>
          </div>

          <!-- Title & Code Number -->
          <div class="mb-2.5">
            <h3 class="text-xl font-bold text-[#0B1F3A] font-heading tracking-tight">
              ${item.title}
            </h3>
            <span class="text-[11px] font-mono text-slate-500 font-medium">
              ${item.codes && item.codes[0] ? item.codes[0] : ''}
            </span>
          </div>

          <!-- Concept Focus Description -->
          <p class="text-xs text-slate-600 leading-relaxed mb-4">
            ${item.description || ''}
          </p>

          <!-- Key Highlights -->
          <div class="space-y-1.5 pt-3 border-t border-slate-100 mb-5">
            ${featuresList.map(f => `
              <div class="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <i data-lucide="check" class="w-3.5 h-3.5 text-[#059669] shrink-0"></i>
                <span>${f}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Bottom Action Strip -->
        <div class="pt-3 border-t border-slate-100 mt-auto">
          <div class="flex items-center justify-between text-[11px] text-slate-500 mb-3 font-medium">
            <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3 text-slate-400"></i> ${item.duration || '6 - 9 Months'}</span>
            <span class="flex items-center gap-1 text-[#059669] font-semibold"><i data-lucide="award" class="w-3 h-3 text-[#059669]"></i> ${item.tutors || 'Certified Faculty'}</span>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <button onclick="openSyllabusModal('${item.id}')" class="btn-secondary-academic py-2 text-xs">
              <span>Details</span>
              <i data-lucide="file-text" class="w-3.5 h-3.5 text-slate-400"></i>
            </button>
            <button onclick="openBookingModal('${item.title}')" class="btn-teal-academic py-2 text-xs">
              <span>Free Trial</span>
              <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Board Tabs (Clean, non-black active transition)
  boardTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      boardTabs.forEach(t => {
        t.classList.remove('active');
        if (t.classList.contains('filter-board-btn')) {
          t.classList.remove('bg-[#059669]', 'text-white');
          t.classList.add('bg-white', 'text-slate-600');
        }
      });
      tab.classList.add('active');
      if (tab.classList.contains('filter-board-btn')) {
        tab.classList.add('bg-[#059669]', 'text-white');
        tab.classList.remove('bg-white', 'text-slate-600');
      }
      activeBoard = tab.getAttribute('data-board') || 'all';
      renderSubjects();
    });
  });

  // Category Filter Pills
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-category') || 'all';
      renderSubjects();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderSubjects();
    });
  }

  renderSubjects();
}

// ================= 8. TEACHERS SECTION & SELECTION =================
let selectedTutorId = null;
let activeTutorCategory = 'all';

function initTeachersSection() {
  const tutorsGrid = document.getElementById('tutorsGrid');
  if (!tutorsGrid) return;

  function renderTutors() {
    const filtered = tutorsData.filter(tutor => {
      return activeTutorCategory === 'all' || tutor.category === activeTutorCategory;
    });

    tutorsGrid.innerHTML = filtered.map(tutor => {
      const isSelected = selectedTutorId === tutor.id;
      const selectedClass = isSelected ? 'academic-card-active' : '';

      return `
        <div id="tutorCard-${tutor.id}" class="academic-card academic-card-hover p-6 flex flex-col justify-between relative bg-white ${selectedClass}">
          <div>
            <!-- Header with Mentor Photo, Name & Level -->
            <div class="flex items-start gap-3.5 mb-4">
              <div class="w-14 h-14 rounded-xl overflow-hidden shadow-md border-2 border-slate-200 shrink-0 bg-[#ECFDF5]">
                <img src="${tutor.image}" alt="${tutor.name}" class="w-full h-full object-cover object-top" onerror="this.onerror=null; this.src='images/teachers/sohail-anjum.jpg';">
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between gap-1">
                  <h3 class="text-base font-bold text-slate-900 font-heading truncate">${tutor.name}</h3>
                  <span class="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                    ${tutor.level}
                  </span>
                </div>
                <p class="text-xs font-bold text-[#059669] truncate">${tutor.role}</p>
                <span class="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded inline-block mt-1">${tutor.experience}</span>
              </div>
            </div>

            <!-- Qualification & Credentials -->
            <p class="text-[11px] font-medium text-slate-500 mb-2.5">
              ${tutor.qualifications}
            </p>

            <!-- Short Bio -->
            <p class="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
              ${tutor.bio}
            </p>

            <!-- Subjects Tags -->
            <div class="flex flex-wrap gap-1 mb-4">
              ${(tutor.subjects || []).slice(0, 3).map(s => `<span class="px-2 py-0.5 rounded text-[10px] bg-slate-50 border border-slate-200 text-slate-700">${s}</span>`).join('')}
            </div>
          </div>

          <!-- Select Action -->
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button onclick="openTeacherModal('${tutor.id}')" class="btn-secondary-academic py-1.5 px-3 text-xs font-semibold">
              <i data-lucide="user" class="w-3.5 h-3.5"></i>
              <span>Profile</span>
            </button>
            <button onclick="selectTeacher('${tutor.id}', '${tutor.name.replace(/'/g, "\\'")}', '${(tutor.subjects && tutor.subjects[0] ? tutor.subjects[0] : 'Academic Mentorship').replace(/'/g, "\\'")}')" class="btn-teal-academic py-1.5 px-3 text-xs font-bold">
              <span>${isSelected ? 'Selected' : 'Select Mentor'}</span>
              <i data-lucide="${isSelected ? 'check' : 'arrow-right'}" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Teacher Filter Pills Click Listener
  const tutorPills = document.querySelectorAll('.tutor-pill');
  tutorPills.forEach(pill => {
    pill.addEventListener('click', () => {
      tutorPills.forEach(p => {
        p.classList.remove('active', 'bg-[#ECFDF5]', 'text-[#059669]', 'border-[#A7F3D0]');
        p.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
      });
      pill.classList.add('active', 'bg-[#ECFDF5]', 'text-[#059669]', 'border-[#A7F3D0]');
      pill.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');

      activeTutorCategory = pill.getAttribute('data-tutor-category') || 'all';
      renderTutors();
    });
  });

  renderTutors();
}

// Global Teacher Selector Function (Pre-fills booking dialog box)
window.selectTeacher = function(tutorId, tutorName, primarySubject) {
  selectedTutorId = tutorId;
  initTeachersSection();

  const modal = document.getElementById('bookingModal');
  const teacherInput = document.getElementById('selectedTeacherInput');
  const subjectInput = document.getElementById('selectedSubjectInput');
  const modalSubjectBadge = document.getElementById('modalSubjectBadge');

  if (teacherInput) teacherInput.value = tutorName;
  if (subjectInput) subjectInput.value = primarySubject || 'Academic Mentorship';
  if (modalSubjectBadge) {
    modalSubjectBadge.textContent = `Preferred Mentor: ${tutorName} • ${primarySubject}`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  showToast(`Mentor selected: ${tutorName}. Complete your free trial booking.`, "info");
};

// ================= 9. SUBJECT SYLLABUS DIALOG BOX (MODAL) =================
window.openSyllabusModal = function(subjectId) {
  const subjects = window.subjectsData || window.readlySubjects;
  if (!subjects) return;

  const item = subjects.find(s => s.id === subjectId);
  if (!item) return;

  const modal = document.getElementById('syllabusModal');
  const container = document.getElementById('syllabusModalContent');
  if (!container || !modal) return;

  container.innerHTML = `
    <div class="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-slate-200">
      <div>
        <span class="text-[11px] font-bold text-[#059669] uppercase tracking-wider block mb-1">
          ${item.boards ? item.boards.join(' • ') : 'Cambridge & Edexcel'}
        </span>
        <h3 class="text-2xl font-bold text-slate-900 font-heading">${item.title}</h3>
        <p class="text-xs font-mono text-slate-500 mt-0.5">${item.codes ? item.codes.join(' | ') : ''}</p>
      </div>
      <button onclick="closeSyllabusModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors" aria-label="Close">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    </div>

    <div class="space-y-4 text-slate-600 text-xs">
      <div>
        <h4 class="text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-1">Curriculum Focus</h4>
        <p class="leading-relaxed text-slate-700">${item.description || 'Comprehensive Cambridge exam-focused preparation.'}</p>
      </div>

      <div>
        <h4 class="text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-2">Preparation Coverage</h4>
        <div class="space-y-2">
          ${((item.features || item.topics) || []).map(f => `
            <div class="flex items-center gap-2 text-slate-700">
              <i data-lucide="check" class="w-4 h-4 text-[#059669] shrink-0"></i>
              <span>${f}</span>
            </div>
          `).join('')}
          <div class="flex items-center gap-2 text-slate-700">
            <i data-lucide="check" class="w-4 h-4 text-[#059669] shrink-0"></i>
            <span>Weekly Examiner Keyword Rubric Feedback</span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 border border-slate-200">
        <div>
          <span class="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Duration</span>
          <span class="font-bold text-slate-900 text-xs">${item.duration || '6 - 9 Months'}</span>
        </div>
        <div>
          <span class="text-[10px] text-slate-500 uppercase font-bold tracking-wider block">Instruction Lead</span>
          <span class="font-bold text-[#059669] text-xs">${item.tutors || 'Certified Faculty Mentor'}</span>
        </div>
      </div>

      <div class="pt-2">
        <button onclick="closeSyllabusModal(); openBookingModal('${item.title}');" class="w-full btn btn-teal py-3 text-xs font-bold">
          Book a Free Trial Class for ${item.title}
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';

  if (window.lucide) {
    lucide.createIcons();
  }
};

window.closeSyllabusModal = function() {
  const modal = document.getElementById('syllabusModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
};

// ================= 10. TEACHER PROFILE DIALOG BOX (MODAL) =================
window.openTeacherModal = function(tutorId) {
  const tutor = tutorsData.find(t => t.id === tutorId);
  if (!tutor) return;

  const modal = document.getElementById('teacherModal');
  const container = document.getElementById('teacherModalContent');
  if (!container || !modal) return;

  container.innerHTML = `
    <div class="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-slate-200">
      <div class="flex items-center gap-4">
        <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-md border border-slate-200 shrink-0 bg-slate-50">
          <img src="${tutor.image}" alt="${tutor.name}" class="w-full h-full object-cover object-top" onerror="this.onerror=null; this.src='images/teachers/sohail-anjum.jpg';">
        </div>
        <div>
          <h3 class="text-xl sm:text-2xl font-bold text-slate-900 font-heading leading-tight">${tutor.name}</h3>
          <p class="text-xs sm:text-sm font-bold text-[#059669] mt-0.5">${tutor.role}</p>
          <div class="flex flex-wrap items-center gap-2 mt-2">
            <span class="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">${tutor.experience}</span>
            <span class="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">${tutor.level}</span>
          </div>
        </div>
      </div>
      <button onclick="closeTeacherModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors shrink-0" aria-label="Close">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    </div>

    <div class="space-y-4 text-xs text-slate-600">
      <div>
        <h4 class="text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-1">Academic Credentials & Qualifications</h4>
        <p class="font-semibold text-slate-800 text-sm bg-slate-50 p-2.5 rounded-lg border border-slate-200">${tutor.qualifications}</p>
      </div>

      <div>
        <h4 class="text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-1">Teaching Pedagogy & Background</h4>
        <p class="leading-relaxed text-slate-700 text-xs">${tutor.bio}</p>
      </div>

      <div>
        <h4 class="text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-1">Track Record & Distinctions</h4>
        <div class="p-3 rounded-lg bg-[#ECFDF5] border border-[#A7F3D0] text-[#064E3B] font-medium">
          ${tutor.achievements || 'Consistent history of Cambridge A* grades and national distinctions.'}
        </div>
      </div>

      <div>
        <h4 class="text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-2">Subjects Mentored</h4>
        <div class="flex flex-wrap gap-1.5">
          ${tutor.subjects.map(s => `<span class="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">${s}</span>`).join('')}
        </div>
      </div>

      <div class="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
        <button onclick="closeTeacherModal(); selectTeacher('${tutor.id}', '${tutor.name.replace(/'/g, "\\'")}', '${(tutor.subjects && tutor.subjects[0] ? tutor.subjects[0] : 'Academic Mentorship').replace(/'/g, "\\'")}');" class="flex-1 btn btn-teal py-3 text-xs font-bold">
          <span>Book Free Trial with ${tutor.name}</span>
          <i data-lucide="calendar" class="w-3.5 h-3.5"></i>
        </button>
        <a href="https://wa.me/923337221552?text=Hi%20The%20Readly%20Institute,%20I%20want%20to%20learn%20from%20${encodeURIComponent(tutor.name)}" target="_blank" class="btn btn-whatsapp text-xs py-2.5 px-4">
          <span>WhatsApp Advisor</span>
        </a>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';

  if (window.lucide) {
    lucide.createIcons();
  }
};

window.closeTeacherModal = function() {
  const modal = document.getElementById('teacherModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
};

// ================= 11. GENERAL TRIAL BOOKING DIALOG BOX (MODAL) =================
window.openBookingModal = function(subjectTitle = '', teacherName = '') {
  const modal = document.getElementById('bookingModal');
  const subjectInput = document.getElementById('selectedSubjectInput');
  const teacherInput = document.getElementById('selectedTeacherInput');
  const modalSubjectBadge = document.getElementById('modalSubjectBadge');

  if (subjectInput && subjectTitle) {
    subjectInput.value = subjectTitle;
  }
  if (teacherInput && teacherName) {
    teacherInput.value = teacherName;
  }
  if (modalSubjectBadge) {
    if (teacherName) {
      modalSubjectBadge.textContent = `Preferred Mentor: ${teacherName} • ${subjectTitle || 'Academic Consultation'}`;
    } else {
      modalSubjectBadge.textContent = subjectTitle ? `Subject: ${subjectTitle}` : 'Academic Consultation';
    }
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
};

window.closeBookingModal = function() {
  const modal = document.getElementById('bookingModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
};

window.openDemoModal = function(subjectTitle = '') {
  window.openBookingModal(subjectTitle);
};

window.closeDemoModal = function() {
  window.closeBookingModal();
};

// Close modals when clicking backdrop or pressing Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeSyllabusModal();
    window.closeTeacherModal();
    window.closeBookingModal();
  }
});

['syllabusModal', 'teacherModal', 'bookingModal'].forEach(modalId => {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        window.closeSyllabusModal();
        window.closeTeacherModal();
        window.closeBookingModal();
      }
    });
  }
});

// ================= GLOBAL TOAST NOTIFICATION =================
function showToast(message, type = "info") {
  let toast = document.getElementById('siteToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'siteToast';
    toast.className = 'fixed bottom-6 left-6 z-50 transform transition-all duration-300 max-w-md p-4 rounded-lg shadow-xl text-xs font-medium flex items-center gap-3 bg-white border border-slate-200 text-slate-800 translate-y-24 opacity-0';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <div class="w-6 h-6 rounded-full ${type === 'error' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'} flex items-center justify-center shrink-0">
      <i data-lucide="${type === 'error' ? 'alert-circle' : 'check'}" class="w-4 h-4"></i>
    </div>
    <div class="flex-1">${message}</div>
  `;

  if (window.lucide) {
    lucide.createIcons();
  }

  toast.classList.remove('translate-y-24', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  setTimeout(() => {
    toast.classList.add('translate-y-24', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 4500);
}
