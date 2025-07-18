// Portfolio Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initThemeToggle();
    initScrollAnimations();
    initFormValidation();
    initScrollEffects();
    initLoadingAnimation();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Close mobile menu
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (navToggle) {
                navToggle.classList.remove('active');
            }
            
            // Handle smooth scrolling
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Update active navigation link based on scroll position
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const currentTheme = savedTheme || 'light';
    body.setAttribute('data-color-scheme', currentTheme);
    updateThemeIcon(currentTheme, icon);
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = body.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, icon);
    });
}

// Update theme icon
function updateThemeIcon(theme, icon) {
    if (icon) {
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Navbar scroll effects
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
}

// Form validation and submission
function initFormValidation() {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    if (!form || !nameInput || !emailInput || !messageInput) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous error messages
        clearErrorMessages();
        
        let isValid = true;
        
        // Validate name
        if (!validateName(nameInput.value)) {
            showError(nameInput, 'Please enter a valid name');
            isValid = false;
        }
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        if (!validateMessage(messageInput.value)) {
            showError(messageInput, 'Please enter a message (minimum 10 characters)');
            isValid = false;
        }
        
        if (isValid) {
            // Show success message
            showSuccessMessage('Thank you for your message! I\'ll get back to you soon.');
            form.reset();
        }
    });
    
    // Real-time validation
    nameInput.addEventListener('blur', function() {
        validateField(this, validateName(this.value), 'Please enter a valid name');
    });
    
    emailInput.addEventListener('blur', function() {
        validateField(this, validateEmail(this.value), 'Please enter a valid email address');
    });
    
    messageInput.addEventListener('blur', function() {
        validateField(this, validateMessage(this.value), 'Please enter a message (minimum 10 characters)');
    });
}

// Validation functions
function validateName(name) {
    return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

// Validation helper functions
function validateField(field, isValid, errorMessage) {
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    if (isValid) {
        field.classList.remove('error');
        field.classList.add('success');
    } else {
        field.classList.remove('success');
        field.classList.add('error');
        showError(field, errorMessage);
    }
}

function showError(field, message) {
    field.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    field.parentNode.appendChild(errorElement);
}

function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
    
    const successMessages = document.querySelectorAll('.success-message');
    successMessages.forEach(success => success.remove());
    
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(control => {
        control.classList.remove('error', 'success');
    });
}

function showSuccessMessage(message) {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    const successElement = document.createElement('div');
    successElement.className = 'success-message';
    successElement.textContent = message;
    
    form.appendChild(successElement);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        if (successElement && successElement.parentNode) {
            successElement.remove();
        }
    }, 5000);
}

// Handle all anchor links with smooth scrolling
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]') || e.target.closest('a[href^="#"]')) {
        e.preventDefault();
        
        const link = e.target.matches('a[href^="#"]') ? e.target : e.target.closest('a[href^="#"]');
        const targetId = link.getAttribute('href');
        
        if (targetId && targetId !== '#') {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    }
});

// Add loading animation
function initLoadingAnimation() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', function() {
        body.style.opacity = '1';
    });
}

// Add scroll-to-top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-primary);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'scale(1)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'scale(0.8)';
        }
    });
    
    // Scroll to top on click
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top
setTimeout(() => {
    initScrollToTop();
}, 100);

// Add project card click functionality
document.addEventListener('click', function(e) {
    if (e.target.matches('.project-card .btn') || e.target.closest('.project-card .btn')) {
        e.preventDefault();
        const btn = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
        const projectCard = btn.closest('.project-card');
        const projectTitle = projectCard.querySelector('h3').textContent;
        
        // Create modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: var(--color-surface);
                padding: 2rem;
                border-radius: 10px;
                max-width: 500px;
                text-align: center;
                color: var(--color-text);
                transform: scale(0.8);
                transition: transform 0.3s ease;
                margin: 1rem;
            ">
                <h3 style="margin-bottom: 1rem; color: var(--color-text);">${projectTitle}</h3>
                <p style="margin-bottom: 1.5rem; color: var(--color-text);">This project showcases my skills in modern web development. For more details about this project, please feel free to contact me!</p>
                <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" style="
                    background: var(--color-primary);
                    color: var(--color-btn-primary-text);
                    border: none;
                    padding: 0.5rem 1rem;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: 500;
                ">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Trigger animations
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.firstElementChild.style.transform = 'scale(1)';
        }, 10);
        
        // Close on backdrop click
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.remove();
            }
        });
    }
});

// Add typing effect to hero subtitle
function initTypingEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.borderRight = '2px solid var(--color-white)';
    
    let i = 0;
    const typeWriter = function() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                subtitle.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing effect after hero animation
    setTimeout(typeWriter, 1000);
}

// Initialize typing effect after page load
setTimeout(() => {
    initTypingEffect();
}, 100);

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    // Set initial theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-color-scheme', savedTheme);
});