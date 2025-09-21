/**
 * Constants and Configuration for VNLI Prototype
 * Centralized configuration for brand colors, timing, and application settings
 */

// VMware Brand Colors
export const BRAND_COLORS = {
    BLUE: '#0072CE',
    BLUE_LIGHT: '#4A9EFF',
    BLUE_DARK: '#0056A3',
    WHITE: '#FFFFFF',
    DARK: '#1C1C1C',
    LIGHT: '#F5F5F5',
    GRAY: '#6C757D',
    GRAY_LIGHT: '#E9ECEF',
    GRAY_DARK: '#495057'
};

// Screen Configuration
export const SCREEN_CONFIG = {
    TOTAL_SCREENS: 8,
    TRANSITION_DURATION: 600,
    LOADING_DELAY: 2000,
    ANIMATION_DELAY: 100
};

// Screen Titles and Descriptions
export const SCREEN_DATA = {
    1: {
        title: "Sarah's Daily Challenge",
        subtitle: "Traditional VMware Management",
        description: "Current state showing administrator frustration with complex tools"
    },
    2: {
        title: "Traditional Workflow Complexity",
        subtitle: "Multi-step process that consumes valuable time",
        description: "Visualization of the complex multi-step process"
    },
    3: {
        title: "The VNLI Solution",
        subtitle: "Natural Language Interface for VMware Management",
        description: "Clean, minimal interface showcasing the solution"
    },
    4: {
        title: "Query in Action",
        subtitle: "Real-time natural language processing",
        description: "Demonstration of AI processing pipeline"
    },
    5: {
        title: "Instant Results Dashboard",
        subtitle: "Comprehensive insights in seconds",
        description: "Results dashboard with metrics and recommendations"
    },
    6: {
        title: "AI-Powered Insights",
        subtitle: "Intelligent recommendations and predictions",
        description: "AI analytics and predictive capabilities"
    },
    7: {
        title: "Enterprise Scale Impact",
        subtitle: "Measurable business value at scale",
        description: "Executive dashboard showing business impact"
    },
    8: {
        title: "Strategic Value Visualization",
        subtitle: "Executive perspective on VNLI transformation",
        description: "Final screen showing ROI and strategic value"
    }
};

// Animation Timing
export const ANIMATION_TIMING = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
    VERY_SLOW: 1000
};

// Query Examples
export const QUERY_EXAMPLES = [
    "Show me VMs using too much CPU",
    "Which hosts need maintenance?",
    "Find storage bottlenecks in production",
    "List all VMs with high memory usage",
    "Show me network performance issues",
    "Which VMs are running out of disk space?",
    "Find VMs with failed backups",
    "Show me security compliance issues"
];

// Mock Data for Dashboards
export const MOCK_DATA = {
    VMS: [
        { name: 'VM-001', cpu: 85, memory: 72, status: 'warning' },
        { name: 'VM-002', cpu: 92, memory: 45, status: 'critical' },
        { name: 'VM-003', cpu: 78, memory: 60, status: 'warning' },
        { name: 'VM-004', cpu: 95, memory: 87, status: 'critical' }
    ],
    METRICS: {
        timeSavings: 75,
        costImpact: 486000,
        productivityGains: 65,
        networkEffect: 5
    },
    ROI: {
        investment: 50000,
        annualSavings: 486000,
        threeYearValue: 1400000,
        netROI: 2800
    }
};

// API Endpoints (for future integration)
export const API_ENDPOINTS = {
    BASE_URL: 'https://api.vmware.com/vnli',
    QUERY: '/query',
    METRICS: '/metrics',
    INSIGHTS: '/insights',
    RECOMMENDATIONS: '/recommendations'
};

// Local Storage Keys
export const STORAGE_KEYS = {
    CURRENT_SCREEN: 'vnli_current_screen',
    USER_PREFERENCES: 'vnli_user_preferences',
    ANIMATION_SETTINGS: 'vnli_animation_settings',
    THEME: 'vnli_theme'
};

// Event Names
export const EVENTS = {
    SCREEN_CHANGE: 'screenChange',
    ANIMATION_START: 'animationStart',
    ANIMATION_END: 'animationEnd',
    QUERY_SUBMIT: 'querySubmit',
    DATA_LOAD: 'dataLoad',
    ERROR: 'error'
};

// Error Messages
export const ERROR_MESSAGES = {
    SCREEN_LOAD_FAILED: 'Failed to load screen content',
    ANIMATION_FAILED: 'Animation failed to complete',
    DATA_LOAD_FAILED: 'Failed to load data',
    NETWORK_ERROR: 'Network connection error',
    INVALID_SCREEN: 'Invalid screen number'
};

// Success Messages
export const SUCCESS_MESSAGES = {
    SCREEN_LOADED: 'Screen loaded successfully',
    ANIMATION_COMPLETE: 'Animation completed',
    DATA_LOADED: 'Data loaded successfully',
    QUERY_PROCESSED: 'Query processed successfully'
};

// Accessibility Settings
export const ACCESSIBILITY = {
    REDUCED_MOTION: 'prefers-reduced-motion',
    HIGH_CONTRAST: 'prefers-contrast',
    DARK_MODE: 'prefers-color-scheme'
};

// Performance Thresholds
export const PERFORMANCE = {
    MAX_LOAD_TIME: 3000,
    MAX_ANIMATION_TIME: 1000,
    MAX_RESPONSE_TIME: 5000,
    MEMORY_LIMIT: 50 * 1024 * 1024 // 50MB
};

// Feature Flags
export const FEATURES = {
    ANIMATIONS: true,
    SOUND_EFFECTS: false,
    KEYBOARD_NAVIGATION: true,
    TOUCH_GESTURES: true,
    VOICE_COMMANDS: false,
    DARK_MODE: true,
    HIGH_CONTRAST: true
};

// Development Settings
export const DEV_CONFIG = {
    DEBUG_MODE: false,
    LOG_LEVEL: 'info', // 'debug', 'info', 'warn', 'error'
    MOCK_DATA: true,
    PERFORMANCE_MONITORING: true
};

// Export all constants as a single object for easy access
export const CONFIG = {
    BRAND_COLORS,
    SCREEN_CONFIG,
    SCREEN_DATA,
    ANIMATION_TIMING,
    QUERY_EXAMPLES,
    MOCK_DATA,
    API_ENDPOINTS,
    STORAGE_KEYS,
    EVENTS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    ACCESSIBILITY,
    PERFORMANCE,
    FEATURES,
    DEV_CONFIG
};
