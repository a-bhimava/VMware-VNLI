/**
 * Mock Data for VNLI Prototype
 * Realistic data for demonstrations and testing
 */

import { CONFIG } from './constants.js';

// VM Performance Data
export const vmPerformanceData = [
    {
        id: 'vm-001',
        name: 'VM-001 (App Server)',
        cpu: 85,
        memory: 72,
        disk: 45,
        network: 30,
        status: 'warning',
        lastUpdated: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        cluster: 'Production',
        host: 'esx-prod-01',
        os: 'Windows Server 2019',
        uptime: 15 * 24 * 60 * 60 * 1000 // 15 days
    },
    {
        id: 'vm-002',
        name: 'VM-002 (Database)',
        cpu: 92,
        memory: 45,
        disk: 78,
        network: 15,
        status: 'critical',
        lastUpdated: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
        cluster: 'Production',
        host: 'esx-prod-02',
        os: 'Windows Server 2019',
        uptime: 8 * 24 * 60 * 60 * 1000 // 8 days
    },
    {
        id: 'vm-003',
        name: 'VM-003 (Web Server)',
        cpu: 78,
        memory: 60,
        disk: 35,
        network: 65,
        status: 'warning',
        lastUpdated: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
        cluster: 'Production',
        host: 'esx-prod-01',
        os: 'Ubuntu 20.04',
        uptime: 30 * 24 * 60 * 60 * 1000 // 30 days
    },
    {
        id: 'vm-004',
        name: 'VM-004 (Web Server)',
        cpu: 95,
        memory: 87,
        disk: 55,
        network: 80,
        status: 'critical',
        lastUpdated: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
        cluster: 'Production',
        host: 'esx-prod-03',
        os: 'Ubuntu 20.04',
        uptime: 5 * 24 * 60 * 60 * 1000 // 5 days
    }
];

// Historical Performance Data
export const historicalData = {
    cpu: [
        { time: '00:00', value: 45 },
        { time: '04:00', value: 35 },
        { time: '08:00', value: 65 },
        { time: '12:00', value: 85 },
        { time: '16:00', value: 92 },
        { time: '20:00', value: 78 },
        { time: '24:00', value: 50 }
    ],
    memory: [
        { time: '00:00', value: 40 },
        { time: '04:00', value: 35 },
        { time: '08:00', value: 55 },
        { time: '12:00', value: 72 },
        { time: '16:00', value: 87 },
        { time: '20:00', value: 60 },
        { time: '24:00', value: 45 }
    ],
    disk: [
        { time: '00:00', value: 30 },
        { time: '04:00', value: 35 },
        { time: '08:00', value: 40 },
        { time: '12:00', value: 45 },
        { time: '16:00', value: 55 },
        { time: '20:00', value: 50 },
        { time: '24:00', value: 35 }
    ]
};

// AI Insights Data
export const aiInsights = {
    predictions: [
        {
            id: 'pred-001',
            type: 'cpu_spike',
            vm: 'VM-004',
            confidence: 92,
            timeframe: '2 hours',
            description: 'CPU spike expected based on historical patterns',
            recommendation: 'Scale resources or optimize workload'
        },
        {
            id: 'pred-002',
            type: 'storage_io',
            vm: 'VM-002',
            confidence: 88,
            timeframe: '4 hours',
            description: 'Storage I/O bottleneck predicted during backup window',
            recommendation: 'Reschedule backup or increase storage performance'
        },
        {
            id: 'pred-003',
            type: 'memory_pressure',
            vm: 'VM-001',
            confidence: 85,
            timeframe: '6 hours',
            description: 'Memory pressure expected during peak business hours',
            recommendation: 'Increase memory allocation or optimize applications'
        }
    ],
    rootCauseAnalysis: {
        primaryCause: 'Backup process scheduling conflict',
        secondaryFactor: 'Backup window overlaps with peak business hours',
        impact: 'Resource contention causing performance degradation',
        solution: 'Reschedule backup processes to off-peak hours (2 AM - 4 AM)',
        confidence: 95
    },
    learningMetrics: {
        patternRecognition: 92,
        predictionAccuracy: 88,
        solutionEffectiveness: 95,
        monthlyImprovement: 5
    }
};

// Enterprise Metrics
export const enterpriseMetrics = {
    timeSavings: {
        percentage: 75,
        before: 45, // minutes
        after: 11, // minutes
        description: 'reduction in troubleshooting time'
    },
    costImpact: {
        annual: 486000,
        perVM: 486,
        vmCount: 1000,
        adminCost: 150, // per hour
        description: 'annual savings per 1000 VMs'
    },
    productivityGains: {
        percentage: 65,
        description: 'faster incident resolution',
        mttr: {
            before: 120, // minutes
            after: 42 // minutes
        }
    },
    networkEffect: {
        percentage: 5,
        description: 'monthly improvement across customers',
        learningRate: 'AI learns from all deployments'
    }
};

// ROI Data
export const roiData = {
    investment: 50000,
    annualSavings: 486000,
    threeYearValue: 1400000,
    netROI: 2800, // percentage
    ltvCacRatio: 16,
    paybackPeriod: 1.2, // months
    breakdown: {
        year1: { investment: 50000, savings: 486000, net: 436000 },
        year2: { investment: 0, savings: 486000, net: 486000 },
        year3: { investment: 0, savings: 486000, net: 486000 }
    }
};

