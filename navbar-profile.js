// Profile Icon & Dropdown Logic
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = localStorage.getItem('orda_current_user');
    const navMenu = document.getElementById('nav-menu');
    
    if (currentUser) {
        // User is logged in - show profile icon
        const signInLink = document.querySelector('.nav-signin');
        if (signInLink) {
            signInLink.style.display = 'none';
        }
        
        // Add profile dropdown
        const profileDropdown = document.createElement('li');
        profileDropdown.className = 'profile-dropdown';
        profileDropdown.innerHTML = `
            <div class="profile-icon-container">
                <div class="profile-icon">${currentUser.charAt(0).toUpperCase()}</div>
                <span class="dropdown-arrow">▾</span>
            </div>
            <ul class="profile-menu">
                <li><a href="profile.html?user=${currentUser}">👤 View Your Profile</a></li>
                <li><a href="inbox.html">📬 Inbox</a></li>
                <li><a href="chats.html">💬 Chats</a></li>
                <li><a href="#" onclick="logout()">🚪 Logout</a></li>
            </ul>
        `;
        navMenu.appendChild(profileDropdown);
        
        // Show members-only links
        document.querySelectorAll('.members-only').forEach(el => el.classList.add('visible'));
        
        // Add Communications dropdown
        const commDropdown = document.createElement('li');
        commDropdown.className = 'dropdown members-only visible';
        commDropdown.innerHTML = `
            <a href="#" class="dropdown-toggle">COMMUNICATIONS ▾</a>
            <ul class="dropdown-menu">
                <li><a href="members.html">🔍 Search Members</a></li>
                <li><a href="chats.html">💬 Chats</a></li>
            </ul>
        `;
        
        // Insert before profile dropdown
        navMenu.insertBefore(commDropdown, profileDropdown);
    }
});

function logout() {
    localStorage.removeItem('orda_current_user');
    window.location.href = 'index.html';
}
