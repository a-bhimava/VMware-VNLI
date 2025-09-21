// VMware VNLI Demo - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollProgress();
    initSmoothScrolling();
    initROICalculator();
    initAnimations();
    initTypingAnimation();
    initWorkflowProgression();
    initCounterAnimations();
    
    console.log('VNLI Demo initialized successfully');
});

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress .progress-bar');
    
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollTop / documentHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = `${Math.min(scrollPercentage, 100)}%`;
        }
    }
    
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Initial call
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
}

// ROI Calculator
function initROICalculator() {
    const adminsSlider = document.getElementById('admins');
    const incidentsSlider = document.getElementById('incidents');
    const monthlySavings = document.getElementById('monthly-savings');
    const annualSavings = document.getElementById('annual-savings');
    const roiValue = document.getElementById('roi-value');
    
    // Update display values for sliders
    function updateSliderDisplays() {
        if (adminsSlider) {
            const adminsValue = adminsSlider.parentNode.querySelector('.input-value');
            if (adminsValue) adminsValue.textContent = adminsSlider.value;
        }
        
        if (incidentsSlider) {
            const incidentsValue = incidentsSlider.parentNode.querySelector('.input-value');
            if (incidentsValue) incidentsValue.textContent = incidentsSlider.value;
        }
    }
    
    // Calculate ROI based on inputs
    function calculateROI() {
        if (!adminsSlider || !incidentsSlider) return;
        
        const numAdmins = parseInt(adminsSlider.value);
        const monthlyIncidents = parseInt(incidentsSlider.value);
        
        // Constants based on our analysis
        const costPerIncident = 585; // Savings per incident with VNLI
        const adminHourlyCost = 75; // Average VMware admin hourly rate
        const timeReductionHours = 3.75; // Average time saved per incident (4 hrs -> 15 min)
        
        // Calculate savings
        const monthlyIncidentSavings = monthlyIncidents * costPerIncident;
        const monthlyTimeSavings = monthlyIncidents * timeReductionHours * adminHourlyCost;
        const totalMonthlySavings = monthlyIncidentSavings + monthlyTimeSavings;
        const totalAnnualSavings = totalMonthlySavings * 12;
        
        // Calculate ROI (assuming $100K implementation cost)
        const implementationCost = 100000;
        const threeYearSavings = totalAnnualSavings * 3;
        const roi = ((threeYearSavings - implementationCost) / implementationCost) * 100;
        
        // Update display with animation
        animateCounter(monthlySavings, totalMonthlySavings, '$', 0);
        animateCounter(annualSavings, totalAnnualSavings, '$', 0);
        animateCounter(roiValue, roi, '', 0, '%');
    }
    
    // Add event listeners
    if (adminsSlider) {
        adminsSlider.addEventListener('input', () => {
            updateSliderDisplays();
            calculateROI();
        });
    }
    
    if (incidentsSlider) {
        incidentsSlider.addEventListener('input', () => {
            updateSliderDisplays();
            calculateROI();
        });
    }
    
    // Initial calculation
    updateSliderDisplays();
    calculateROI();
}

// Counter Animation
function animateCounter(element, target, prefix = '', suffix = '', postfix = '') {
    if (!element) return;
    
    const start = 0;
    const duration = 1000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (target - start) * easeOutQuart;
        
        // Format number with commas
        const formattedNumber = Math.round(current).toLocaleString();
        element.textContent = `${prefix}${formattedNumber}${suffix}${postfix}`;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Intersection Observer for Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Add animation classes based on element type
                if (target.classList.contains('summary-card')) {
                    target.classList.add('scale-in');
                } else if (target.classList.contains('workflow-step')) {
                    target.classList.add('slide-up');
                } else {
                    target.classList.add('fade-in');
                }
                
                // Unobserve after animation
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll([
        '.summary-card',
        '.workflow-step',
        '.persona-card',
        '.pain-summary',
        '.success-summary',
        '.roi-calculator',
        '.cta-button'
    ].join(', '));
    
    animateElements.forEach(el => observer.observe(el));
}

