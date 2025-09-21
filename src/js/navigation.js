/**
 * Navigation Module for VNLI Prototype
 * Handles screen navigation, progress tracking, and user interactions
 */

import { CONFIG } from '../utils/constants.js';
import { debounce, storage, logger } from '../utils/helpers.js';

class NavigationManager {
    constructor() {
        this.currentScreen = 1;
        this.totalScreens = CONFIG.SCREEN_CONFIG.TOTAL_SCREENS;
        this.isTransitioning = false;
        this.screenContainer = null;
        this.navigation = null;
        this.progressIndicator = null;
        
        this.init();
    }
    
    init() {
        this.screenContainer = document.getElementById('screen-container');
        this.navigation = document.getElementById('main-navigation');
        this.progressIndicator = document.getElementById('progress-indicator');
        
        if (!this.screenContainer) {
            logger.error('Screen container not found');
            return;
        }
        
        this.loadCurrentScreen();
        this.setupEventListeners();
        this.updateProgress();
        this.createNavigation();
        
        // Load saved screen from localStorage
        const savedScreen = storage.get(CONFIG.STORAGE_KEYS.CURRENT_SCREEN, 1);
        if (savedScreen !== this.currentScreen) {
            this.goToScreen(savedScreen, false);
        }
    }
    
    setupEventListeners() {
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isTransitioning) return;
            
