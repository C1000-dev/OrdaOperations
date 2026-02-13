// PERSISTENT LOGIN SYSTEM - Never logs out unless user clicks logout
class ORDAAuth {
    static SESSION_KEY = 'orda_session';
    static USER_KEY = 'orda_current_user';
    
    static init() {
        // Check if user has active session
        const session = localStorage.getItem(this.SESSION_KEY);
        const user = localStorage.getItem(this.USER_KEY);
        
        if (session && user) {
            // Session is active - keep user logged in
            this.updateNavbar();
            return user;
        }
        return null;
    }
    
    static login(username, password) {
        const users = JSON.parse(localStorage.getItem('orda_users') || '{}');
        
        if (!users[username]) {
            return { success: false, error: 'Account not found' };
        }
        
        if (users[username].password !== password) {
            return { success: false, error: 'Incorrect password' };
        }
        
        // Create persistent session
        localStorage.setItem(this.USER_KEY, username);
        localStorage.setItem(this.SESSION_KEY, Date.now().toString());
        
        this.updateNavbar();
        return { success: true, username };
    }
    
    static logout() {
        localStorage.removeItem(this.USER_KEY);
        localStorage.removeItem(this.SESSION_KEY);
        window.location.href = 'index.html';
    }
    
    static getCurrentUser() {
        return localStorage.getItem(this.USER_KEY);
    }
    
    static isLoggedIn() {
        return !!this.getCurrentUser();
    }
    
    static updateNavbar() {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return;
        
        // Show members-only links
        document.querySelectorAll('.members-only').forEach(el => {
            el.classList.add('visible');
        });
        
        // Hide sign in button
        const signInBtn = document.querySelector('.nav-signin');
        if (signInBtn) signInBtn.style.display = 'none';
        
        // Add profile dropdown if not exists
        const navMenu = document.getElementById('nav-menu');
        if (navMenu && !document.querySelector('.profile-dropdown')) {
            const profileDropdown = document.createElement('li');
            profileDropdown.className = 'profile-dropdown';
            profileDropdown.innerHTML = `
                <div class="profile-icon-container">
                    <div class="profile-icon">${currentUser.charAt(0).toUpperCase()}</div>
                    <span class="dropdown-arrow">▾</span>
                </div>
                <ul class="profile-menu">
                    <li><a href="profile.html?user=${currentUser}">👤 View Profile</a></li>
                    <li><a href="inbox.html">📬 Inbox</a></li>
                    <li><a href="chats.html">💬 Chats</a></li>
                    <li><a href="#" onclick="ORDAAuth.logout()">🚪 Logout</a></li>
                </ul>
            `;
            navMenu.appendChild(profileDropdown);
        }
    }
}

// Auto-init on page load
document.addEventListener('DOMContentLoaded', () => {
    ORDAAuth.init();
});
