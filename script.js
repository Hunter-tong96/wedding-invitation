// script.js
document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('bg-music');
    const musicControl = document.getElementById('music-control');

    // 1. 解决浏览器自动播放策略：需要用户交互
    let hasInteracted = false;

    // 点击任意地方开始播放（第一次交互）
    document.body.addEventListener('click', function firstInteraction() {
        if (!hasInteracted) {
            hasInteracted = true;
            audio.play().catch(e => console.log("播放失败，可能需要用户明确点击:", e)); // 尝试播放
            document.body.removeEventListener('click', firstInteraction); // 移除这个一次性监听器
        }
    });

    // 2. 音乐控制按钮功能
    musicControl.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            musicControl.classList.remove('muted');
        } else {
            audio.pause();
            musicControl.classList.add('muted');
        }
    });

    // 3. 初始状态：根据音频状态设置按钮
    if (audio.paused) {
        musicControl.classList.add('muted');
    } else {
        musicControl.classList.remove('muted');
    }

    // 4. (可选) 处理页面可见性变化 (如用户切到其他标签页暂停音乐)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            audio.pause();
        } else if (hasInteracted && !audio.paused) { // 如果之前是在播放状态且用户已交互过
            audio.play();
        }
    });
});