// Customer Success Stories
export const customerStories = [
    {
        company: 'Fortune 500 Bank',
        industry: 'Financial Services',
        vmCount: 5000,
        metrics: {
            timeReduction: 85,
            costSavings: 2100000,
            satisfaction: 98
        },
        quote: 'VNLI transformed our operations team\'s efficiency',
        challenges: ['Complex infrastructure', 'Regulatory compliance', '24/7 operations'],
        solutions: ['Natural language queries', 'Automated insights', 'Predictive analytics']
    },
    {
        company: 'Global Retailer',
        industry: 'Retail',
        vmCount: 3000,
        metrics: {
            timeReduction: 70,
            mttrImprovement: 65,
            uptime: 99.9
        },
        quote: 'Incident resolution is now measured in minutes, not hours',
        challenges: ['Peak traffic management', 'Multi-region deployment', 'Seasonal scaling'],
        solutions: ['Real-time monitoring', 'Automated scaling', 'Predictive maintenance']
    },
    {
        company: 'Healthcare Provider',
        industry: 'Healthcare',
        vmCount: 2000,
        metrics: {
            uptime: 99.9,
            complianceScore: 100,
            costReduction: 40
        },
        quote: 'Proactive monitoring prevents critical issues',
        challenges: ['HIPAA compliance', 'Critical uptime requirements', 'Data security'],
        solutions: ['Compliance monitoring', 'Predictive alerts', 'Automated remediation']
    }
];

// Query Processing Data
export const queryProcessingData = {
    steps: [
        {
            id: 'intent',
            name: 'Understanding Intent',
            description: 'Analyzing natural language query',
            duration: 800,
            status: 'completed',
            details: 'Query classified as: Performance Monitoring'
        },
        {
            id: 'translation',
            name: 'Translating to API',
            description: 'Converting to VMware API calls',
            duration: 1200,
            status: 'in-progress',
            details: 'Generated 3 optimized VMware API calls'
        },
        {
            id: 'validation',
            name: 'Validating Safety',
            description: 'Ensuring query security and permissions',
            duration: 1000,
            status: 'pending',
            details: 'Security checks in progress'
        }
    ],
    totalTime: 3000,
    parameters: {
        cpuThreshold: 80,
        timeRange: '4 hours',
        scope: 'Production',
        cluster: 'Production'
    }
};

// Navigation Data
export const navigationData = {
    screens: [
        { id: 1, title: 'Current State', icon: '😤', completed: false },
        { id: 2, title: 'Workflow Complexity', icon: '🔄', completed: false },
        { id: 3, title: 'VNLI Solution', icon: '💡', completed: false },
        { id: 4, title: 'Query in Action', icon: '⚡', completed: false },
        { id: 5, title: 'Instant Results', icon: '📊', completed: false },
        { id: 6, title: 'AI Insights', icon: '🤖', completed: false },
        { id: 7, title: 'Enterprise Impact', icon: '🏢', completed: false },
        { id: 8, title: 'Strategic Value', icon: '🎯', completed: false }
    ],
    currentScreen: 1,
    totalScreens: 8
};

// Animation Data
export const animationData = {
    screenTransitions: {
        duration: 600,
        easing: 'ease-in-out',
        stagger: 100
    },
    elementAnimations: {
        fadeIn: { duration: 300, delay: 0 },
        slideUp: { duration: 400, delay: 100 },
        scaleIn: { duration: 350, delay: 200 }
    },
    loadingStates: {
        spinner: { duration: 1000, iterations: 'infinite' },
        progress: { duration: 2000, easing: 'ease-out' }
    }
};

// Theme Data
export const themeData = {
    light: {
        primary: '#0072CE',
        secondary: '#6C757D',
        background: '#FFFFFF',
        surface: '#F5F5F5',
        text: '#1C1C1C'
    },
    dark: {
        primary: '#4A9EFF',
        secondary: '#ADB5BD',
        background: '#1C1C1C',
        surface: '#2D2D2D',
        text: '#FFFFFF'
    }
};

// Export all data as a single object
export const MOCK_DATA = {
    vmPerformanceData,
    historicalData,
    aiInsights,
    enterpriseMetrics,
    roiData,
    customerStories,
    queryProcessingData,
    navigationData,
    animationData,
    themeData
};

// Data generation functions
export function generateRandomVMData(count = 10) {
    const vms = [];
    for (let i = 0; i < count; i++) {
        vms.push({
            id: `vm-${String(i + 1).padStart(3, '0')}`,
            name: `VM-${String(i + 1).padStart(3, '0')}`,
            cpu: Math.floor(Math.random() * 100),
            memory: Math.floor(Math.random() * 100),
            disk: Math.floor(Math.random() * 100),
            network: Math.floor(Math.random() * 100),
            status: Math.random() > 0.7 ? 'critical' : Math.random() > 0.4 ? 'warning' : 'normal',
            lastUpdated: new Date(Date.now() - Math.random() * 60 * 60 * 1000),
            cluster: Math.random() > 0.5 ? 'Production' : 'Development',
            host: `esx-${Math.floor(Math.random() * 10) + 1}`,
            os: Math.random() > 0.5 ? 'Windows Server 2019' : 'Ubuntu 20.04',
            uptime: Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
        });
    }
    return vms;
}

export function generateTimeSeriesData(hours = 24, interval = 60) {
    const data = [];
    const now = new Date();
    
    for (let i = hours; i >= 0; i--) {
        const time = new Date(now.getTime() - i * interval * 60 * 1000);
        data.push({
            time: time.toISOString(),
            cpu: Math.floor(Math.random() * 100),
            memory: Math.floor(Math.random() * 100),
            disk: Math.floor(Math.random() * 100),
            network: Math.floor(Math.random() * 100)
        });
    }
    
    return data;
}
