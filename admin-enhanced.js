// Enhanced Admin Functions
function editUserProfile(username){
    const users=JSON.parse(localStorage.getItem('orda_users')||'{}');
    const user=users[username];
    if(!user)return;
    
    const newBio=prompt('Bio:',user.bio||'');
    if(newBio!==null)user.bio=newBio;
    
    const newAvatar=prompt('Avatar URL:',user.avatar||'');
    if(newAvatar!==null)user.avatar=newAvatar;
    
    const newMusic=prompt('Music URL (MP3/OGG):',user.music||'');
    if(newMusic!==null)user.music=newMusic;
    
    const newYoutube=prompt('YouTube:',user.youtube||'');
    if(newYoutube!==null)user.youtube=newYoutube;
    
    users[username]=user;
    localStorage.setItem('orda_users',JSON.stringify(users));
    alert('✅ Profile updated!');
    loadUsers();
}

function changeBadge(username){
    const users=JSON.parse(localStorage.getItem('orda_users')||'{}');
    const badge=prompt('Badge (gold/red/blue/black/none):',users[username].badge||'black');
    if(badge){
        users[username].badge=badge;
        localStorage.setItem('orda_users',JSON.stringify(users));
        alert('✅ Badge updated!');
        loadUsers();
    }
}

function switchTab(tab){
    document.querySelectorAll('.admin-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.admin-content').forEach(c=>c.style.display='none');
    event.target.classList.add('active');
    document.getElementById('tab-'+tab).style.display='block';
    
    if(tab==='shame')loadShame();
    if(tab==='stats')loadStats();
    if(tab==='users')loadUsers();
    if(tab==='ratings')loadRatings();
    if(tab==='suggestions')loadSuggestions();
    if(tab==='views')loadViews();
}

function loadShame(){
    const posts=JSON.parse(localStorage.getItem('orda_shame_posts')||'[]');
    const list=document.getElementById('shame-list');
    list.innerHTML=posts.length===0?'<p style="color:#888">No posts</p>':posts.map((p,i)=>`
        <div class="list-item">
            <div class="list-item-header">
                <div class="list-item-title">${p.type.toUpperCase()}</div>
                <button class="btn btn-danger" onclick="deleteShamePost(${i})">DELETE</button>
            </div>
        </div>
    `).join('');
}

function createShamePost(){
    const type=document.getElementById('shame-type').value;
    const content=document.getElementById('shame-content').value;
    if(!content)return alert('Enter content!');
    
    const posts=JSON.parse(localStorage.getItem('orda_shame_posts')||'[]');
    posts.push({type,content,timestamp:new Date().toISOString()});
    localStorage.setItem('orda_shame_posts',JSON.stringify(posts));
    alert('✅ Post created!');
    document.getElementById('shame-content').value='';
    loadShame();
}

function deleteShamePost(index){
    const posts=JSON.parse(localStorage.getItem('orda_shame_posts')||'[]');
    posts.splice(index,1);
    localStorage.setItem('orda_shame_posts',JSON.stringify(posts));
    loadShame();
}

function setShameMusic(){
    const url=prompt('Background music URL (MP3/OGG):');
    if(url){
        localStorage.setItem('orda_shame_music',url);
        alert('✅ Music set!');
    }
}
