document.addEventListener('DOMContentLoaded', () => {

    // --- Navigation Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileToggle.addEventListener('click', () => {
        mobileDrawer.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.remove('active');
        });
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Animated Number Counters ---
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };

    // Use Intersection Observer to trigger counters when visible
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !hasAnimated) {
                animateCounters();
                hasAnimated = true;
            }
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }

    // --- Notice Board Filter ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const noticeItems = document.querySelectorAll('.notice-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            noticeItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- Contact / Admission Modal ---
    const applyBtn = document.getElementById('apply-btn');
    const mobileApply = document.querySelector('.mobile-apply');
    const modal = document.getElementById('contact-modal');
    const closeModal = document.getElementById('close-modal');
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    const openModal = () => {
        modal.classList.add('active');
        mobileDrawer.classList.remove('active'); // close mobile menu if open
    };

    if (applyBtn) applyBtn.addEventListener('click', openModal);
    if (mobileApply) mobileApply.addEventListener('click', openModal);

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('active');
            // reset form state on close
            setTimeout(() => {
                contactForm.style.display = 'flex';
                formSuccess.classList.add('hidden');
                contactForm.reset();
            }, 300);
        });
    }

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal.click();
        }
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate API request delay
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Submitting...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.style.display = 'none';
                formSuccess.classList.remove('hidden');
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1000);
        });
    }
});