            switch (e.key) {
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    this.nextScreen();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousScreen();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToScreen(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToScreen(this.totalScreens);
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.toggleNavigation();
                    break;
            }
        });
        
        // Touch/swipe navigation
        let startX = 0;
        let startY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            if (this.isTransitioning) return;
            
            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Check if horizontal swipe is more significant than vertical
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextScreen();
                } else {
                    this.previousScreen();
                }
            }
        });
        
        // Mouse wheel navigation
        document.addEventListener('wheel', debounce((e) => {
            if (this.isTransitioning) return;
            
            if (e.deltaY > 0) {
                this.nextScreen();
            } else if (e.deltaY < 0) {
                this.previousScreen();
            }
        }, 100));
        
        // Window resize
        window.addEventListener('resize', debounce(() => {
            this.updateProgress();
        }, 250));
    }
    
    createNavigation() {
        if (!this.navigation) return;
        
        const navHTML = `
            <div class="nav-container">
                <a href="#" class="nav-logo">
                    <img src="src/icons/vmware-logo.svg" alt="VMware" class="logo-image">
                    <span>VNLI Prototype</span>
                </a>
                <ul class="nav-menu">
                    ${this.generateNavItems()}
                </ul>
                <div class="nav-controls">
                    <button class="nav-toggle" aria-label="Toggle navigation">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        `;
        
        this.navigation.innerHTML = navHTML;
        
        // Add click handlers for nav items
        this.navigation.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const screenNumber = parseInt(link.dataset.screen);
                this.goToScreen(screenNumber);
            });
        });
        
        // Add toggle handler
        const toggle = this.navigation.querySelector('.nav-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => this.toggleNavigation());
        }
    }
    
    generateNavItems() {
        return CONFIG.SCREEN_DATA.map((screen, index) => {
            const screenNumber = index + 1;
            const isActive = screenNumber === this.currentScreen;
            const isCompleted = screenNumber < this.currentScreen;
            
            return `
                <li class="nav-item">
                    <a href="#" 
                       class="nav-link ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}"
                       data-screen="${screenNumber}"
                       aria-label="Go to ${screen.title}">
                        <span class="nav-icon">${screen.icon || '📄'}</span>
                        <span class="nav-text">${screen.title}</span>
                    </a>
                </li>
            `;
        }).join('');
    }
    
    async goToScreen(screenNumber, animate = true) {
        if (screenNumber < 1 || screenNumber > this.totalScreens) {
            logger.warn(`Invalid screen number: ${screenNumber}`);
            return;
        }
        
        if (this.isTransitioning) {
            logger.warn('Navigation already in progress');
            return;
        }
        
        if (screenNumber === this.currentScreen) return;
        
        this.isTransitioning = true;
        logger.info(`Navigating to screen ${screenNumber}`);
        
        try {
            // Hide current screen
            if (animate) {
                await this.hideCurrentScreen();
            }
            
            // Load new screen
            await this.loadScreen(screenNumber);
            
            // Update state
            this.currentScreen = screenNumber;
            storage.set(CONFIG.STORAGE_KEYS.CURRENT_SCREEN, screenNumber);
            
            // Update UI
            this.updateNavigation();
            this.updateProgress();
            
            // Show new screen
            if (animate) {
                await this.showCurrentScreen();
            }
            
            // Emit event
            this.emitScreenChange(screenNumber);
            
        } catch (error) {
            logger.error('Failed to navigate to screen', error);
            this.handleNavigationError(error);
        } finally {
            this.isTransitioning = false;
        }
    }
    
    async loadScreen(screenNumber) {
        const screenPath = `src/screens/screen${screenNumber}.html`;
        
        try {
            const response = await fetch(screenPath);
            if (!response.ok) {
                throw new Error(`Failed to load screen ${screenNumber}: ${response.statusText}`);
            }
            
            const html = await response.text();
            this.screenContainer.innerHTML = html;
            
            // Add screen class for styling
            const screenElement = this.screenContainer.querySelector('.screen');
            if (screenElement) {
                screenElement.classList.add(`screen-${screenNumber}`);
            }
            
            // Initialize screen-specific functionality
            this.initializeScreen(screenNumber);
            
        } catch (error) {
            logger.error(`Error loading screen ${screenNumber}`, error);
            throw error;
        }
    }
    
    initializeScreen(screenNumber) {
        // Screen-specific initialization
        switch (screenNumber) {
            case 1:
                this.initializeScreen1();
                break;
            case 2:
                this.initializeScreen2();
                break;
            case 3:
                this.initializeScreen3();
                break;
            case 4:
                this.initializeScreen4();
                break;
            case 5:
                this.initializeScreen5();
                break;
            case 6:
                this.initializeScreen6();
                break;
            case 7:
                this.initializeScreen7();
                break;
            case 8:
                this.initializeScreen8();
                break;
        }
    }
    
    initializeScreen1() {
        // Terminal animation
        const terminalLines = document.querySelectorAll('.terminal-line');
        terminalLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, index * 200);
        });
    }
    
    initializeScreen2() {
        // Workflow step animations
        const steps = document.querySelectorAll('.workflow-step');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('active');
            }, index * 500);
        });
    }
    
    initializeScreen3() {
        // Search bar focus
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            setTimeout(() => {
                searchInput.focus();
            }, 1000);
        }
        
        // Example query animations
        const examples = document.querySelectorAll('.query-example');
        examples.forEach((example, index) => {
            setTimeout(() => {
                example.classList.add('animate-in');
            }, 1500 + index * 300);
        });
    }
    
    initializeScreen4() {
        // AI processing animation
        const steps = document.querySelectorAll('.processing-step');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.classList.add('active');
            }, index * 1000);
        });
    }
    
    initializeScreen5() {
        // Chart animations
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.classList.add('bar-grow');
            }, index * 200);
        });
    }
    
    initializeScreen6() {
        // AI insights animation
        const insights = document.querySelectorAll('.prediction-item');
        insights.forEach((insight, index) => {
            setTimeout(() => {
                insight.classList.add('animate-in');
            }, index * 400);
        });
    }
    
    initializeScreen7() {
        // Metrics animation
        const metrics = document.querySelectorAll('.metric-card');
        metrics.forEach((metric, index) => {
            setTimeout(() => {
                metric.classList.add('animate-in');
            }, index * 300);
        });
    }
    
    initializeScreen8() {
        // Final screen animation
        const elements = document.querySelectorAll('.glassmorphic-card');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('animate-in');
            }, index * 200);
        });
    }
    
    async hideCurrentScreen() {
        const currentScreen = this.screenContainer.querySelector('.screen');
        if (currentScreen) {
            currentScreen.classList.add('screen-exit');
            await this.waitForAnimation(300);
        }
    }
    
    async showCurrentScreen() {
        const currentScreen = this.screenContainer.querySelector('.screen');
        if (currentScreen) {
            currentScreen.classList.add('screen-enter');
            await this.waitForAnimation(300);
        }
    }
    
    waitForAnimation(duration) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }
    
    nextScreen() {
        if (this.currentScreen < this.totalScreens) {
            this.goToScreen(this.currentScreen + 1);
        }
    }
    
    previousScreen() {
        if (this.currentScreen > 1) {
            this.goToScreen(this.currentScreen - 1);
        }
    }
    
    updateNavigation() {
        const navLinks = this.navigation.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            const screenNumber = index + 1;
            link.classList.toggle('active', screenNumber === this.currentScreen);
            link.classList.toggle('completed', screenNumber < this.currentScreen);
        });
    }
    
    updateProgress() {
        if (!this.progressIndicator) return;
        
        const progressBar = this.progressIndicator.querySelector('.progress-bar');
        const progressText = this.progressIndicator.querySelector('.progress-text');
        
        if (progressBar) {
            const progress = (this.currentScreen / this.totalScreens) * 100;
            progressBar.style.setProperty('--progress-width', `${progress}%`);
        }
        
        if (progressText) {
            progressText.textContent = `Screen ${this.currentScreen} of ${this.totalScreens}`;
        }
    }
    
    toggleNavigation() {
        this.navigation.classList.toggle('nav-open');
    }
    
    emitScreenChange(screenNumber) {
        const event = new CustomEvent(CONFIG.EVENTS.SCREEN_CHANGE, {
            detail: { screenNumber, previousScreen: this.currentScreen }
        });
        document.dispatchEvent(event);
    }
    
    handleNavigationError(error) {
        logger.error('Navigation error', error);
        // Show error message to user
        this.showErrorMessage('Failed to load screen. Please try again.');
    }
    
    showErrorMessage(message) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-notification glassmorphic-card';
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
        
        // Remove after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }
    
    loadCurrentScreen() {
        this.loadScreen(this.currentScreen);
    }
}

// Export singleton instance
export const navigationManager = new NavigationManager();
export default navigationManager;
