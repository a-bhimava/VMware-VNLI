/**
 * Main Application Controller for VNLI Prototype
 * Initializes the application and coordinates all modules
 */

import { CONFIG } from '../utils/constants.js';
import { logger, storage, handleError, performance } from '../utils/helpers.js';
import navigationManager from './navigation.js';
import animationController from './animations.js';

class VNLIApplication {
    constructor() {
        this.isInitialized = false;
        this.modules = new Map();
        this.eventListeners = new Map();
        
        this.init();
    }
    
    async init() {
        try {
            performance.start('app-init');
            logger.info('Initializing VNLI Prototype Application');
            
            // Show loading overlay
            this.showLoadingOverlay();
            
            // Initialize core modules
            await this.initializeModules();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Initialize UI
            await this.initializeUI();
            
            // Hide loading overlay
            this.hideLoadingOverlay();
            
            this.isInitialized = true;
            logger.info('Application initialized successfully');
            
            performance.end('app-init');
            
        } catch (error) {
            handleError(error, 'Application initialization');
            this.showErrorMessage('Failed to initialize application. Please refresh the page.');
        }
    }
    
    async initializeModules() {
        // Register modules
        this.modules.set('navigation', navigationManager);
        this.modules.set('animations', animationController);
        
        // Initialize each module
        for (const [name, module] of this.modules) {
            try {
                if (module.init && typeof module.init === 'function') {
                    await module.init();
                }
                logger.info(`Module ${name} initialized`);
            } catch (error) {
                logger.error(`Failed to initialize module ${name}`, error);
                throw error;
            }
        }
    }
    
    setupEventListeners() {
        // Screen change events
        document.addEventListener(CONFIG.EVENTS.SCREEN_CHANGE, (e) => {
            this.handleScreenChange(e.detail);
        });
        
        // Animation events
        document.addEventListener(CONFIG.EVENTS.ANIMATION_START, (e) => {
            logger.debug('Animation started', e.detail);
        });
        
        document.addEventListener(CONFIG.EVENTS.ANIMATION_END, (e) => {
            logger.debug('Animation ended', e.detail);
        });
        
        // Query submission events
        document.addEventListener(CONFIG.EVENTS.QUERY_SUBMIT, (e) => {
            this.handleQuerySubmit(e.detail);
        });
        
        // Data load events
        document.addEventListener(CONFIG.EVENTS.DATA_LOAD, (e) => {
            this.handleDataLoad(e.detail);
        });
        
        // Error events
        document.addEventListener(CONFIG.EVENTS.ERROR, (e) => {
            this.handleError(e.detail);
        });
        
        // Window events
        window.addEventListener('beforeunload', () => {
            this.handleBeforeUnload();
        });
        
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
        
        // Touch events for mobile
        if ('ontouchstart' in window) {
            this.setupTouchEvents();
        }
    }
    
    async initializeUI() {
        // Initialize screen-specific UI elements
        this.initializeScreenUI();
        
        // Setup interactive elements
        this.setupInteractiveElements();
        
        // Initialize accessibility features
        this.initializeAccessibility();
        
        // Setup performance monitoring
        this.setupPerformanceMonitoring();
    }
    
    initializeScreenUI() {
        // Add screen-specific initialization based on current screen
        const currentScreen = navigationManager.currentScreen;
        this.initializeScreenSpecificUI(currentScreen);
    }
    
    initializeScreenSpecificUI(screenNumber) {
        switch (screenNumber) {
            case 1:
                this.initializeScreen1UI();
                break;
            case 2:
                this.initializeScreen2UI();
                break;
            case 3:
                this.initializeScreen3UI();
                break;
            case 4:
                this.initializeScreen4UI();
                break;
            case 5:
                this.initializeScreen5UI();
                break;
            case 6:
                this.initializeScreen6UI();
                break;
            case 7:
                this.initializeScreen7UI();
                break;
            case 8:
                this.initializeScreen8UI();
                break;
        }
    }
    
