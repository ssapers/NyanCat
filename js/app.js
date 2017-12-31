
window.onload = init;

var map,ctxMap,gameWidth = 925,gameHeight = 550;
var background = new Image();
background.src = 'img/background.jpg';

var background1 = new Image();
background1.src = 'img/background.jpg';

var player,ctxPlayer;
var tiles = new Image();
tiles.src = 'img/players.png';

var pl;
var enemies = [];

var enemyCanvas,ctxEnemy;

var isPlaying;

var point;
var points, ctxPoints;

var mapX = 0, map1X = gameWidth;
//for create enemies
var spawnInterval, spawnTime = 3200, spawnAmount = 8;

var timer = 0;

speedEnemy = 10;

var counter = 0;

//braz
var requestAnimFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;

function init() {

    map = document.getElementById('map');
    ctxMap = map.getContext('2d');

    player = document.getElementById('player');
    ctxPlayer = player.getContext('2d');

    enemyCanvas = document.getElementById('enemy');
    ctxEnemy = enemyCanvas.getContext('2d');

    points = document.getElementById('points');
    ctxPoints = points.getContext('2d');

    map.width = gameWidth;
    map.height = gameHeight;
    player.width = gameWidth;
    player.height = gameHeight;
    enemyCanvas.width =gameWidth;
    enemyCanvas.height = gameHeight;
    points.width = gameWidth;
    points.height = gameHeight;

    ctxPoints.fillStyle = '#fafafa';
    ctxPoints.font = 'bold 20px Quantico';


    pl = new Player();

    point = 10;

    startLoop();
    stopLoop();

    var clear = document.querySelector(`button`);
    clickButtonStart();

//timer and newGame
     document.getElementById('start').onclick = function(){timer = new Date().getTime();
         clear.classList.add('btn-clear');

         for( ; 1>counter;counter++){
         var gameStart = document.getElementById('fff');
         gameStart.remove('<span>');}
         spawnTime = 3200;
         startLoop();
        if(point===0){
            clearCtxPlayer();
            var gameOver = document.getElementById('reset');
            gameOver.remove('<span>');
            point=10;
            startLoop();

        }
        };
    document.getElementById('stop').onclick = function(){timer = 0};

    var interval = setInterval(function(){
        if (timer===0) return;
        var time = document.getElementById('timer').innerHTML = (new Date().getTime()-timer)/1000;
       increaseValue(time);
       clearCtxEnemy();
    },100);


 //

    document.addEventListener('keydown', checkKeyDown, false);
    document.addEventListener('keyup', checkKeyUp, false);
}

function clickButtonStart() {
    var gameOver = document.getElementById('clickButton');
    gameOver.innerHTML = '<span id="fff"><h4>Please, click the button to start the game</h4> </span>';
}

function increaseValue(time) {
    if(Math.floor(time)===0){
        spawnTime = 3200;
        speedEnemy = 10;
        spawnAmount = 8;
    }
    if(Math.floor(time)===10){
        speedEnemy = 12;
        spawnTime = 3000;
        spawnAmount = 9;
    }
    if(Math.floor(time)===20){
        speedEnemy = 15;
        spawnTime = 2000;
        spawnAmount = 10;
    }
    if(Math.floor(time)===30){
        speedEnemy = 18;
        spawnTime = 1500;
        spawnAmount = 11;
    }
    if(Math.floor(time)===40){
        speedEnemy = 20;
        spawnTime = 1000;
        spawnAmount = 12;
    }
}

function spawnEnemy(count) {
    for(var i = 0; i < count; i++){
        enemies[i] = new Enemy();
    }
}

function startCreatingEnemies() {
    stopCreateEnemies();
    spawnInterval = setInterval(function (){spawnEnemy(spawnAmount)},spawnTime)
}

function stopCreateEnemies() {
  clearInterval(spawnInterval);
}

function loop() {
    if(isPlaying){
        draw();
        update();
        requestAnimFrame(loop);
    }
}

function startLoop() {

    if(point<=0){

        var gameOver = document.getElementById('reset');
        gameOver.remove('<span>');
        point=10;


    }
    isPlaying = true;
    loop();
    startCreatingEnemies();
}


function stopLoop() {
    isPlaying = false;
    timer = 0;
}

function draw() {
    pl.draw();

    clearCtxEnemy();
    for(var i = 0; i < enemies.length ; i++){
        enemies[i].draw();
    }
}

function update() {
    moveBg();
    drawBg();
    updatePoints();
    pl.update();
    for(var i = 0; i < enemies.length ; i++){
        enemies[i].update();
    }
}

