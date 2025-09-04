// Enhanced JavaScript for SQUAD HR Marketing Site
// Card animations, interactions, and form handling

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for card animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Add staggered animation delay
                const cards = entry.target.parentElement.querySelectorAll('.feature-card, .benefit-card');
                const index = Array.from(cards).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.1}s`;
            }
        });
    }, observerOptions);

    // Observe all cards for scroll animations
    const cards = document.querySelectorAll('.feature-card, .benefit-card, .beta-card, .stat-card');
    cards.forEach(card => {
        cardObserver.observe(card);
    });

    // Enhanced card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            
            // Animate icon
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
            
            // Reset icon
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Benefit cards hover effects
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Animate icon with bounce effect
            const icon = this.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = 'scale(1.3) translateY(-8px)';
                icon.style.filter = 'brightness(1.2)';
            }
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            
            // Reset icon
            const icon = this.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = 'scale(1) translateY(0)';
                icon.style.filter = 'brightness(1)';
            }
        });
    });

    // Interactive gradient background
    const interactive = document.querySelector('.interactive');
    if (interactive) {
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            interactive.style.transform = `translate(${x * 50}px, ${y * 50}px)`;
        });
    }

    // Form handling with enhanced validation
    const betaForm = document.querySelector('.beta-form');
    if (betaForm) {
        const inputs = betaForm.querySelectorAll('input, select, textarea');
        
        // Add focus effects to form inputs
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.style.borderColor = 'var(--color-primary)';
                this.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.2)';
            });

            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
                if (!this.value) {
                    this.style.borderColor = 'var(--color-border)';
                    this.style.boxShadow = 'none';
                }
            });

            // Real-time validation
            input.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.style.borderColor = '#10b981';
                } else {
                    this.style.borderColor = '#ef4444';
                }
            });
        });

        // Form submission
        betaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Joining Beta...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                showNotification('🎉 Welcome to the Beta Program! Check your email for next steps.', 'success');
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                
                // Reset input styles
                inputs.forEach(input => {
                    input.style.borderColor = 'var(--color-border)';
                });
                
            }, 2000);
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            hideNotification(notification);
        });
    }

    function hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const gradients = hero.querySelectorAll('.g1, .g2, .g3, .g4, .g5');
            gradients.forEach((gradient, index) => {
                const speed = (index + 1) * 0.1;
                gradient.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }

    // Stats counter animation
    const statCards = document.querySelectorAll('.stat-card');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statCards.forEach(card => {
        statsObserver.observe(card);
    });

    function animateStats(card) {
        const icon = card.querySelector('.stat-icon');
        if (icon) {
            icon.style.animation = 'bounce 0.6s ease-in-out';
        }
        
        // Add pulse effect
        card.style.animation = 'pulse 0.6s ease-in-out';
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(15, 23, 42, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
            } else {
                header.style.background = 'rgba(15, 23, 42, 0.8)';
                header.style.backdropFilter = 'blur(10px)';
            }
        });
    }

    // Beta spots countdown (simulated)
    const betaSpots = document.querySelector('.beta-spots span');
    if (betaSpots) {
        let spotsRemaining = 23;
        setInterval(() => {
            if (spotsRemaining > 5 && Math.random() < 0.3) {
                spotsRemaining--;
                betaSpots.textContent = `${spotsRemaining} spots remaining`;
                
                // Add urgency color when spots are low
                if (spotsRemaining <= 10) {
                    betaSpots.style.color = '#ef4444';
                    betaSpots.style.fontWeight = 'bold';
                }
            }
        }, 30000); // Update every 30 seconds
    }

    // Add loading animation to page
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

});

// CSS animations keyframes (to be added to CSS)
const animationStyles = `
    @keyframes animate-in {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes bounce {
        0%, 20%, 60%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-10px);
        }
        80% {
            transform: translateY(-5px);
        }
    }

    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 12px;
        padding: 1rem;
        color: white;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 1000;
        max-width: 400px;
    }

    .notification.show {
        transform: translateX(0);
    }

    .notification-success {
        border-left: 4px solid #10b981;
    }

    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.2s;
    }

    .notification-close:hover {
        opacity: 1;
    }

    body.loaded .feature-card,
    body.loaded .benefit-card {
        animation: animate-in 0.6s ease-out forwards;
    }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);