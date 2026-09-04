// ==========================================================================
// THE READLY INSTITUTE - CLIENT APPLICATION LOGIC
// Academic Platform Interactions, Dynamic Data Rendering & Modal Handlers
// ==========================================================================

// Verified Faculty Dataset
const tutorsData = [
  {
    id: "tutor-bilal-physics",
    name: "Ahmed Bilal",
    role: "Physics Lead Specialist",
    qualifications: "M.Sc. Applied Physics • Cambridge Distinction Mentor",
    level: "O Level • A Level",
    category: "sciences",
    experience: "12 Years Experience",
    bio: "Focuses on fundamental conceptual derivations and Paper 4/5 experimental physics analysis.",
    subjects: ["A Level Physics (9702)", "O Level Physics (5054)", "Edexcel IAL Physics"]
  },
  {
    id: "tutor-farhan-maths",
    name: "Farhan Siddiqui",
    role: "Pure Mathematics & Mechanics Specialist",
    qualifications: "B.Sc. Mathematics • Ex-Lecturer",
    level: "O Level • A Level",
    category: "maths",
    experience: "14 Years Experience",
    bio: "Specializes in calculus concepts, mechanics vectors, and official Cambridge marking precision.",
    subjects: ["A Level Maths (9709)", "Additional Maths (4037)", "Edexcel Pure P1-P4"]
  },
  {
    id: "tutor-ayesha-chem",
    name: "Dr. Ayesha Malik",
    role: "Chemistry & Life Sciences Mentor",
    qualifications: "Ph.D. Biochemistry • Medical School Entrance Coach",
    level: "O Level • A Level",
    category: "sciences",
    experience: "10 Years Experience",
    bio: "Deconstructs organic reaction mechanisms, stoichiometry formulas, and ATP laboratory worksheets.",
    subjects: ["A Level Chemistry (9701)", "A Level Biology (9700)", "O Level Science"]
  },
  {
    id: "tutor-mahnoor-econ",
    name: "Mahnoor Tariq",
    role: "Economics & Business Studies Examiner",
    qualifications: "B.Sc. Economics (LSE) • Certified Examiner",
    level: "O Level • A Level",
    category: "commerce",
    experience: "9 Years Experience",
    bio: "Teaches structured 20-mark evaluation essay frameworks and macroeconomic policy diagramming.",
    subjects: ["A Level Economics (9708)", "O Level Economics (2281)", "Business Studies"]
  },
  {
    id: "tutor-daniyal-cs",
    name: "Daniyal Qureshi",
    role: "Computer Science & Python Specialist",
    qualifications: "M.S. Software Engineering • Senior Engineer",
    level: "O Level • A Level",
    category: "maths",
    experience: "8 Years Experience",
    bio: "Hands-on live screen coding instruction for Paper 4 Python programming and algorithm design.",
    subjects: ["A Level Computer Science (9618)", "O Level CS (2210)", "ICT (0417)"]
  },
  {
    id: "tutor-zainab-english",
    name: "Zainab Fatima",
    role: "English Language & Literature Faculty",
    qualifications: "M.A. English Literature • Cambridge Certified",
    level: "O Level • A Level",
    category: "humanities",
    experience: "11 Years Experience",
    bio: "Provides systematic 10-point summary formulas, critical commentary techniques, and essay evaluation.",
    subjects: ["English Language (1123/0500)", "English Literature (9695)", "World Literature"]
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const isCatalogPage = document.getElementById('isCatalogPage') !== null;
  const subjectsGrid = document.getElementById('subjectsGrid');
  const subjectCountBadge = document.getElementById('subjectCountBadge');
  const emptyState = document.getElementById('emptyState');
  const searchInput = document.getElementById('subjectSearchInput');
  const boardTabs = document.querySelectorAll('.subject-board-tab');
  const categoryPills = document.querySelectorAll('.subject-category-pill');

  // Teachers DOM
  const tutorsGrid = document.getElementById('tutorsGrid');
  const tutorPills = document.querySelectorAll('.tutor-pill');

  let activeBoard = 'all';
  let activeCategory = 'all';
  let activeTutorCategory = 'all';
  let searchQuery = '';
  let selectedTutorId = null;

  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // ================= RENDER SUBJECTS (ATTRACTIVE BOX LAYOUT) =================
  function renderSubjects() {
    if (!subjectsGrid || !window.subjectsData) return;

    const filtered = window.subjectsData.filter(subject => {
      const matchesBoard = activeBoard === 'all' || 
        subject.boardCategory === activeBoard || 
        subject.boards.some(b => b.toLowerCase().includes(activeBoard));

      const matchesCategory = activeCategory === 'all' || subject.category === activeCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        subject.title.toLowerCase().includes(q) || 
        subject.description.toLowerCase().includes(q) ||
        subject.codes.some(c => c.toLowerCase().includes(q));

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
    // Determine icon for the subject
    let iconName = item.icon || 'book-open';
    if (item.category === 'sciences') iconName = 'atom';
    if (item.title.toLowerCase().includes('chemistry')) iconName = 'flask-conical';
    if (item.title.toLowerCase().includes('biology')) iconName = 'dna';
    if (item.category === 'maths-cs') iconName = 'calculator';
    if (item.title.toLowerCase().includes('computer')) iconName = 'code-2';
    if (item.category === 'commerce') iconName = 'trending-up';
    if (item.category === 'humanities') iconName = 'landmark';
    if (item.category === 'languages') iconName = 'languages';

    // Format board badges
    const badgesHtml = item.boards.map(b => {
      let badgeClass = 'badge-tag-alevel';
      if (b.includes('O Level') || b.includes('IGCSE')) badgeClass = 'badge-tag-olevel';
      if (b.includes('Edexcel')) badgeClass = 'badge-tag-edexcel';
      return `<span class="px-2 py-0.5 rounded text-[10px] font-bold ${badgeClass}">${b}</span>`;
    }).join(' ');

    // Features list
    const featuresList = (item.features && item.features.length > 0) 
      ? item.features.slice(0, 2) 
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
            ${item.description}
          </p>

          <!-- Key Highlights -->
          <div class="space-y-1.5 pt-3 border-t border-slate-100 mb-5">
            ${featuresList.map(f => `
              <div class="flex items-center gap-2 text-xs text-slate-700 font-medium">
                <i data-lucide="check" class="w-3.5 h-3.5 text-blue-600 shrink-0"></i>
                <span>${f}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Bottom Action Strip -->
        <div class="pt-3 border-t border-slate-100 mt-auto">
          <div class="flex items-center justify-between text-[11px] text-slate-500 mb-3 font-medium">
            <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3 text-slate-400"></i> ${item.duration || '6 - 9 Months'}</span>
            <span class="flex items-center gap-1 text-blue-700 font-semibold"><i data-lucide="award" class="w-3 h-3 text-blue-600"></i> ${item.tutors || 'Certified Faculty'}</span>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <button onclick="openSyllabusModal('${item.id}')" class="btn-secondary-academic py-2 text-xs">
              <span>Details</span>
              <i data-lucide="file-text" class="w-3 h-3 text-slate-400"></i>
            </button>
            <button onclick="openBookingModal('${item.title}')" class="btn-primary-academic py-2 text-xs">
              <span>Free Trial</span>
              <i data-lucide="arrow-right" class="w-3 h-3"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ================= RENDER TEACHERS / FACULTY =================
  function renderTutors() {
    if (!tutorsGrid) return;

    const filtered = tutorsData.filter(tutor => {
      return activeTutorCategory === 'all' || tutor.category === activeTutorCategory;
    });

    tutorsGrid.innerHTML = filtered.map(tutor => {
      const isSelected = selectedTutorId === tutor.id;
      const selectedClass = isSelected ? 'academic-card-active' : '';

      return `
        <div id="tutorCard-${tutor.id}" class="academic-card academic-card-hover p-6 flex flex-col justify-between relative bg-white ${selectedClass}">
          <div>
            <!-- Header with Mentor Name & Level -->
            <div class="flex items-start justify-between gap-3 mb-3">
              <div>
                <h3 class="text-lg font-bold text-slate-900 font-heading">${tutor.name}</h3>
                <p class="text-xs font-semibold text-blue-700">${tutor.role}</p>
              </div>
              <span class="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                ${tutor.level}
              </span>
            </div>

            <!-- Qualification & Credentials -->
            <p class="text-[11px] font-medium text-slate-500 mb-3">
              ${tutor.qualifications}
            </p>

            <!-- Short Bio -->
            <p class="text-xs text-slate-600 leading-relaxed mb-4">
              ${tutor.bio}
            </p>
          </div>

          <!-- Select Action -->
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span class="text-[11px] font-semibold text-slate-500">${tutor.experience}</span>
            
            <button onclick="selectTeacher('${tutor.id}', '${tutor.name}', '${tutor.subjects[0]}')" class="text-xs font-bold ${isSelected ? 'text-blue-800' : 'text-blue-700 hover:text-blue-900'} flex items-center gap-1 transition-colors">
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

  // Teacher Filter Pills
  tutorPills.forEach(pill => {
    pill.addEventListener('click', () => {
      tutorPills.forEach(p => {
        p.classList.remove('active', 'bg-blue-50', 'text-blue-700', 'border-blue-200');
        p.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
      });
      pill.classList.add('active', 'bg-blue-50', 'text-blue-700', 'border-blue-200');
      pill.classList.remove('bg-white', 'text-slate-600', 'border-slate-200');

      activeTutorCategory = pill.getAttribute('data-tutor-category') || 'all';
      renderTutors();
    });
  });

  // Global Teacher Selector Function
  window.selectTeacher = function(tutorId, tutorName, primarySubject) {
    selectedTutorId = tutorId;
    renderTutors();

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

    showToast(`Mentor selected: ${tutorName}. Booking trial session.`);
  };

  // ================= CLEAN BOARD TABS HANDLER (NO BLACK BACKGROUND) =================
  boardTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      boardTabs.forEach(t => {
        t.classList.remove('active');
      });
      tab.classList.add('active');

      activeBoard = tab.getAttribute('data-board') || 'all';
      renderSubjects();
    });
  });

  // ================= CLEAN CATEGORY PILLS HANDLER =================
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => {
        p.classList.remove('active');
      });
      pill.classList.add('active');

      activeCategory = pill.getAttribute('data-category') || 'all';
      renderSubjects();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderSubjects();
    });
  }

  // Initial render
  renderSubjects();
  renderTutors();

  // ================= STUDY PLAN CALCULATOR =================
  const levelSelect = document.getElementById('calcLevel');
  const subjectCountSlider = document.getElementById('calcSubjects');
  const subjectCountDisplay = document.getElementById('calcSubjectsDisplay');
  const modeSelect = document.getElementById('calcMode');
  
  const resWeeklyHours = document.getElementById('resWeeklyHours');
  const resMockExams = document.getElementById('resMockExams');
  const resTopicalPapers = document.getElementById('resTopicalPapers');
  const resFeeEstimate = document.getElementById('resFeeEstimate');

  function calculateStudyPlan() {
    if (!levelSelect || !subjectCountSlider || !modeSelect) return;

    const level = levelSelect.value;
    const count = parseInt(subjectCountSlider.value, 10);
    const mode = modeSelect.value;

    if (subjectCountDisplay) {
      subjectCountDisplay.textContent = `${count} ${count === 1 ? 'Subject' : 'Subjects'}`;
    }

    let hoursPerSub = level === 'alevel' ? 4 : 3;
    let totalWeeklyHours = count * hoursPerSub;
    let totalMocks = count * 6;
    let topicalQuestions = count * 450;

    let baseRate = level === 'alevel' ? 45 : 35;
    if (level === 'edexcel') baseRate = 42;
    if (mode === '1on1') baseRate *= 2.2;

    let subTotal = Math.round(baseRate * count);
    if (count >= 3) {
      subTotal = Math.round(subTotal * 0.85); // 15% bundle discount
    }

    if (resWeeklyHours) resWeeklyHours.textContent = `${totalWeeklyHours} hrs / week`;
    if (resMockExams) resMockExams.textContent = `${totalMocks} Timed Mocks`;
    if (resTopicalPapers) resTopicalPapers.textContent = `${topicalQuestions.toLocaleString()}+ Topical Questions`;
    if (resFeeEstimate) resFeeEstimate.textContent = `$${subTotal} / mo`;
  }

  if (levelSelect && subjectCountSlider && modeSelect) {
    levelSelect.addEventListener('change', calculateStudyPlan);
    subjectCountSlider.addEventListener('input', calculateStudyPlan);
    modeSelect.addEventListener('change', calculateStudyPlan);
    calculateStudyPlan();
  }

  // ================= FAQ ACCORDION =================
  const faqItems = document.querySelectorAll('.faq-accordion');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (trigger && content) {
      trigger.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');
        faqItems.forEach(other => {
          const otherContent = other.querySelector('.faq-content');
          const otherIcon = other.querySelector('.faq-icon');
          if (otherContent) otherContent.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        });

        if (!isOpen) {
          content.classList.remove('hidden');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
      });
    }
  });

  // ================= BOOKING FORMS =================
  const demoForm = document.getElementById('demoBookingForm');
  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('studentName')?.value || 'Student';
      const subject = document.getElementById('selectedSubjectInput')?.value || 'General Preparation';
      const teacher = document.getElementById('selectedTeacherInput')?.value || 'Assigned Faculty Specialist';
      window.closeBookingModal();
      showToast(`Trial confirmed for ${name} with ${teacher} (${subject}). Our academic team will connect shortly via WhatsApp.`);
      demoForm.reset();
    });
  }
});