    initializeScreen1UI() {
        // Terminal animation setup
        const terminalLines = document.querySelectorAll('.terminal-line');
        terminalLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateX(-20px)';
        });
        
        // Admin character animation
        const adminCharacter = document.querySelector('.admin-character');
        if (adminCharacter) {
            adminCharacter.style.animation = 'float 3s ease-in-out infinite';
        }
    }
    
    initializeScreen2UI() {
        // Workflow step animations
        const workflowSteps = document.querySelectorAll('.workflow-step');
        workflowSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(50px)';
        });
        
        // Cost overlay animation
        const costOverlay = document.querySelector('.cost-overlay');
        if (costOverlay) {
            costOverlay.style.animation = 'pulse 2s ease-in-out infinite';
        }
    }
    
    initializeScreen3UI() {
        // Search bar setup
        const searchInput = document.querySelector('.search-input');
        const searchButton = document.querySelector('.search-button');
        
        if (searchInput) {
            searchInput.addEventListener('focus', () => {
                searchInput.parentElement.classList.add('focused');
            });
            
            searchInput.addEventListener('blur', () => {
                searchInput.parentElement.classList.remove('focused');
            });
        }
        
        if (searchButton) {
            searchButton.addEventListener('click', () => {
                this.handleSearchSubmit();
            });
        }
        
        // Example query interactions
        const queryExamples = document.querySelectorAll('.query-example');
        queryExamples.forEach(example => {
            example.addEventListener('click', () => {
                const queryText = example.querySelector('.query-text').textContent;
                this.fillSearchInput(queryText);
            });
        });
    }
    
    initializeScreen4UI() {
        // AI processing animation
        const processingSteps = document.querySelectorAll('.processing-step');
        processingSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'scale(0.8)';
        });
        
        // Start processing animation
        this.startAIProcessingAnimation();
    }
    
    initializeScreen5UI() {
        // Chart animations
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => {
            bar.style.height = '0%';
        });
        
        // Start chart animation
        this.startChartAnimation();
    }
    
    initializeScreen6UI() {
        // AI insights animation
        const insights = document.querySelectorAll('.prediction-item');
        insights.forEach(insight => {
            insight.style.opacity = '0';
            insight.style.transform = 'translateY(20px)';
        });
        
        // Start insights animation
        this.startInsightsAnimation();
    }
    
    initializeScreen7UI() {
        // Metrics animation
        const metrics = document.querySelectorAll('.metric-card');
        metrics.forEach(metric => {
            metric.style.opacity = '0';
            metric.style.transform = 'translateY(30px)';
        });
        
        // Start metrics animation
        this.startMetricsAnimation();
    }
    
    initializeScreen8UI() {
        // Final screen animation
        const elements = document.querySelectorAll('.glassmorphic-card');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'scale(0.9)';
        });
        
        // Start final animation
        this.startFinalAnimation();
    }
    
    setupInteractiveElements() {
        // Button interactions
        const buttons = document.querySelectorAll('.glassmorphic-button, .action-btn, .remediation-btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleButtonClick(e);
            });
        });
        
        // Card interactions
        const cards = document.querySelectorAll('.glassmorphic-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover-lift');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover-lift');
            });
        });
    }
    
    initializeAccessibility() {
        // Skip links
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(skipLink.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView();
                }
            });
        }
        
        // ARIA labels and roles
        this.setupARIA();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
    }
    
    setupARIA() {
        // Add ARIA labels to interactive elements
        const interactiveElements = document.querySelectorAll('button, input, select, textarea');
        interactiveElements.forEach(element => {
            if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
                const label = element.textContent || element.placeholder || 'Interactive element';
                element.setAttribute('aria-label', label);
            }
        });
    }
    
    setupKeyboardNavigation() {
        // Tab navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    setupPerformanceMonitoring() {
        if (!CONFIG.DEV_CONFIG.PERFORMANCE_MONITORING) return;
        
        // Monitor performance
        const observer = new PerformanceObserver((list) => {
            list.getEntries().forEach(entry => {
                if (entry.entryType === 'measure') {
                    logger.debug(`Performance: ${entry.name} - ${entry.duration.toFixed(2)}ms`);
                }
            });
        });
        
        observer.observe({ entryTypes: ['measure'] });
    }
    
    setupTouchEvents() {
        // Touch gestures for mobile
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Swipe detection
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    navigationManager.nextScreen();
                } else {
                    navigationManager.previousScreen();
                }
            }
        });
    }
    
    // Event handlers
    handleScreenChange(detail) {
        const { screenNumber, previousScreen } = detail;
        logger.info(`Screen changed from ${previousScreen} to ${screenNumber}`);
        
        // Update UI for new screen
        this.initializeScreenSpecificUI(screenNumber);
        
        // Update analytics
        this.trackScreenView(screenNumber);
    }
    
    handleQuerySubmit(detail) {
        logger.info('Query submitted', detail);
        // Handle query submission logic
    }
    
    handleDataLoad(detail) {
        logger.info('Data loaded', detail);
        // Handle data load completion
    }
    
    handleError(detail) {
        logger.error('Application error', detail);
        this.showErrorMessage(detail.message || 'An error occurred');
    }
    
    handleButtonClick(e) {
        const button = e.target;
        const action = button.dataset.action;
        
        if (action) {
            this.executeAction(action, button);
        }
        
        // Add ripple effect
        this.addRippleEffect(button, e);
    }
    
    executeAction(action, element) {
        switch (action) {
            case 'next-screen':
                navigationManager.nextScreen();
                break;
            case 'previous-screen':
                navigationManager.previousScreen();
                break;
            case 'go-to-screen':
                const screenNumber = parseInt(element.dataset.screen);
                navigationManager.goToScreen(screenNumber);
                break;
            case 'search':
                this.handleSearchSubmit();
                break;
            default:
                logger.warn(`Unknown action: ${action}`);
        }
    }
    
    addRippleEffect(element, event) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    handleSearchSubmit() {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            const query = searchInput.value.trim();
            if (query) {
                this.processQuery(query);
            }
        }
    }
    
    fillSearchInput(text) {
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.value = text;
            searchInput.focus();
        }
    }
    
    processQuery(query) {
        logger.info('Processing query', query);
        // Simulate query processing
        this.showQueryProcessing(query);
    }
    
    showQueryProcessing(query) {
        // Show processing animation
        const processingOverlay = document.createElement('div');
        processingOverlay.className = 'query-processing glassmorphic-card';
        processingOverlay.innerHTML = `
            <div class="processing-content">
                <div class="loading-spinner"></div>
                <h3>Processing Query</h3>
                <p>"${query}"</p>
                <div class="processing-steps">
                    <div class="step">Understanding intent...</div>
                    <div class="step">Translating to API...</div>
                    <div class="step">Validating safety...</div>
                </div>
            </div>
        `;
        
        document.body.appendChild(processingOverlay);
        
        // Remove after 3 seconds
        setTimeout(() => {
            processingOverlay.remove();
        }, 3000);
    }
    
    // Animation methods
    startAIProcessingAnimation() {
        const steps = document.querySelectorAll('.processing-step');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.style.opacity = '1';
                step.style.transform = 'scale(1)';
            }, index * 1000);
        });
    }
    
    startChartAnimation() {
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.height = bar.dataset.height || '100%';
            }, index * 200);
        });
    }
    
    startInsightsAnimation() {
        const insights = document.querySelectorAll('.prediction-item');
        insights.forEach((insight, index) => {
            setTimeout(() => {
                insight.style.opacity = '1';
                insight.style.transform = 'translateY(0)';
            }, index * 400);
        });
    }
    
    startMetricsAnimation() {
        const metrics = document.querySelectorAll('.metric-card');
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                metric.style.opacity = '1';
                metric.style.transform = 'translateY(0)';
            }, index * 300);
        });
    }
    
    startFinalAnimation() {
        const elements = document.querySelectorAll('.glassmorphic-card');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'scale(1)';
            }, index * 200);
        });
    }
    
    // Utility methods
    showLoadingOverlay() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.remove('hidden');
        }
    }
    
    hideLoadingOverlay() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }
    
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message glassmorphic-card';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            background: rgba(220, 53, 69, 0.9);
            color: white;
            padding: 1rem;
            border-radius: 8px;
            animation: slideInNotification 0.3s ease-out;
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    trackScreenView(screenNumber) {
        // Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', 'screen_view', {
                screen_name: `Screen ${screenNumber}`,
                screen_class: 'VNLI Prototype'
            });
        }
    }
    
    handleBeforeUnload() {
        // Save current state
        storage.set(CONFIG.STORAGE_KEYS.CURRENT_SCREEN, navigationManager.currentScreen);
    }
    
    handleResize() {
        // Handle window resize
        logger.debug('Window resized');
    }
    
    handleKeyboardShortcuts(e) {
        // Global keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                    e.preventDefault();
                    navigationManager.goToScreen(parseInt(e.key));
                    break;
            }
        }
    }
    
    debounce(func, wait) {
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
    
    // Public API
    getModule(name) {
        return this.modules.get(name);
    }
    
    isReady() {
        return this.isInitialized;
    }
    
    destroy() {
        // Cleanup
        this.modules.forEach(module => {
            if (module.destroy && typeof module.destroy === 'function') {
                module.destroy();
            }
        });
        
        this.modules.clear();
        this.eventListeners.clear();
    }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.vnliApp = new VNLIApplication();
});

// Export for external use
export default VNLIApplication;
