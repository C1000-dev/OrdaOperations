// ORDA Main Script
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(event.target)) {
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.display = 'none';
                }
            }
        });
    });
    
    // Discord member count (if element exists)
    const memberCountElement = document.getElementById('member-count');
    if (memberCountElement) {
        // Try to fetch from Discord widget
        fetch('https://discord.com/api/guilds/1234567890/widget.json')
            .then(response => response.json())
            .then(data => {
                if (data.presence_count) {
                    animateCount(memberCountElement, parseInt(memberCountElement.textContent) || 51, data.presence_count);
                }
            })
            .catch(() => {
                // Fallback to stored value
                animateCount(memberCountElement, 0, 51);
            });
    }
    
    function animateCount(element, start, end) {
        const duration = 2000;
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }
});
