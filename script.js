// VMware VNLI POV Experience - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize POV Experience
    initPOVNavigation();
    initExperienceToggle();
    initROIPanel();
    initKeyboardNavigation();
    initAnimations();
    
    console.log('VNLI POV Experience initialized successfully');
});

// POV Scene Navigation
function initPOVNavigation() {
    const scenes = document.querySelectorAll('.pov-scene');
    const prevBtn = document.getElementById('prev-scene');
    const nextBtn = document.getElementById('next-scene');
    const sceneDots = document.querySelectorAll('.scene-dot');
    
    let currentScene = 1;
    const totalScenes = scenes.length;
    
    function showScene(sceneNumber) {
        // Hide all scenes
        scenes.forEach(scene => {
            scene.classList.remove('active');
            scene.style.opacity = '0';
            scene.style.transform = 'translateX(100%)';
        });
        
        // Show current scene
        const activeScene = document.getElementById(`scene-${sceneNumber}`);
        if (activeScene) {
            setTimeout(() => {
                activeScene.classList.add('active');
                activeScene.style.opacity = '1';
                activeScene.style.transform = 'translateX(0)';
            }, 150);
        }
        
        // Update navigation buttons
        prevBtn.disabled = sceneNumber === 1;
        nextBtn.disabled = sceneNumber === totalScenes;
        
        // Update scene indicators
        sceneDots.forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === sceneNumber);
        });
        
        // Update time stamps based on experience mode
        updateTimeStamps();
        
        // Track scene change
        trackInteraction(`Scene Changed: ${sceneNumber}`, 'Navigation');
    }
    
    // Previous scene
    prevBtn.addEventListener('click', () => {
        if (currentScene > 1) {
            currentScene--;
            showScene(currentScene);
        }
    });
    
    // Next scene
    nextBtn.addEventListener('click', () => {
        if (currentScene < totalScenes) {
            currentScene++;
            showScene(currentScene);
        }
    });
    
    // Scene dot navigation
    sceneDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentScene = index + 1;
            showScene(currentScene);
        });
    });
    
    // Initialize first scene
    showScene(currentScene);
}

// Experience Toggle (Traditional vs VNLI)
function initExperienceToggle() {
    const traditionalBtn = document.getElementById('traditional-btn');
    const vnliBtn = document.getElementById('vnli-btn');
    const experienceViews = document.querySelectorAll('.experience-view');
    
    let currentExperience = 'traditional';
    
    function switchExperience(experience) {
        currentExperience = experience;
        
        // Update button states
        traditionalBtn.classList.toggle('active', experience === 'traditional');
        vnliBtn.classList.toggle('active', experience === 'vnli');
        
        // Update all experience views
        experienceViews.forEach(view => {
            view.classList.remove('active');
        });
        
        // Show views for current experience
        const activeViews = document.querySelectorAll(`.${experience}-view`);
        activeViews.forEach(view => {
            view.classList.add('active');
        });
        
        // Update time stamps
        updateTimeStamps();
        
        // Update thought bubbles with animation
        animateThoughtBubbles();
        
        // Track experience change
        trackInteraction(`Experience Changed: ${experience}`, 'User Interaction');
    }
    
    traditionalBtn.addEventListener('click', () => {
        if (currentExperience !== 'traditional') {
            switchExperience('traditional');
        }
    });
    
    vnliBtn.addEventListener('click', () => {
        if (currentExperience !== 'vnli') {
            switchExperience('vnli');
        }
    });
    
    // Initialize with traditional experience
    switchExperience('traditional');
}

// Update time stamps based on current experience
function updateTimeStamps() {
    const traditionalTimes = document.querySelectorAll('.traditional-time');
    const vnliTimes = document.querySelectorAll('.vnli-time');
    const currentExperience = document.querySelector('.experience-btn.active').dataset.experience;
    
    if (currentExperience === 'traditional') {
        traditionalTimes.forEach(time => time.classList.remove('hidden'));
        vnliTimes.forEach(time => time.classList.add('hidden'));
    } else {
        traditionalTimes.forEach(time => time.classList.add('hidden'));
        vnliTimes.forEach(time => time.classList.remove('hidden'));
    }
}

