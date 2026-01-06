/**
 * Premium FAANG-Level Portfolio JavaScript
 * Features: Typing Effect, Animated Counters, Filters, Scroll Animations, Theme Toggle
 */

(function() {
    'use strict';

    // ========== Theme Toggle ==========
    const themeToggleNav = document.getElementById('themeToggleNav');
    const themeIconNav = document.getElementById('themeIconNav');
    const html = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Set initial theme
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeToggleNav) {
        themeToggleNav.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeIconNav) {
            if (theme === 'dark') {
                themeIconNav.className = 'bi bi-moon-fill';
            } else {
                themeIconNav.className = 'bi bi-sun-fill';
            }
        }
    }

    // ========== Typing Effect ==========
    const typingText = document.getElementById('typingText');
    const roles = [
        'Full Stack Developer',
        'Angular Developer',
        '.NET & Backend Engineer',
        'System Architect'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(typeRole, typingSpeed);
    }

    if (typingText) {
        typeRole();
    }

    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ========== Navbar Scroll Effect ==========
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link
        updateActiveNavLink();
        
        lastScroll = currentScroll;
    });

    // ========== Active Nav Link ==========
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // ========== Animated Counters ==========
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                if (target % 1 === 0) {
                    element.textContent = Math.floor(current);
                } else {
                    element.textContent = current.toFixed(1);
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (target % 1 === 0) {
                    element.textContent = target;
                } else {
                    element.textContent = target.toFixed(1);
                }
            }
        };

        updateCounter();
    }

    function observeCounters() {
        const counters = document.querySelectorAll('.stat-number[data-target], .metric-number[data-target]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    const target = parseFloat(entry.target.getAttribute('data-target'));
                    animateCounter(entry.target, target);
                }
            });
        }, {
            threshold: 0.5
        });

        counters.forEach(counter => observer.observe(counter));
    }

    observeCounters();

    // ========== Skill Progress Bars Animation ==========
    function animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar-fill');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    setTimeout(() => {
                        entry.target.style.width = width + '%';
                    }, 200);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        progressBars.forEach(bar => observer.observe(bar));
    }

    animateProgressBars();

    // ========== Project Filters ==========
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectItems.forEach(item => {
                if (filter === 'all') {
                    item.classList.remove('hidden');
                } else {
                    const categories = item.getAttribute('data-category').split(' ');
                    if (categories.includes(filter)) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });

            // Animate visible items
            const visibleItems = document.querySelectorAll('.project-item:not(.hidden)');
            visibleItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            });
        });
    });

    // ========== Scroll Animations ==========
    function observeFadeIn() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        fadeElements.forEach(element => observer.observe(element));
    }

    observeFadeIn();

    // ========== Contact Form ==========
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            const submitButton = contactForm.querySelector('button[type="submit"]');

            // Validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields.', 'danger');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'danger');
                return;
            }

            // Disable submit button
            submitButton.disabled = true;
            submitButton.classList.add('btn-loading');
            submitButton.innerHTML = '<span><span class="spinner-border spinner-border-sm me-2"></span>Sending...</span>';

            // Simulate form submission
            setTimeout(() => {
                showFormMessage('Thank you for your message! I\'ll get back to you soon.', 'success');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.classList.remove('btn-loading');
                submitButton.innerHTML = '<span><i class="bi bi-send me-2"></i>Send Message</span>';
            }, 1500);
        });
    }

    function showFormMessage(message, type) {
        formMessage.innerHTML = `
            <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;

        setTimeout(() => {
            const alert = formMessage.querySelector('.alert');
            if (alert) {
                const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
                bsAlert.close();
            }
        }, 5000);
    }

    // ========== Project Card Hover Effects ==========
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ========== Modal Animation ==========
    const modals = document.querySelectorAll('.modal');
    
    modals.forEach(modal => {
        modal.addEventListener('show.bs.modal', () => {
            const modalContent = modal.querySelector('.modal-content');
            modalContent.style.opacity = '0';
            modalContent.style.transform = 'translateY(-50px)';
            
            setTimeout(() => {
                modalContent.style.transition = 'all 0.3s ease';
                modalContent.style.opacity = '1';
                modalContent.style.transform = 'translateY(0)';
            }, 10);
        });
    });

    // ========== Profile Picture Error Handling ==========
    const profileImg = document.getElementById('profileImg');
    const profilePlaceholder = document.getElementById('profilePlaceholder');
    
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            this.style.display = 'none';
            if (profilePlaceholder) {
                profilePlaceholder.classList.remove('hidden');
            }
        });
        
        profileImg.addEventListener('load', function() {
            if (profilePlaceholder) {
                profilePlaceholder.classList.add('hidden');
            }
        });
        
        // Check if image loaded
        if (!profileImg.complete || profileImg.naturalHeight === 0) {
            if (profilePlaceholder) {
                profilePlaceholder.classList.remove('hidden');
            }
        }
    }

    // ========== Button Ripple Effect ==========
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // Add ripple effect to buttons
    document.querySelectorAll('.btn-primary-custom, .btn-outline-custom, .btn-theme-nav, .filter-btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });

    // ========== Enhanced Form Submit Animation ==========
    const submitBtn = document.getElementById('submitBtn');
    if (submitBtn && contactForm) {
        contactForm.addEventListener('submit', function(e) {
            if (submitBtn) {
                submitBtn.classList.add('btn-loading');
            }
        });
    }

    // ========== Initialize on Load ==========
    window.addEventListener('load', () => {
        // Set initial active nav link
        updateActiveNavLink();
        
        // Animate elements on initial load
        const initialFadeElements = document.querySelectorAll('.fade-in');
        setTimeout(() => {
            initialFadeElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    element.classList.add('visible');
                }
            });
        }, 100);
        
        // Check profile image
        if (profileImg && profileImg.complete && profileImg.naturalHeight !== 0) {
            if (profilePlaceholder) {
                profilePlaceholder.classList.add('hidden');
            }
        }
    });

    // ========== Performance Optimization ==========
    // Debounce function for scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Apply throttling to scroll events
    const throttledScroll = throttle(() => {
        updateActiveNavLink();
    }, 100);

    window.addEventListener('scroll', throttledScroll);

    console.log('🚀 Premium Portfolio JavaScript Loaded Successfully!');

})();