// Modal Handlers
window.openBookingModal = function(subjectTitle = '', teacherName = '') {
  const modal = document.getElementById('bookingModal');
  const subjectInput = document.getElementById('selectedSubjectInput');
  const teacherInput = document.getElementById('selectedTeacherInput');
  const modalSubjectBadge = document.getElementById('modalSubjectBadge');

  if (subjectInput) {
    subjectInput.value = subjectTitle || 'O / A Level & Edexcel Preparation';
  }
  if (teacherInput) {
    teacherInput.value = teacherName || 'Assigned Faculty Specialist';
  }
  if (modalSubjectBadge) {
    if (teacherName) {
      modalSubjectBadge.textContent = `Preferred Mentor: ${teacherName} • ${subjectTitle}`;
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

window.openSyllabusModal = function(subjectId) {
  if (!window.subjectsData) return;
  const item = window.subjectsData.find(s => s.id === subjectId);
  if (!item) return;

  const modal = document.getElementById('syllabusModal');
  const container = document.getElementById('syllabusModalContent');
  if (!container || !modal) return;

  container.innerHTML = `
    <div class="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-slate-200">
      <div>
        <span class="text-[11px] font-bold text-blue-700 uppercase tracking-wider block mb-1">
          ${item.boards.join(' • ')}
        </span>
        <h3 class="text-2xl font-bold text-slate-900 font-heading">${item.title}</h3>
        <p class="text-xs font-mono text-slate-500 mt-0.5">${item.codes ? item.codes.join(' | ') : ''}</p>
      </div>
      <button onclick="closeSyllabusModal()" class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 flex items-center justify-center transition-colors">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    </div>

    <div class="space-y-4 text-slate-600 text-xs">
      <div>
        <h4 class="text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-1">Curriculum Focus</h4>
        <p class="leading-relaxed text-slate-700">${item.description}</p>
      </div>

      <div>
        <h4 class="text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-2">Preparation Coverage</h4>
        <div class="space-y-2">
          ${(item.features || []).map(f => `
            <div class="flex items-center gap-2 text-slate-700">
              <i data-lucide="check" class="w-4 h-4 text-blue-600 shrink-0"></i>
              <span>${f}</span>
            </div>
          `).join('')}
          <div class="flex items-center gap-2 text-slate-700">
            <i data-lucide="check" class="w-4 h-4 text-blue-600 shrink-0"></i>
            <span>Weekly Examiner Keyword Feedback</span>
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
          <span class="font-bold text-blue-700 text-xs">${item.tutors || 'Certified Faculty'}</span>
        </div>
      </div>

      <div class="pt-2">
        <button onclick="closeSyllabusModal(); openBookingModal('${item.title}');" class="w-full btn-primary-academic py-3 text-xs font-bold">
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

window.toggleMobileMenu = function() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('hidden');
  }
};

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMessage');
  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.add('translate-y-24', 'opacity-0');
      toast.classList.remove('translate-y-0', 'opacity-100');
    }, 4500);
  }
}
