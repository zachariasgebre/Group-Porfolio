document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. Mobile Navigation Menu Toggle
  // ==========================================
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking any nav link
    document.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  // ==========================================
  // 2. Active Link Highlighting on Scroll
  // ==========================================
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-item');

  if (sections.length > 0 && navItems.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      const scrollY = window.pageYOffset;

      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });

      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
          item.classList.add('active');
        }
      });
    });
  }

  // ==========================================
  // 3. Project Filter Functionality
  // ==========================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || filterValue === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 4. Project Details Modal (Connected to your HTML)
  // ==========================================
  const modal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title') || '';
      const desc = btn.getAttribute('data-desc') || '';
      const img = btn.getAttribute('data-img') || '';

      if (modalImg) modalImg.src = img;
      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.innerHTML = desc;

      if (modal) modal.classList.add('active');
    });
  });

  if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // ==========================================
  // 5. Contact Form Submission Handling
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (contactForm.action && contactForm.action.includes('formspree.io')) {
        const data = new FormData(contactForm);
        try {
          const response = await fetch(contactForm.action, {
            method: contactForm.method,
            body: data,
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
          } else {
            alert('Oops! There was a problem submitting your form.');
          }
        } catch (error) {
          alert('Oops! Network error sending your message.');
        }
      } else {
        alert('Thank you! Your message has been sent successfully.');
        contactForm.reset();
      }
    });
  }

  // ==========================================
  // 6. Dynamic Footer Copyright Year
  // ==========================================
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});