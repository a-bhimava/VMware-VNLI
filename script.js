// VMware VNLI POV Experience - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize POV Experience
    initPOVNavigation();
    initExperienceToggle();
    initROIPanel();
    initKeyboardNavigation();
    initAnimations();
    initTypingSimulation();
    initInteractiveElements();
    
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
    
    // Handle alert action buttons (Investigate, Acknowledge)
    document.querySelectorAll('.alert-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const buttonText = btn.textContent.trim();
            
            if (buttonText === 'Investigate') {
                // Navigate to Scene 2 (Investigation Phase)
                const scene2Dot = document.querySelector('[data-scene="2"]');
                if (scene2Dot) {
                    scene2Dot.click();
                }
                trackInteraction('Alert: Investigate clicked', 'Workflow Interaction');
            } else if (buttonText === 'Acknowledge') {
                // Add visual feedback for acknowledge
                btn.style.background = '#666';
                btn.textContent = 'Acknowledged';
                btn.disabled = true;
                trackInteraction('Alert: Acknowledge clicked', 'Workflow Interaction');
            }
        });
    });
});

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    initTypingEffects();
    initTerminalCursor();
    trackPerformance();
    initSavingsCalculator();
    
    // Animate stress meters when scene becomes active
    const sceneObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.classList.contains('active') && mutation.target.classList.contains('pov-scene')) {
                setTimeout(animateStressMeters, 500);
                setTimeout(animateCharts, 1000);
                setTimeout(() => {
                    // Trigger interactive elements when scene becomes active
                    const activeScene = mutation.target;
                    const progressBars = activeScene.querySelectorAll('.progress-bar, .stress-bar');
                    progressBars.forEach(animateProgressBar);
                }, 1200);
            }
        });
    });
    
    document.querySelectorAll('.pov-scene').forEach(scene => {
        sceneObserver.observe(scene, { attributes: true, attributeFilter: ['class'] });
    });
    
    // Enhanced screen navigation for new scenarios
    const screenNavigation = document.querySelectorAll('.screen');
    screenNavigation.forEach((screen, index) => {
        screen.addEventListener('transitionend', () => {
            if (screen.classList.contains('active')) {
                // Trigger specific animations for each screen
                setTimeout(() => {
                    const experienceViews = screen.querySelectorAll('.experience-view');
                    experienceViews.forEach(view => {
                        if (view.classList.contains('active')) {
                            triggerScreenSpecificAnimations(view);
                        }
                    });
                }, 300);
            }
        });
    });
});

function triggerScreenSpecificAnimations(view) {
    // Animate workflow steps
    const workflowSteps = view.querySelectorAll('.workflow-step, .timeline-step, .planning-phase');
    workflowSteps.forEach((step, index) => {
        setTimeout(() => {
            step.style.animation = 'slideInLeft 0.6s ease-out forwards';
        }, index * 200);
    });
    
    // Animate metric comparisons
    const metricBars = view.querySelectorAll('.metric-bar, .comparison-metric');
    metricBars.forEach((bar, index) => {
        setTimeout(() => {
            animateProgressBar(bar);
        }, index * 300);
    });
    
    // Animate conversation messages
    const messages = view.querySelectorAll('.message');
    messages.forEach((message, index) => {
        setTimeout(() => {
            message.style.animation = 'fadeInUp 0.5s ease-out forwards';
        }, index * 400);
    });
}

// Enhanced Accessibility Features
document.addEventListener('DOMContentLoaded', () => {
    // Create live region for screen reader announcements
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
    `;
    document.body.appendChild(liveRegion);
    
    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Add focus management for experience toggles
        if (e.key === 'Tab') {
            const focusableElements = document.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const currentFocus = document.activeElement;
            const currentIndex = Array.from(focusableElements).indexOf(currentFocus);
            
            if (e.shiftKey && currentIndex === 0) {
                e.preventDefault();
                focusableElements[focusableElements.length - 1].focus();
            } else if (!e.shiftKey && currentIndex === focusableElements.length - 1) {
                e.preventDefault();
                focusableElements[0].focus();
            }
        }
        
        // Space bar activation for custom buttons
        if (e.key === ' ' && e.target.classList.contains('experience-btn')) {
            e.preventDefault();
            e.target.click();
        }
    });
    
    // Update live region on scene changes
    document.querySelectorAll('.scene-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            const sceneNumber = dot.dataset.scene;
            const sceneTitle = document.querySelector(`#scene-${sceneNumber} .scene-title h2, #screen${sceneNumber}-title`);
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
    
    // Add ARIA labels and descriptions
    addAriaEnhancements();
    
    // Focus management for interactive elements
    initFocusManagement();
    
    // High contrast mode detection
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }
});

