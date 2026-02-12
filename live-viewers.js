// Live Viewers Counter
document.addEventListener('DOMContentLoaded',function(){
    const viewer=document.createElement('div');
    viewer.className='live-viewers';
    viewer.innerHTML='<span class="live-dot"></span><span id="live-count">'+Math.floor(Math.random()*20+1)+'</span> viewing';
    document.body.appendChild(viewer);
    
    setInterval(()=>{
        document.getElementById('live-count').textContent=Math.floor(Math.random()*20+1);
    },5000);
});