// ROI Panel Toggle
function initROIPanel() {
    const roiToggle = document.getElementById('roi-toggle');
    const roiContent = document.getElementById('roi-content');
    let isROIOpen = false;
    
    roiToggle.addEventListener('click', () => {
        isROIOpen = !isROIOpen;
        roiContent.classList.toggle('hidden', !isROIOpen);
        
        // Update button text
        const buttonText = isROIOpen ? 'Hide ROI Impact' : 'View ROI Impact';
        roiToggle.innerHTML = `<span class="roi-icon">💰</span>${buttonText}`;
        
        // Animate metrics when opening
        if (isROIOpen) {
            animateROIMetrics();
        }
        
        trackInteraction(`ROI Panel ${isROIOpen ? 'Opened' : 'Closed'}`, 'User Interaction');
    });
    
    // Close ROI panel when clicking outside
    document.addEventListener('click', (e) => {
        if (isROIOpen && !roiToggle.contains(e.target) && !roiContent.contains(e.target)) {
            isROIOpen = false;
            roiContent.classList.add('hidden');
            roiToggle.innerHTML = '<span class="roi-icon">💰</span>View ROI Impact';
        }
    });
}

// Animate ROI metrics
function animateROIMetrics() {
    const metrics = [
        { element: '.roi-traditional .metric-value', values: ['4 hours', '$300', '$7,500'] },
        { element: '.roi-vnli .metric-value', values: ['15 minutes', '$15.50', '$387.50'] }
    ];
    
    metrics.forEach(metric => {
        const elements = document.querySelectorAll(metric.element);
        elements.forEach((element, index) => {
            if (metric.values[index]) {
                animateCounterText(element, metric.values[index], 1000);
            }
        });
    });
}

// Animate counter text
function animateCounterText(element, finalText, duration) {
    const steps = 20;
    const stepTime = duration / steps;
    let step = 0;
    
    const interval = setInterval(() => {
        step++;
        
        if (step < steps) {
            // Show random characters during animation
            element.textContent = generateRandomText(finalText.length);
        } else {
            // Show final text
            element.textContent = finalText;
            clearInterval(interval);
        }
    }, stepTime);
}

function generateRandomText(length) {
    const chars = '0123456789$,.';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Keyboard Navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowLeft':
                document.getElementById('prev-scene').click();
                e.preventDefault();
                break;
            case 'ArrowRight':
                document.getElementById('next-scene').click();
                e.preventDefault();
                break;
            case '1':
            case '2':
            case '3':
                const sceneNumber = parseInt(e.key);
                const sceneDot = document.querySelector(`[data-scene="${sceneNumber}"]`);
                if (sceneDot) {
                    sceneDot.click();
                    e.preventDefault();
                }
                break;
            case 't':
            case 'T':
                document.getElementById('traditional-btn').click();
                e.preventDefault();
                break;
            case 'v':
            case 'V':
                document.getElementById('vnli-btn').click();
                e.preventDefault();
                break;
            case 'r':
            case 'R':
                document.getElementById('roi-toggle').click();
                e.preventDefault();
                break;
            case 'Escape':
                // Close ROI panel if open
                const roiContent = document.getElementById('roi-content');
                if (!roiContent.classList.contains('hidden')) {
                    document.getElementById('roi-toggle').click();
                    e.preventDefault();
                }
                break;
        }
    });
}

// Animation System
function initAnimations() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Add appropriate animation class
                if (target.classList.contains('thought-bubble')) {
                    target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                } else if (target.classList.contains('impact-indicator')) {
                    target.style.animation = 'slideInRight 0.6s ease-out forwards';
                } else if (target.classList.contains('screen-mockup')) {
                    target.style.animation = 'fadeInUp 1s ease-out forwards';
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    // Observe animatable elements
    const animatableElements = document.querySelectorAll([
        '.thought-bubble',
        '.impact-indicator',
        '.screen-mockup',
        '.time-indicator',
        '.resolution-step'
    ].join(', '));
    
    animatableElements.forEach(el => observer.observe(el));
    
    // Initial animations for visible elements
    setTimeout(() => {
        const visibleElements = document.querySelectorAll('.pov-scene.active .animate-fade-in');
        visibleElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.animation = 'fadeInUp 0.6s ease-out forwards';
            }, index * 100);
        });
    }, 500);
}

// Animate thought bubbles when switching experiences
function animateThoughtBubbles() {
    const thoughtBubbles = document.querySelectorAll('.pov-scene.active .thought-bubble');
    
    thoughtBubbles.forEach((bubble, index) => {
        // Reset animation
        bubble.style.animation = 'none';
        bubble.offsetHeight; // Trigger reflow
        
        // Apply animation with delay
        setTimeout(() => {
            bubble.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }, index * 200);
    });
}