function addAriaEnhancements() {
    // Add ARIA labels to interactive elements
    const experienceBtns = document.querySelectorAll('.experience-btn');
    experienceBtns.forEach(btn => {
        const experience = btn.dataset.experience;
        btn.setAttribute('aria-label', `Switch to ${experience} experience view`);
        btn.setAttribute('role', 'button');
    });
    
    // Add ARIA descriptions to workflow steps
    const workflowSteps = document.querySelectorAll('.workflow-step, .timeline-step');
    workflowSteps.forEach((step, index) => {
        step.setAttribute('role', 'listitem');
        step.setAttribute('aria-label', `Workflow step ${index + 1}`);
    });
    
    // Add ARIA labels to progress bars
    const progressBars = document.querySelectorAll('.progress-bar, .stress-bar');
    progressBars.forEach(bar => {
        const label = bar.closest('.metric, .impact-metric')?.querySelector('.metric-label, .impact-label')?.textContent;
        if (label) {
            bar.setAttribute('role', 'progressbar');
            bar.setAttribute('aria-label', label);
            
            const fill = bar.querySelector('.progress-fill, .stress-fill');
            if (fill) {
                const value = fill.style.width || '0%';
                bar.setAttribute('aria-valuenow', parseInt(value));
                bar.setAttribute('aria-valuemin', '0');
                bar.setAttribute('aria-valuemax', '100');
            }
        }
    });
}

function initFocusManagement() {
    // Skip links for better navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--vmware-blue);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        border-radius: 4px;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const mainContent = document.querySelector('.pov-container, .screen-content');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('role', 'main');
    }
}

