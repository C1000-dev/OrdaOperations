// Live Viewers Counter - Appears on all pages
document.addEventListener('DOMContentLoaded', function() {
    // Check if viewer already exists
    if (document.querySelector('.live-viewers')) return;
    
    const viewer = document.createElement('div');
    viewer.className = 'live-viewers';
    viewer.innerHTML = '<span class="live-dot"></span><span id="live-count">' + Math.floor(Math.random() * 20 + 1) + '</span> viewing';
    document.body.appendChild(viewer);
    
    // Update count every 5 seconds
    setInterval(() => {
        const countElement = document.getElementById('live-count');
        if (countElement) {
            countElement.textContent = Math.floor(Math.random() * 20 + 1);
        }
    }, 5000);
});
