// ORDA Analytics System - View Tracking
// Tracks: All Time, 1 Year, 30 Days, 7 Days, 24h, 12h

function trackPageView(pageName) {
    const views = JSON.parse(localStorage.getItem('orda_page_views') || '{}');
    const now = Date.now();
    
    if (!views[pageName]) {
        views[pageName] = {
            allTime: 0,
            timestamps: []
        };
    }
    
    // Add new timestamp
    views[pageName].timestamps.push(now);
    views[pageName].allTime++;
    
    // Clean old timestamps (older than 1 year)
    const oneYear = 365 * 24 * 60 * 60 * 1000;
    views[pageName].timestamps = views[pageName].timestamps.filter(t => now - t < oneYear);
    
    // Save
    localStorage.setItem('orda_page_views', JSON.stringify(views));
}

function getPageViews(pageName, period = 'allTime') {
    const views = JSON.parse(localStorage.getItem('orda_page_views') || '{}');
    
    if (!views[pageName]) {
        return 0;
    }
    
    if (period === 'allTime') {
        return views[pageName].allTime;
    }
    
    const now = Date.now();
    const periods = {
        '12h': 12 * 60 * 60 * 1000,
        '24h': 24 * 60 * 60 * 1000,
        '7days': 7 * 24 * 60 * 60 * 1000,
        '30days': 30 * 24 * 60 * 60 * 1000,
        '1year': 365 * 24 * 60 * 60 * 1000
    };
    
    const timeframe = periods[period];
    if (!timeframe) return 0;
    
    return views[pageName].timestamps.filter(t => now - t < timeframe).length;
}

function getAllPageViews(period = 'allTime') {
    const views = JSON.parse(localStorage.getItem('orda_page_views') || '{}');
    const result = {};
    
    for (const page in views) {
        result[page] = getPageViews(page, period);
    }
    
    return result;
}
