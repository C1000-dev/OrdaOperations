// ORDA Admin Panel JavaScript
const ADMIN_USERNAME = 'orda_supreme_admin';
const ADMIN_PASSWORD = 'ORDA#2026!Dominion@Secure';

function adminLogin() {
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;
    const error = document.getElementById('login-error');
    
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem('orda_admin_logged_in', 'true');
        document.getElementById('admin-login').style.display = 'none';
        document.getElementById('admin-panel').classList.add('active');
        loadDashboard();
    } else {
        error.textContent = '❌ Invalid credentials';
        error.style.display = 'block';
    }
}

function adminLogout() {
    localStorage.removeItem('orda_admin_logged_in');
    location.reload();
}

// Check if logged in
if (localStorage.getItem('orda_admin_logged_in')) {
    document.getElementById('admin-login').style.display = 'none';
    document.getElementById('admin-panel').classList.add('active');
    loadDashboard();
}

function switchTab(tab) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-content').forEach(c => c.style.display = 'none');
    
    event.target.classList.add('active');
    document.getElementById('tab-' + tab).style.display = 'block';
    
    if (tab === 'stats') loadStats();
    if (tab === 'users') loadUsers();
    if (tab === 'ratings') loadRatings();
    if (tab === 'suggestions') loadSuggestions();
    if (tab === 'views') loadViews();
}

function loadDashboard() {
    loadStats();
    loadUsers();
}

function loadStats() {
    const users = JSON.parse(localStorage.getItem('orda_users') || '{}');
    const ratings = JSON.parse(localStorage.getItem('orda_ratings') || '[]');
    const suggestions = JSON.parse(localStorage.getItem('orda_game_suggestions') || '[]');
    
    document.getElementById('stat-users').textContent = Object.keys(users).length;
    document.getElementById('stat-ratings').textContent = ratings.length;
    document.getElementById('stat-suggestions').textContent = suggestions.length;
    document.getElementById('stat-pending').textContent = ratings.filter(r => r.status === 'pending').length;
}

