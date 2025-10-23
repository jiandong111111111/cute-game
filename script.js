// 页面元素（新增庆祝页面相关）
const loginPage = document.getElementById('loginPage');
const gamePage = document.getElementById('gamePage');
const celebrationPage = document.getElementById('celebrationPage');
const loginBtn = document.getElementById('loginBtn');
const restartBtn = document.getElementById('restartBtn');
const appleCountElement = document.getElementById('appleCount');
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const bigPigContainer = document.getElementById('bigPig');

// 登录功能
loginBtn.addEventListener('click', () => {
    loginPage.classList.add('hidden');
    gamePage.classList.remove('hidden');
    startGame();
});

// 再来一次按钮功能
restartBtn.addEventListener('click', () => {
    celebrationPage.classList.add('hidden');
    loginPage.classList.remove('hidden');
    appleCountElement.textContent = '0';
});

// 游戏变量
let pig = {
    x: canvas.width / 2 - 30,
    y: canvas.height - 100,
    width: 60,
    height: 60,
    speed: 7,
    isPink: true
};

let apples = [];
let appleCount = 0;
let spawnTimer = 0;
let keys = {
    left: false,
    right: false
};

// 键盘控制
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') keys.left = true;
    if (e.key === 'ArrowRight') keys.right = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') keys.left = false;
    if (e.key === 'ArrowRight') keys.right = false;
});

// 生成苹果
function spawnApple() {
    apples.push({
        x: Math.random() * (canvas.width - 40) + 20,
        y: -50,
        size: 30 + Math.random() * 10,
        speed: 2 + Math.random() * 3
    });
}

// 检测碰撞（新增20个苹果跳转逻辑）
function checkCollision() {
    for (let i = apples.length - 1; i >= 0; i--) {
        const apple = apples[i];
        if (
            pig.x < apple.x + apple.size &&
            pig.x + pig.width > apple.x &&
            pig.y < apple.y + apple.size &&
            pig.y + pig.height > apple.y
        ) {
            apples.splice(i, 1);
            appleCount++;
            appleCountElement.textContent = appleCount;

            // 吃到20个苹果跳转
            if (appleCount === 20) {
                gamePage.classList.add('hidden');
                celebrationPage.classList.remove('hidden');
                drawBigPig(); // 绘制大猪
                return true; // 终止当前游戏
            }
        }
        else if (apple.y > canvas.height) {
            apples.splice(i, 1);
        }
    }
    return false;
}