// Interactive Typing Simulation for VNLI Queries
function initTypingSimulation() {
    const typingElements = document.querySelectorAll('.typing-indicator, .user-query, .query-display');
    
    // Sample queries for different scenarios
    const sampleQueries = {
        health: [
            "Show me VM health status for all servers with high CPU or memory usage",
            "Which systems need attention right now?",
            "Give me a performance overview of the production cluster"
        ],
        incident: [
            "What's causing the high CPU usage in VM-PROD-WEB-03?",
            "Analyze the root cause of the current performance alert",
            "How do I fix this memory leak without downtime?"
        ],
        capacity: [
            "I need to plan capacity for Q1 2024. Show me current utilization trends and predict what we'll need.",
            "What hardware should we purchase for next quarter?",
            "Analyze our growth patterns and recommend infrastructure scaling"
        ],
        compliance: [
            "Generate a comprehensive SOX compliance report covering security configurations, access controls, patch management, and data encryption for the past 12 months.",
            "Show me all compliance violations and remediation steps",
            "Create an audit-ready security assessment report"
        ],
        summary: [
            "Generate today's end-of-day status summary for night shift handoff including system health, ongoing issues, and recommended actions.",
            "Create a handoff report with all critical information",
            "Summarize today's activities and tomorrow's priorities"
        ]
    };
    
    function typeText(element, text, speed = 50, callback = null) {
        if (!element) return;
        
        let index = 0;
        element.textContent = '';
        element.classList.add('typing-active');
        
        const typeInterval = setInterval(() => {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
            } else {
                clearInterval(typeInterval);
                element.classList.remove('typing-active');
                element.classList.add('typing-complete');
                if (callback) callback();
            }
        }, speed);
        
        return typeInterval;
    }
    
    function simulateVNLITyping() {
        // Find active screen and determine query type
        const activeScreen = document.querySelector('.screen.active, .experience-view.vnli-view.active');
        if (!activeScreen) return;
        
        let queryType = 'health'; // default
        if (activeScreen.querySelector('#screen2-title, .incident-timeline')) queryType = 'incident';
        else if (activeScreen.querySelector('#screen3-title, .planning-process')) queryType = 'capacity';
        else if (activeScreen.querySelector('#screen4-title, .compliance-process')) queryType = 'compliance';
        else if (activeScreen.querySelector('#screen5-title, .eod-process')) queryType = 'summary';
        
        const queries = sampleQueries[queryType] || sampleQueries.health;
        const randomQuery = queries[Math.floor(Math.random() * queries.length)];
        
        // Find typing elements in the active view
        const userMessages = activeScreen.querySelectorAll('.vnli-view .user-message .message-content, .vnli-view .user-query');
        
        userMessages.forEach((element, index) => {
            if (element.textContent.trim() === '' || element.classList.contains('demo-query')) {
                setTimeout(() => {
                    typeText(element, randomQuery, 30, () => {
                        // Trigger AI response after user query
                        setTimeout(() => {
                            triggerAIResponse(element);
                        }, 500);
                    });
                }, index * 2000);
            }
        });
    }
    
    function triggerAIResponse(userElement) {
        const aiMessage = userElement.closest('.conversation-flow, .chat-messages')?.querySelector('.ai-message');
        if (aiMessage) {
            aiMessage.style.animation = 'fadeInUp 0.8s ease-out forwards';
            
            // Animate typing indicator
            const typingIndicator = aiMessage.querySelector('.typing-indicator');
            if (typingIndicator) {
                typeText(typingIndicator, 'VNLI is analyzing...', 100, () => {
                    setTimeout(() => {
                        typingIndicator.style.display = 'none';
                        const analysisResult = aiMessage.querySelector('.analysis-result, .analysis-complete, .message-content > *:not(.typing-indicator)');
                        if (analysisResult) {
                            analysisResult.style.animation = 'fadeInUp 0.6s ease-out forwards';
                        }
                    }, 1000);
                });
            }
        }
    }
    
    // Auto-trigger typing simulation when VNLI experience is selected
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('vnli-btn') || e.target.closest('.vnli-btn')) {
            setTimeout(simulateVNLITyping, 800);
        }
    });
    
    // Trigger on page load for demo
    setTimeout(() => {
        const vnliView = document.querySelector('.vnli-view.active');
        if (vnliView) {
            simulateVNLITyping();
        }
    }, 2000);
}

// Interactive Elements and Animations
function initInteractiveElements() {
    // Interactive query examples
    const queryExamples = document.querySelectorAll('.query-example, .example-query');
    queryExamples.forEach(example => {
        example.addEventListener('click', () => {
            const queryText = example.textContent.trim();
            typeQueryIntoInterface(queryText);
        });
    });
    
    // Interactive action buttons
    const actionButtons = document.querySelectorAll('.action-btn, .remediation-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            animateButtonAction(button);
        });
    });
    
    // Interactive metric cards
    const metricCards = document.querySelectorAll('.metric-card, .impact-metric');
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            animateMetricCard(card);
        });
    });
    
    // Progress bar animations
    const progressBars = document.querySelectorAll('.progress-bar, .stress-bar');
    progressBars.forEach(bar => {
        animateProgressBar(bar);
    });
}

function typeQueryIntoInterface(query) {
    const searchInput = document.querySelector('.search-input, .query-input');
    if (searchInput) {
        searchInput.focus();
        typeText(searchInput, query, 50, () => {
            // Simulate enter key press
            const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
            searchInput.dispatchEvent(enterEvent);
        });
    }
}

function animateButtonAction(button) {
    button.classList.add('action-triggered');
    button.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        button.style.transform = 'scale(1)';
        button.classList.remove('action-triggered');
        
        // Show success feedback
        showActionFeedback(button);
    }, 150);
}

function showActionFeedback(button) {
    const feedback = document.createElement('div');
    feedback.className = 'action-feedback';
    feedback.textContent = '✓ Action Completed';
    feedback.style.cssText = `
        position: absolute;
        background: var(--success-green);
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        animation: fadeInOut 2s ease-out forwards;
        pointer-events: none;
    `;
    
    const rect = button.getBoundingClientRect();
    feedback.style.left = rect.left + 'px';
    feedback.style.top = (rect.top - 40) + 'px';
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}

