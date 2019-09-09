/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var myGamePiece;
var enemy = [];

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "green", 200, 220);
    //enemy = new component(10, 10, "red", 20, 20);
}

var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
};

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 1;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.newPos = function () {
        this.x += this.speedX;
    };
    this.enemyPos = function () {
        this.y += this.speedY;
    };
    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    };
}

function updateGameArea() {
    var x, width, gap, minWidth, maxWidth, minGap, maxGap;
    for (i = 0; i < enemy.length; i += 1) {
        if (myGamePiece.crashWith(enemy[i])) {
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    borderControl();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo === 1 || everyinterval(5)) {
        x = myGameArea.canvas.width;
        minWidth = 5;
        maxWidth = 480;
        width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
        minGap = 0;
        maxGap = 50;
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
        enemy.push(new component(20, 20, "red", width, 10));

        /*x = myGameArea.canvas.width;
         y = myGameArea.canvas.height - 200;
         enemy.push(new component(10, 10, "red", 20, 20));*/
    }
    for (i = 0; i < enemy.length; i += 1) {
        enemy[i].y += 5;
        enemy[i].update();
    }
    myGamePiece.newPos();
    myGamePiece.update();
    /*if (myGamePiece.crashWith(enemy)) {
     myGameArea.stop();
     } else {*/
    //myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
    enemy.enemyPos();
    enemy.update();


}


function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 === 0) {
        return true;
    }
    return false;
}

function moveLeft() {
    myGamePiece.speedX -= 5;
}

function moveRight() {
    myGamePiece.speedX += 5;
}

function stopMove() {
    myGamePiece.speedX = 0;
}

function borderControl(){
    if (myGamePiece.x < 10){
        myGamePiece.x = 1;
    }
    
    if (myGamePiece.x > 480){
        myGamePiece.x = 480 - 30;
    }
}