// 绘制小猪（原有逻辑不变）
function drawPig() {
    // 身体
    ctx.fillStyle = '#f8bbd0';
    ctx.beginPath();
    ctx.ellipse(
        pig.x + pig.width / 2,
        pig.y + pig.height / 2,
        pig.width / 2,
        pig.height / 2 - 10,
        0,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // 耳朵
    ctx.fillStyle = '#f48fb1';
    // 左耳朵
    ctx.beginPath();
    ctx.ellipse(pig.x + 15, pig.y + 10, 12, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    // 右耳朵
    ctx.beginPath();
    ctx.ellipse(pig.x + 45, pig.y + 10, 12, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // 眼睛、鼻子等细节（保持不变）
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(pig.x + 25, pig.y + 25, 8, 0, Math.PI * 2);
    ctx.arc(pig.x + 35, pig.y + 25, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(pig.x + 27, pig.y + 25, 4, 0, Math.PI * 2);
    ctx.arc(pig.x + 37, pig.y + 25, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#f06292';
    ctx.beginPath();
    ctx.ellipse(pig.x + 30, pig.y + 38, 10, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#c2185b';
    ctx.beginPath();
    ctx.arc(pig.x + 26, pig.y + 38, 2, 0, Math.PI * 2);
    ctx.arc(pig.x + 34, pig.y + 38, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#f8bbd0';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(pig.x + pig.width, pig.y + 20);
    ctx.quadraticCurveTo(pig.x + pig.width + 20, pig.y + 10, pig.x + pig.width + 10, pig.y + 25);
    ctx.stroke();
}

// 新增：绘制大猪（在庆祝页面）
function drawBigPig() {
    // 创建一个canvas用于绘制大猪
    const bigCanvas = document.createElement('canvas');
    bigCanvas.width = 400;
    bigCanvas.height = 400;
    const bigCtx = bigCanvas.getContext('2d');
    
    // 大猪身体（比小猪大3倍）
    bigCtx.fillStyle = '#f8bbd0';
    bigCtx.beginPath();
    bigCtx.ellipse(200, 250, 120, 100, 0, 0, Math.PI * 2);
    bigCtx.fill();
    
    // 大猪耳朵
    bigCtx.fillStyle = '#f48fb1';
    // 左耳朵
    bigCtx.beginPath();
    bigCtx.ellipse(120, 150, 36, 54, 0, 0, Math.PI * 2);
    bigCtx.fill();
    // 右耳朵
    bigCtx.beginPath();
    bigCtx.ellipse(280, 150, 36, 54, 0, 0, Math.PI * 2);
    bigCtx.fill();
    
    // 大猪眼睛
    bigCtx.fillStyle = 'white';
    bigCtx.beginPath();
    bigCtx.arc(170, 220, 24, 0, Math.PI * 2);
    bigCtx.arc(230, 220, 24, 0, Math.PI * 2);
    bigCtx.fill();
    
    // 大猪眼珠
    bigCtx.fillStyle = 'black';
    bigCtx.beginPath();
    bigCtx.arc(180, 220, 12, 0, Math.PI * 2);
    bigCtx.arc(240, 220, 12, 0, Math.PI * 2);
    bigCtx.fill();
    
    // 大猪鼻子
    bigCtx.fillStyle = '#f06292';
    bigCtx.beginPath();
    bigCtx.ellipse(200, 270, 30, 24, 0, 0, Math.PI * 2);
    bigCtx.fill();
    
    // 大猪鼻孔
    bigCtx.fillStyle = '#c2185b';
    bigCtx.beginPath();
    bigCtx.arc(185, 270, 6, 0, Math.PI * 2);
    bigCtx.arc(215, 270, 6, 0, Math.PI * 2);
    bigCtx.fill();
    
    // 大猪尾巴
    bigCtx.strokeStyle = '#f8bbd0';
    bigCtx.lineWidth = 18;
    bigCtx.beginPath();
    bigCtx.moveTo(320, 220);
    bigCtx.quadraticCurveTo(380, 180, 350, 250);
    bigCtx.stroke();
    
    // 将大猪canvas添加到页面
    bigPigContainer.innerHTML = '';
    bigPigContainer.appendChild(bigCanvas);
}

// 绘制苹果（原有逻辑不变）
function drawApples() {
    apples.forEach(apple => {
        // 苹果主体
        ctx.fillStyle = '#ef5350';
        ctx.beginPath();
        ctx.arc(apple.x, apple.y, apple.size, 0, Math.PI * 2);
        ctx.fill();
        
        // 苹果高光
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        ctx.arc(apple.x - apple.size / 3, apple.y - apple.size / 3, apple.size / 4, 0, Math.PI * 2);
        ctx.fill();
        
        // 苹果柄和叶子
        ctx.fillStyle = '#8d6e63';
        ctx.beginPath();
        ctx.rect(apple.x - 2, apple.y - apple.size - 10, 4, 10);
        ctx.fill();
        
        ctx.fillStyle = '#4caf50';
        ctx.beginPath();
        ctx.ellipse(apple.x, apple.y - apple.size - 15, 8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
    });
}

// 游戏循环（新增终止条件）
function gameLoop() {
    // 如果达到20个苹果，停止循环
    if (appleCount >= 20) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (spawnTimer++ > 60) {
        spawnApple();
        spawnTimer = 0;
    }
    
    // 移动小猪
    if (keys.left && pig.x > 0) {
        pig.x -= pig.speed;
    }
    if (keys.right && pig.x + pig.width < canvas.width) {
        pig.x += pig.speed;
    }
    
    // 移动苹果
    apples.forEach(apple => {
        apple.y += apple.speed;
    });
    
    // 检测碰撞，达到20个则停止
    const reachedTarget = checkCollision();
    if (reachedTarget) return;
    
    drawPig();
    drawApples();
    requestAnimationFrame(gameLoop);
}

// 开始游戏
function startGame() {
    appleCount = 0;
    appleCountElement.textContent = appleCount;
    apples = [];
    pig.x = canvas.width / 2 - 30;
    gameLoop();
}