// Typing Animation for VNLI Interface
function initTypingAnimation() {
    const typingElements = document.querySelectorAll('.typing-animation');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let index = 0;
        const typeSpeed = 50; // milliseconds per character
        
        function typeChar() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeChar, typeSpeed);
            } else {
                // Remove blinking cursor after typing is complete
                element.style.setProperty('--cursor-display', 'none');
            }
        }
        
        // Start typing animation when element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeChar, 500); // Delay before starting
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// Workflow Step Progression
function initWorkflowProgression() {
    const workflowSteps = document.querySelectorAll('.workflow-step');
    
    workflowSteps.forEach((step, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add progressive delay for staggered animation
                    setTimeout(() => {
                        step.classList.add('slide-up');
                        
                        // Add pulse effect to step number
                        const stepNumber = step.querySelector('::before');
                        if (stepNumber) {
                            step.style.setProperty('--step-pulse', 'pulse 0.6s ease-in-out');
                        }
                    }, index * 200);
                    
                    observer.unobserve(step);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(step);
    });
}

// Counter Animations for Summary Cards
function initCounterAnimations() {
    const summaryValues = document.querySelectorAll('.summary-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                
                // Extract number and suffix
                const numberMatch = text.match(/\d+/);
                const number = numberMatch ? parseInt(numberMatch[0]) : 0;
                const suffix = text.replace(/\d+/, '');
                
                // Animate the counter
                animateCounter(element, number, '', suffix);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    summaryValues.forEach(el => observer.observe(el));
}

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced hover effects for glass cards
    const glassCards = document.querySelectorAll('.glass-card');
    
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-4px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', function(e) {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Parallax effect for background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.section-content');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
        });
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Navigate sections with arrow keys
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const sections = document.querySelectorAll('section, main');
        const currentSection = getCurrentSection();
        
        if (currentSection !== -1) {
            const nextSection = e.key === 'ArrowDown' 
                ? Math.min(currentSection + 1, sections.length - 1)
                : Math.max(currentSection - 1, 0);
            
            if (sections[nextSection]) {
                sections[nextSection].scrollIntoView({ behavior: 'smooth' });
                e.preventDefault();
            }
        }
    }
});

function getCurrentSection() {
    const sections = document.querySelectorAll('section, main');
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (scrollPosition >= section.offsetTop && 
            scrollPosition < section.offsetTop + section.offsetHeight) {
            return i;
        }
    }
    return -1;
}

// Performance optimization - Throttle scroll events
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
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Any scroll-based animations or calculations
}, 16)); // ~60fps

// Add loading states and error handling
function showLoading(element) {
    if (element) {
        element.style.opacity = '0.6';
        element.style.pointerEvents = 'none';
    }
}

function hideLoading(element) {
    if (element) {
        element.style.opacity = '';
        element.style.pointerEvents = '';
    }
}

// Analytics tracking (placeholder for future implementation)
function trackInteraction(action, category = 'User Interaction') {
    // Placeholder for analytics tracking
    console.log(`Analytics: ${category} - ${action}`);
}

// Add click tracking to CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        trackInteraction(`CTA Clicked: ${this.textContent.trim()}`);
        
        // Add visual feedback
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
            this.style.transform = '';
        }, 100);
    });
});

// ROI Calculator interaction tracking
document.querySelectorAll('input[type="range"]').forEach(slider => {
    slider.addEventListener('change', function() {
        trackInteraction(`ROI Calculator: ${this.id} changed to ${this.value}`);
    });
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #0091DA';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Add aria-live region for dynamic content updates
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    document.body.appendChild(liveRegion);
    
    // Announce ROI calculator updates to screen readers
    const roiInputs = document.querySelectorAll('#admins, #incidents');
    roiInputs.forEach(input => {
        input.addEventListener('change', function() {
            const monthlySavings = document.getElementById('monthly-savings');
            if (monthlySavings) {
                liveRegion.textContent = `ROI updated: Monthly savings now ${monthlySavings.textContent}`;
            }
        });
    });
});

// Export functions for potential external use
window.VNLIDemo = {
    calculateROI: initROICalculator,
    animateCounter: animateCounter,
    trackInteraction: trackInteraction
};