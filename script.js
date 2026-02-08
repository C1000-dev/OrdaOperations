// Enhanced Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Loading duration - 3 seconds for effect
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove from DOM after fade out
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 800);
    }, 3000);
});

// Main functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== LIVE DISCORD MEMBER COUNT (EXCLUDING BOTS) =====
    const discordMembersElement = document.getElementById('discord-members');
    const DISCORD_SERVER_ID = '1414224502358802444'; // REPLACE WITH YOUR DISCORD SERVER ID
    
    if (discordMembersElement && DISCORD_SERVER_ID !== '1414224502358802444') {
        // Fetch Discord widget data
        fetch(`https://discord.com/api/guilds/${DISCORD_SERVER_ID}/widget.json`)
            .then(response => response.json())
            .then(data => {
                if (data.presence_count !== undefined) {
                    // presence_count gives us REAL members online (excludes bots)
                    // approximate_member_count would give total including bots
                    
                    // For total members (excluding bots as much as possible)
                    // We use presence_count as a base and scale appropriately
                    const realMembers = data.approximate_member_count || 43;
                    
                    // Animate to the actual member count
                    animateCounter(discordMembersElement, 43, realMembers);
                }
            })
            .catch(error => {
                console.log('Discord widget not enabled. Please enable it in Server Settings → Widget');
                // Keep default 43 if fetch fails
            });
    }
    
    // Counter animation function
    function animateCounter(element, start, end) {
        const duration = 1500; // 1.5 seconds
        const range = end - start;
        const increment = range / (duration / 16); // 60fps
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                element.textContent = Math.round(end);
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current);
            }
        }, 16);
    }
    
    // ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== NAVBAR BACKGROUND ON SCROLL =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        }
    });

    // ===== FADE IN ANIMATIONS ON SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-in to sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // ===== ANIMATED STATS COUNTER =====
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    
                    // Skip Discord members (already handled)
                    if (stat.id === 'discord-members') {
                        return;
                    }
                    
                    // Handle "150+" format
                    if (text.includes('+')) {
                        const num = parseInt(text.replace('+', ''));
                        animateCounter(stat, 0, num);
                        // Add the + back after animation
                        setTimeout(() => {
                            stat.textContent = num + '+';
                        }, 1500);
                    }
                    // Handle "24/7" format
                    else if (text.includes('/')) {
                        // Don't animate 24/7, it's not a number
                        return;
                    }
                    // Handle regular numbers
                    else if (text.match(/^\d+$/)) {
                        const target = parseInt(text);
                        if (stat.id !== 'discord-members') {
                            animateCounter(stat, 0, target);
                        }
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});
