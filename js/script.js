document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Active Link Highlight based on Current Page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 2. Apple-style Navbar Shrink on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Mobile Navigation Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // 4. Apple-style Scroll Reveal Animation (IntersectionObserver)
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // 5. Spotlight Pointer Glow Effect & 3D Tilt on Glass Cards
    const spotlightCards = document.querySelectorAll('.quick-card, .skill-card, .project-card, .social-card, .about-section, .learning-box, .contact-form-card, .timeline-content');
    
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // 6. Typewriter Effect in Hero Section
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const phrases = [
            "Computer Science Undergraduate",
            "Passionate Software Developer",
            "Badminton Enthusiast & Flautist",
            "Problem Solver & Tech Explorer"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 35;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 85;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 350;
            }

            setTimeout(type, typeSpeed);
        }

        type();
    }

    // 7. Formspree Seamless AJAX Submission with Success Animation
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const successBanner = document.getElementById('form-success');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const originalBtnHTML = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.classList.add('btn-sending');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    if (successBanner) {
                        successBanner.style.display = 'flex';
                    }
                    submitBtn.classList.remove('btn-sending');
                    submitBtn.classList.add('btn-success');
                    submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent Successfully!';

                    contactForm.reset();

                    setTimeout(() => {
                        submitBtn.disabled = false;
                        submitBtn.classList.remove('btn-success');
                        submitBtn.innerHTML = originalBtnHTML;
                    }, 6000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                submitBtn.disabled = false;
                submitBtn.classList.remove('btn-sending');
                submitBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error! Try Again';

                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnHTML;
                }, 4000);
            }
        });
    }

    // 8. Dynamic Back to Top Button
    let backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) {
        backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        document.body.appendChild(backToTopBtn);
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 9. Water Parallax Effect on Hero Image
    const waterContainer = document.querySelector('.profile-water-container');
    if (waterContainer) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) * 0.012;
            const y = (e.clientY - window.innerHeight / 2) * 0.012;
            waterContainer.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
});