function createUser() {
    const username = document.getElementById('new-username').value.trim();
    const password = document.getElementById('new-password').value;
    const rank = document.getElementById('new-rank').value;
    
    if (!username || !password) {
        alert('Please fill all fields!');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('orda_users') || '{}');
    
    if (users[username]) {
        alert('User already exists!');
        return;
    }
    
    users[username] = {
        password: password,
        rank: parseInt(rank),
        badge: 'none',
        bio: '',
        avatar: '',
        followers: [],
        following: [],
        createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('orda_users', JSON.stringify(users));
    
    alert('✅ User created: ' + username);
    document.getElementById('new-username').value = '';
    document.getElementById('new-password').value = '';
    
    loadUsers();
    loadStats();
}

function loadUsers() {
    const users = JSON.parse(localStorage.getItem('orda_users') || '{}');
    const list = document.getElementById('user-list');
    
    list.innerHTML = '';
    
    for (const username in users) {
        const user = users[username];
        const rankNames = ['','Private','Specialist','Corporal','Sergeant','Captain','Ensign','Loyal Soldier','Major','Lieutenant','Colonel','General','General of the Army','Admiral','Marshal','Commander'];
        
        list.innerHTML += `
            <div class="list-item">
                <div class="list-item-header">
                    <div>
                        <div class="list-item-title">${username}</div>
                        <div style="color: #888; font-size: 13px; margin-top: 5px;">
                            Rank: Level ${user.rank} - ${rankNames[user.rank]} | Badge: ${user.badge}
                        </div>
                    </div>
                    <div class="list-item-actions">
                        <button class="btn" onclick="editUser('${username}')">EDIT</button>
                        <button class="btn btn-danger" onclick="deleteUser('${username}')">DELETE</button>
                    </div>
                </div>
            </div>
        `;
    }
}

function editUser(username) {
    const users = JSON.parse(localStorage.getItem('orda_users') || '{}');
    const user = users[username];
    
    const newRank = prompt('Enter new rank (1-15):', user.rank);
    if (newRank && parseInt(newRank) >= 1 && parseInt(newRank) <= 15) {
        user.rank = parseInt(newRank);
    }
    
    const newBadge = prompt('Enter badge type (none/blue/gold):', user.badge);
    if (newBadge) {
        user.badge = newBadge;
    }
    
    users[username] = user;
    localStorage.setItem('orda_users', JSON.stringify(users));
    
    alert('✅ User updated!');
    loadUsers();
}

function deleteUser(username) {
    if (!confirm('Delete user ' + username + '?')) return;
    
    const users = JSON.parse(localStorage.getItem('orda_users') || '{}');
    delete users[username];
    localStorage.setItem('orda_users', JSON.stringify(users));
    
    alert('✅ User deleted!');
    loadUsers();
    loadStats();
}

function loadRatings() {
    const ratings = JSON.parse(localStorage.getItem('orda_ratings') || '[]');
    
    const pending = ratings.filter(r => r.status === 'pending');
    const approved = ratings.filter(r => r.status === 'approved');
    
    document.getElementById('pending-ratings').innerHTML = pending.length === 0 
        ? '<p style="color: #888;">No pending ratings</p>'
        : pending.map((r, i) => `
            <div class="list-item">
                <div class="list-item-header">
                    <div>
                        <div class="list-item-title">⭐ ${r.rating}/5 - ${r.username}</div>
                        <div style="color: #888; margin-top: 5px;">${r.comment}</div>
                    </div>
                    <div class="list-item-actions">
                        <button class="btn btn-success" onclick="approveRating(${i})">APPROVE</button>
                        <button class="btn btn-danger" onclick="deleteRating(${i})">REJECT</button>
                    </div>
                </div>
            </div>
        `).join('');
    
    document.getElementById('approved-ratings').innerHTML = approved.length === 0
        ? '<p style="color: #888;">No approved ratings</p>'
        : approved.map((r, i) => `
            <div class="list-item">
                <div class="list-item-header">
                    <div>
                        <div class="list-item-title">⭐ ${r.rating}/5 - ${r.username}</div>
                        <div style="color: #888; margin-top: 5px;">${r.comment}</div>
                    </div>
                    <div class="list-item-actions">
                        <button class="btn btn-danger" onclick="deleteRating(${ratings.indexOf(r)})">DELETE</button>
                    </div>
                </div>
            </div>
        `).join('');
}

function approveRating(index) {
    const ratings = JSON.parse(localStorage.getItem('orda_ratings') || '[]');
    const pending = ratings.filter(r => r.status === 'pending');
    const rating = pending[index];
    
    const allIndex = ratings.findIndex(r => r === rating);
    ratings[allIndex].status = 'approved';
    
    localStorage.setItem('orda_ratings', JSON.stringify(ratings));
    alert('✅ Rating approved!');
    loadRatings();
    loadStats();
}

function deleteRating(index) {
    const ratings = JSON.parse(localStorage.getItem('orda_ratings') || '[]');
    ratings.splice(index, 1);
    localStorage.setItem('orda_ratings', JSON.stringify(ratings));
    alert('✅ Rating deleted!');
    loadRatings();
    loadStats();
}

function loadSuggestions() {
    const suggestions = JSON.parse(localStorage.getItem('orda_game_suggestions') || '[]');
    const list = document.getElementById('suggestion-list');
    
    list.innerHTML = suggestions.length === 0
        ? '<p style="color: #888;">No game suggestions</p>'
        : suggestions.map((s, i) => `
            <div class="list-item">
                <div class="list-item-header">
                    <div>
                        <div class="list-item-title">🎮 ${s.game}</div>
                        <div style="color: #888; font-size: 13px; margin-top: 5px;">
                            ${new Date(s.timestamp).toLocaleString()} | Status: ${s.status}
                        </div>
                    </div>
                    <div class="list-item-actions">
                        <button class="btn btn-danger" onclick="deleteSuggestion(${i})">DELETE</button>
                    </div>
                </div>
            </div>
        `).join('');
}

function deleteSuggestion(index) {
    const suggestions = JSON.parse(localStorage.getItem('orda_game_suggestions') || '[]');
    suggestions.splice(index, 1);
    localStorage.setItem('orda_game_suggestions', JSON.stringify(suggestions));
    loadSuggestions();
    loadStats();
}

function loadViews() {
    const allViews = getAllPageViews('allTime');
    const periods = ['12h', '24h', '7days', '30days', '1year', 'allTime'];
    
    let html = '<div class="stats-grid">';
    
    for (const page in allViews) {
        html += `<div class="stat-card">
            <div class="stat-label" style="margin-bottom: 15px;">${page.toUpperCase()}</div>`;
        
        periods.forEach(period => {
            const count = getPageViews(page, period);
            html += `<div style="margin: 5px 0; font-size: 14px;">
                <span style="color: #888;">${period}:</span> ${count}
            </div>`;
        });
        
        html += '</div>';
    }
    
    html += '</div>';
    document.getElementById('views-content').innerHTML = html;
}
