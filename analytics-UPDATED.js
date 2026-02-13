// ORDA Analytics System
(function() {
    const STORAGE_KEY = 'orda_page_views';
    
    // Track page view
    window.trackPageView = function(pageName) {
        const views = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        
        if (!views[pageName]) {
            views[pageName] = {
                timestamps: [],
                totalViews: 0
            };
        }
        
        views[pageName].timestamps.push(Date.now());
        views[pageName].totalViews++;
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
    };
    
    // Get views for a specific period
    window.getPageViews = function(pageName, period) {
        const views = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        
        if (!views[pageName]) return 0;
        
        const now = Date.now();
        const periods = {
            '12h': 12 * 60 * 60 * 1000,
            '24h': 24 * 60 * 60 * 1000,
            '7days': 7 * 24 * 60 * 60 * 1000,
            '30days': 30 * 24 * 60 * 60 * 1000,
            '1year': 365 * 24 * 60 * 60 * 1000,
            'allTime': Infinity
        };
        
        const cutoff = now - periods[period];
        
        return views[pageName].timestamps.filter(t => t > cutoff).length;
    };
    
    // Get all page views
    window.getAllPageViews = function(period) {
        const views = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        const result = {};
        
        for (const page in views) {
            result[page] = getPageViews(page, period);
        }
        
        return result;
    };
    
    // Clean old data (keep last year only)
    function cleanOldData() {
        const views = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        const oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);
        
        for (const page in views) {
            views[page].timestamps = views[page].timestamps.filter(t => t > oneYearAgo);
        }
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
    }
    
    // Clean on load
    cleanOldData();
})();
