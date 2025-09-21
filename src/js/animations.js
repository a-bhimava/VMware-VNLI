/**
 * Animation Controller for VNLI Prototype
 * Handles all animations, transitions, and visual effects
 */

import { CONFIG } from '../utils/constants.js';
import { debounce, prefersReducedMotion, logger } from '../utils/helpers.js';

class AnimationController {
    constructor() {
        this.animations = new Map();
        this.isReducedMotion = prefersReducedMotion();
        this.animationQueue = [];
        this.isProcessingQueue = false;
        
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
        this.setupAnimationQueue();
        this.setupReducedMotionListener();
        
        // Initialize screen-specific animations
        this.initializeScreenAnimations();
    }
    
    setupIntersectionObserver() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, options);
        
        // Observe all elements with animation classes
        this.observeAnimatedElements();
    }
    
    observeAnimatedElements() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .stagger-item, .card-float');
        animatedElements.forEach(element => {
            this.observer.observe(element);
        });
    }
    
    triggerAnimation(element) {
        if (this.isReducedMotion) return;
        
        const animationType = this.getAnimationType(element);
        if (animationType) {
            this.playAnimation(element, animationType);
        }
    }
    
    getAnimationType(element) {
        if (element.classList.contains('animate-on-scroll')) return 'fadeInUp';
        if (element.classList.contains('stagger-item')) return 'stagger';
        if (element.classList.contains('card-float')) return 'float';
        return null;
    }
    
    playAnimation(element, type) {
        switch (type) {
            case 'fadeInUp':
                this.fadeInUp(element);
                break;
            case 'stagger':
                this.staggerAnimation(element);
                break;
            case 'float':
                this.floatAnimation(element);
                break;
        }
    }
    
    fadeInUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
    
    staggerAnimation(element) {
        const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
        
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px) scale(0.9)';
        element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }, delay);
    }
    
    floatAnimation(element) {
        if (this.isReducedMotion) return;
        
        element.style.animation = 'cardFloat 3s ease-in-out infinite';
    }
    
    setupAnimationQueue() {
        // Process animation queue
        setInterval(() => {
            if (this.animationQueue.length > 0 && !this.isProcessingQueue) {
                this.processAnimationQueue();
            }
        }, 100);
    }
    
    processAnimationQueue() {
        this.isProcessingQueue = true;
        
        while (this.animationQueue.length > 0) {
            const animation = this.animationQueue.shift();
            this.executeAnimation(animation);
        }
        
        this.isProcessingQueue = false;
    }
    
    executeAnimation(animation) {
        const { element, type, options = {} } = animation;
        
        if (!element || !element.isConnected) return;
        
        switch (type) {
            case 'fadeIn':
                this.fadeIn(element, options);
                break;
            case 'fadeOut':
                this.fadeOut(element, options);
                break;
            case 'slideIn':
                this.slideIn(element, options);
                break;
            case 'slideOut':
                this.slideOut(element, options);
                break;
            case 'scaleIn':
                this.scaleIn(element, options);
                break;
            case 'scaleOut':
                this.scaleOut(element, options);
                break;
            case 'typing':
                this.typingAnimation(element, options);
                break;
            case 'progress':
                this.progressAnimation(element, options);
                break;
            case 'chart':
                this.chartAnimation(element, options);
                break;
        }
    }
    
    fadeIn(element, options = {}) {
        const duration = options.duration || 300;
        const delay = options.delay || 0;
        
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.opacity = '1';
        }, delay);
    }
    
    fadeOut(element, options = {}) {
        const duration = options.duration || 300;
        const delay = options.delay || 0;
        
        element.style.transition = `opacity ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.opacity = '0';
        }, delay);
    }
    
    slideIn(element, options = {}) {
        const direction = options.direction || 'right';
        const duration = options.duration || 400;
        const delay = options.delay || 0;
        
        const transforms = {
            right: 'translateX(100px)',
            left: 'translateX(-100px)',
            up: 'translateY(-50px)',
            down: 'translateY(50px)'
        };
        
        element.style.opacity = '0';
        element.style.transform = transforms[direction];
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translate(0, 0)';
        }, delay);
    }
    
    slideOut(element, options = {}) {
        const direction = options.direction || 'right';
        const duration = options.duration || 400;
        const delay = options.delay || 0;
        
        const transforms = {
            right: 'translateX(100px)',
            left: 'translateX(-100px)',
            up: 'translateY(-50px)',
            down: 'translateY(50px)'
        };
        
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = transforms[direction];
        }, delay);
    }
    
    scaleIn(element, options = {}) {
        const duration = options.duration || 350;
        const delay = options.delay || 0;
        const scale = options.scale || 0.9;
        
        element.style.opacity = '0';
        element.style.transform = `scale(${scale})`;
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        }, delay);
    }
    
    scaleOut(element, options = {}) {
        const duration = options.duration || 350;
        const delay = options.delay || 0;
        const scale = options.scale || 0.9;
        
        element.style.transition = `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`;
        
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = `scale(${scale})`;
        }, delay);
    }
    
    typingAnimation(element, options = {}) {
        const text = options.text || element.textContent;
        const speed = options.speed || 50;
        const delay = options.delay || 0;
        
        element.textContent = '';
        element.style.borderRight = '2px solid var(--vmware-blue)';
        
        setTimeout(() => {
            let i = 0;
            const timer = setInterval(() => {
                element.textContent += text.charAt(i);
                i++;
                
                if (i >= text.length) {
                    clearInterval(timer);
                    element.style.borderRight = 'none';
                }
            }, speed);
        }, delay);
    }
    
    progressAnimation(element, options = {}) {
        const target = options.target || 100;
        const duration = options.duration || 2000;
        const delay = options.delay || 0;
        
        const progressBar = element.querySelector('.progress-fill');
        if (!progressBar) return;
        
        setTimeout(() => {
            progressBar.style.width = '0%';
            progressBar.style.transition = `width ${duration}ms ease-out`;
            
            requestAnimationFrame(() => {
                progressBar.style.width = `${target}%`;
            });
        }, delay);
    }
    
    chartAnimation(element, options = {}) {
        const bars = element.querySelectorAll('.bar');
        const delay = options.delay || 0;
        const stagger = options.stagger || 200;
        
        setTimeout(() => {
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.classList.add('bar-grow');
                }, index * stagger);
            });
        }, delay);
    }
    
    // Screen-specific animation methods
    initializeScreenAnimations() {
        // Terminal typing animation
        this.setupTerminalAnimations();
        
        // Workflow step animations
        this.setupWorkflowAnimations();
        
        // AI processing animations
        this.setupAIProcessingAnimations();
        
        // Chart and data visualizations
        this.setupChartAnimations();
        
        // Loading animations
        this.setupLoadingAnimations();
    }
    
    setupTerminalAnimations() {
        const terminalLines = document.querySelectorAll('.terminal-line');
        terminalLines.forEach((line, index) => {
            this.addToQueue({
                element: line,
                type: 'fadeIn',
                options: { delay: index * 200 }
            });
        });
    }
    
    setupWorkflowAnimations() {
        const workflowSteps = document.querySelectorAll('.workflow-step');
        workflowSteps.forEach((step, index) => {
            this.addToQueue({
                element: step,
                type: 'slideIn',
                options: { 
                    direction: 'right',
                    delay: index * 500 
                }
            });
        });
    }
    
    setupAIProcessingAnimations() {
        const processingSteps = document.querySelectorAll('.processing-step');
        processingSteps.forEach((step, index) => {
            this.addToQueue({
                element: step,
                type: 'scaleIn',
                options: { 
                    delay: index * 1000,
                    scale: 0.8 
                }
            });
        });
    }
    
    setupChartAnimations() {
        const charts = document.querySelectorAll('.chart-container');
        charts.forEach(chart => {
            this.addToQueue({
                element: chart,
                type: 'chart',
                options: { delay: 500 }
            });
        });
    }
    
    setupLoadingAnimations() {
        const loadingElements = document.querySelectorAll('.loading-spinner');
        loadingElements.forEach(element => {
            element.style.animation = 'spin 1s linear infinite';
        });
    }
    
    addToQueue(animation) {
        this.animationQueue.push(animation);
    }
    
    // Public methods for external use
    animateElement(element, type, options = {}) {
        if (this.isReducedMotion) {
            // Apply final state immediately for reduced motion
            element.style.opacity = '1';
            element.style.transform = 'none';
            return;
        }
        
        this.addToQueue({ element, type, options });
    }
    
    animateScreenTransition(fromScreen, toScreen) {
        if (this.isReducedMotion) return;
        
        // Add screen transition animations
        this.addToQueue({
            element: fromScreen,
            type: 'slideOut',
            options: { direction: 'left', duration: 300 }
        });
        
        this.addToQueue({
            element: toScreen,
            type: 'slideIn',
            options: { direction: 'right', duration: 300, delay: 150 }
        });
    }
    
    setupReducedMotionListener() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        mediaQuery.addEventListener('change', (e) => {
            this.isReducedMotion = e.matches;
            
            if (this.isReducedMotion) {
                // Disable all animations
                this.disableAllAnimations();
            } else {
                // Re-enable animations
                this.enableAllAnimations();
            }
        });
    }
    
    disableAllAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    enableAllAnimations() {
        const style = document.querySelector('style[data-reduced-motion]');
        if (style) {
            style.remove();
        }
    }
    
    // Utility methods
    pauseAnimation(element) {
        element.style.animationPlayState = 'paused';
    }
    
    resumeAnimation(element) {
        element.style.animationPlayState = 'running';
    }
    
    stopAnimation(element) {
        element.style.animation = 'none';
    }
    
    // Cleanup
    destroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
        this.animationQueue = [];
        this.animations.clear();
    }
}

// Export singleton instance
export const animationController = new AnimationController();
export default animationController;