function moveBg() {
    mapX -= 4;
    map1X -= 4;
    if(mapX+gameWidth < 0) mapX = gameWidth-5;
    if(map1X+gameWidth < 0) map1X = gameWidth-5;
}

//object
function Player() {
    this.srcX = 0;
    this.srcY = 0;
    this.drawX = 0;
    this.drawY = 40;
    this.width = 110;
    this.height = 70;
    this.speed = 3;

    //for keyboard
    this.isUp = false;
    this.isDown = false;
    this.isRight =false;
    this.isLeft = false;



    this.speed = 5;
}

function Enemy() {
    this.srcX = 0;
    this.srcY = 98;
    this.drawX = Math.floor(Math.random() *gameWidth)+ gameWidth;
    this.drawY = Math.floor(Math.random() * gameHeight);
    this.width = 110;
    this.height = 70;

    this.speed = 15;
}


Enemy.prototype.draw = function () {

    ctxEnemy.drawImage(tiles, this.srcX, this.srcY,this.width , this.height,
        this.drawX, this.drawY, this.width, this.height);
};

Enemy.prototype.update = function () {
    this.drawX -= speedEnemy;
    if(this.drawX + this.width < 0){
        this.destroy();
    }

    if(this.drawY < 0) this.drawY = 0;
    if(this.drawY > gameHeight - this.height) this.drawY = gameHeight - this.height;

};

Enemy.prototype.destroy = function () {
  enemies.splice(enemies.indexOf(this),1);
};

Player.prototype.draw = function () {
    clearCtxPlayer();
    ctxPlayer.drawImage(tiles, this.srcX, this.srcY,this.width , this.height,
        this.drawX, this.drawY, this.width, this.height);
};


Player.prototype.update = function () {
    if(this.drawX < 0) this.drawX = 0;
    if(this.drawX > gameWidth - this.width) this.drawX = gameWidth - this.width;
    if(this.drawY < 0) this.drawY = 0;
    if(this.drawY > gameHeight - this.height) this.drawY = gameHeight - this.height;

    for(var i = 0; i < enemies.length ; i++){
        if(this.drawX >= enemies[i].drawX &&
            this.drawY >= enemies[i].drawY &&
            this.drawX <= enemies[i].drawX + enemies[i].width &&
            this.drawY <= enemies[i].drawY + enemies[i].height
        ){


point--;
if(point===0){

    stopLoop();
    var gameOver = document.getElementById('gameOver');
    gameOver.innerHTML = '<span id="reset">Game Over <br>  <br> Your time </span>';
    var clear = document.querySelector(`button`);
    clear.classList.remove('btn-clear');
}
        }
    }
    this.chooseDir();
};

Player.prototype.chooseDir = function () {
    if(this.isUp)
        this.drawY -= this.speed;
    if(this.isDown)
        this.drawY += this.speed;
    if(this.isRight)
        this.drawX += this.speed;
    if(this.isLeft)
        this.drawX -= this.speed;

};


function checkKeyDown(e) {
    var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);

    if(e.keyCode === 87 || e.keyCode === 38){
        pl.isUp = true;
        e.preventDefault();
    }
    if(e.keyCode === 83 || e.keyCode === 40){
        pl.isDown = true;
        e.preventDefault();
    }
    if(e.keyCode === 68 || e.keyCode === 39){
        pl.isRight = true;
        e.preventDefault();
    }
    if(e.keyCode === 65 || e.keyCode === 37){
        pl.isLeft = true;
        e.preventDefault();
    }


}

function checkKeyUp(e) {
    var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);

    if(e.keyCode === 87 || e.keyCode === 38){
        pl.isUp = false;
        e.preventDefault();
    }
    if(e.keyCode === 83 || e.keyCode === 40){
        pl.isDown = false;
        e.preventDefault();
    }
    if(e.keyCode === 68 || e.keyCode === 39){
        pl.isRight = false;
        e.preventDefault();
    }
    if(e.keyCode === 65 || e.keyCode === 37){
        pl.isLeft = false;
        e.preventDefault();
    }

}

function clearCtxPlayer() {
    ctxPlayer.clearRect(0, 0, gameWidth , gameHeight);
}

function clearCtxEnemy() {
    ctxEnemy.clearRect(0, 0, gameWidth , gameHeight);
}

function updatePoints() {
    ctxPoints.clearRect(0, 0, gameWidth , gameHeight);
    ctxPoints.fillText('Health:' + point,20,30);
}

function drawBg() {
    ctxMap.clearRect(0, 0, gameWidth , gameHeight);
    ctxMap.drawImage(background, 0, 0, 800, 520,
        mapX, 0, gameWidth, gameHeight);
    ctxMap.drawImage(background1, 0, 0, 800, 520,
        map1X, 0, gameWidth, gameHeight);
}