// Simulate typing effect for VNLI queries
function initTypingEffects() {
    const typingElements = document.querySelectorAll('.typing-indicator');
    
    typingElements.forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    simulateTyping(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

function simulateTyping(element) {
    const originalText = 'VNLI is analyzing...';
    element.textContent = '';
    
    let index = 0;
    const typingSpeed = 100;
    
    const typeInterval = setInterval(() => {
        if (index < originalText.length) {
            element.textContent += originalText.charAt(index);
            index++;
        } else {
            clearInterval(typeInterval);
            
            // Show analysis complete after typing
            setTimeout(() => {
                const analysisComplete = element.nextElementSibling;
                if (analysisComplete && analysisComplete.classList.contains('analysis-complete')) {
                    analysisComplete.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            }, 1000);
        }
    }, typingSpeed);
}

// Stress meter animations
function animateStressMeters() {
    const stressBars = document.querySelectorAll('.stress-bar');
    
    stressBars.forEach(bar => {
        const targetWidth = bar.style.width || '90%';
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
        }, 500);
    });
}

// Chart animations
function animateCharts() {
    const charts = document.querySelectorAll('.chart-line');
    
    charts.forEach(chart => {
        chart.style.animation = 'chartPulse 2s ease-in-out infinite';
    });
}

// Add chart animation keyframes
const chartAnimation = `
@keyframes chartPulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
}
`;

// Add the animation to the document
const style = document.createElement('style');
style.textContent = chartAnimation;
document.head.appendChild(style);

// Terminal cursor animation
function initTerminalCursor() {
    const cursors = document.querySelectorAll('.terminal-cursor');
    
    cursors.forEach(cursor => {
        cursor.style.animation = 'blink 1s infinite';
    });
}

// Performance monitoring
function trackPerformance() {
    // Track Core Web Vitals
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
            
            trackInteraction(`Page Load Time: ${loadTime}ms`, 'Performance');
        });
    }
}

// Analytics tracking
function trackInteraction(action, category = 'POV Experience') {
    // Placeholder for analytics tracking
    console.log(`Analytics: ${category} - ${action}`);
    
    // In production, replace with your analytics service
    // gtag('event', action, { event_category: category });
    // or
    // analytics.track(action, { category: category });
}

// Add click tracking to interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Track experience toggle clicks
    document.querySelectorAll('.experience-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            trackInteraction(`Experience Toggle: ${btn.dataset.experience}`, 'User Interaction');
        });
    });
    
    // Track navigation clicks
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            trackInteraction(`Navigation: ${btn.textContent.trim()}`, 'User Interaction');
        });
    });
    
    // Track scene dot clicks
    document.querySelectorAll('.scene-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            trackInteraction(`Scene Direct Navigation: ${dot.dataset.scene}`, 'User Interaction');
        });
    });
    
    // Track action button clicks
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            trackInteraction(`Action Button: ${btn.textContent.trim()}`, 'VNLI Interaction');
        });
    });
});

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    initTypingEffects();
    initTerminalCursor();
    trackPerformance();
    
    // Animate stress meters when scene becomes active
    const sceneObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('active') && mutation.target.classList.contains('pov-scene')) {
                setTimeout(animateStressMeters, 500);
                setTimeout(animateCharts, 1000);
            }
        });
    });
    
    document.querySelectorAll('.pov-scene').forEach(scene => {
        sceneObserver.observe(scene, { attributes: true, attributeFilter: ['class'] });
    });
});

// Accessibility enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Announce scene changes to screen readers
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.position = 'absolute';
    liveRegion.style.left = '-10000px';
    liveRegion.style.width = '1px';
    liveRegion.style.height = '1px';
    liveRegion.style.overflow = 'hidden';
    document.body.appendChild(liveRegion);
    
    // Update live region on scene changes
    document.querySelectorAll('.scene-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const sceneNumber = dot.dataset.scene;
            const sceneTitle = document.querySelector(`#scene-${sceneNumber} .scene-title h2`);
            if (sceneTitle) {
                liveRegion.textContent = `Now viewing: ${sceneTitle.textContent}`;
            }
        });
    });
    
    // Update live region on experience changes
    document.querySelectorAll('.experience-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const experience = btn.dataset.experience;
            const experienceName = experience === 'traditional' ? 'Traditional VMware Management' : 'VNLI Natural Language Interface';
            liveRegion.textContent = `Now viewing: ${experienceName} experience`;
        });
    });
});

// Export functions for potential external use
window.VNLIPOVExperience = {
    switchExperience: (experience) => {
        const btn = document.querySelector(`[data-experience="${experience}"]`);
        if (btn) btn.click();
    },
    goToScene: (sceneNumber) => {
        const dot = document.querySelector(`[data-scene="${sceneNumber}"]`);
        if (dot) dot.click();
    },
    toggleROI: () => {
        document.getElementById('roi-toggle').click();
    },
    trackInteraction: trackInteraction
};