function animateMetricCard(card) {
    card.style.transform = 'translateY(-4px) scale(1.02)';
    card.style.boxShadow = 'var(--glass-shadow-strong)';
    
    setTimeout(() => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = 'var(--glass-shadow)';
    }, 200);
}

function animateProgressBar(bar) {
    const fill = bar.querySelector('.progress-fill, .stress-fill, .bar-fill');
    if (fill) {
        const targetWidth = fill.style.width || fill.getAttribute('data-width') || '0%';
        fill.style.width = '0%';
        fill.style.transition = 'width 1.5s ease-out';
        
        setTimeout(() => {
            fill.style.width = targetWidth;
        }, 100);
    }
}

// Real-time Cost/Time Savings Calculator
function initSavingsCalculator() {
    const calculatorData = {
        dailyHealthCheck: { traditional: 30, vnli: 2, frequency: 250 },
        incidentResponse: { traditional: 255, vnli: 15, frequency: 25 },
        capacityPlanning: { traditional: 160, vnli: 1, frequency: 4 },
        complianceReporting: { traditional: 32, vnli: 0.17, frequency: 12 },
        eodSummary: { traditional: 45, vnli: 5, frequency: 250 }
    };
    
    const hourlyRate = 75; // Administrator hourly rate
    
    function calculateSavings() {
        let totalTraditionalHours = 0;
        let totalVnliHours = 0;
        
        Object.values(calculatorData).forEach(task => {
            totalTraditionalHours += (task.traditional / 60) * task.frequency;
            totalVnliHours += (task.vnli / 60) * task.frequency;
        });
        
        const hoursSaved = totalTraditionalHours - totalVnliHours;
        const costSavings = hoursSaved * hourlyRate;
        const percentageSaved = ((hoursSaved / totalTraditionalHours) * 100).toFixed(1);
        
        return {
            hoursSaved: Math.round(hoursSaved),
            costSavings: Math.round(costSavings),
            percentageSaved: percentageSaved,
            traditionalHours: Math.round(totalTraditionalHours),
            vnliHours: Math.round(totalVnliHours)
        };
    }
    
    function updateSavingsDisplay() {
        const savings = calculateSavings();
        
        // Update savings displays throughout the demo
        const savingsElements = document.querySelectorAll('.savings-value, .annual-savings');
        savingsElements.forEach(element => {
            if (element.textContent.includes('$')) {
                animateNumber(element, savings.costSavings, '$', ',');
            } else if (element.textContent.includes('hours')) {
                animateNumber(element, savings.hoursSaved, '', ' hours');
            } else if (element.textContent.includes('%')) {
                animateNumber(element, savings.percentageSaved, '', '%');
            }
        });
    }
    
    function animateNumber(element, targetValue, prefix = '', suffix = '') {
        const duration = 2000;
        const steps = 60;
        const stepValue = targetValue / steps;
        const stepTime = duration / steps;
        
        let currentValue = 0;
        const timer = setInterval(() => {
            currentValue += stepValue;
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            
            let displayValue = Math.round(currentValue);
            if (prefix === '$' && displayValue >= 1000) {
                displayValue = displayValue.toLocaleString();
            }
            
            element.textContent = prefix + displayValue + suffix;
        }, stepTime);
    }
    
    // Initialize savings display
    setTimeout(updateSavingsDisplay, 1000);
}

// Enhanced Analytics Tracking
function trackDetailedInteraction(action, category, value = null) {
    const timestamp = new Date().toISOString();
    const sessionData = {
        action: action,
        category: category,
        value: value,
        timestamp: timestamp,
        userAgent: navigator.userAgent,
        viewport: `${window.innerWidth}x${window.innerHeight}`
    };
    
    console.log('Detailed Analytics:', sessionData);
    
    // In production, send to analytics service
    // analytics.track(action, sessionData);
}

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
    trackInteraction: trackInteraction,
    startTypingDemo: () => {
        initTypingSimulation();
    },
    calculateSavings: () => {
        initSavingsCalculator();
    }
};