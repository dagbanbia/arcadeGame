
/**
*@description Represents the Enemy the player must avoid
* @constructor
* @param {GridCoordinate} x -The x coordinate of the enermy. 
* @param {GridCoordinate} y -The y coordinate of the enermy. 
* @param {number} speed -The  calculated speed of the enermy. 
*/
const Enemy = function(x,y,speed) {

    this.x = x;
    this.y =  y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

/**
*@description - a method for updating the enemy's position
* @param {number} dt - use the  available time delta information
*@return (number) x, y- the default x and y coordinates of player position.
*/
Enemy.prototype.update = function(dt) {
    
    this.x += this.speed *dt;
    if(this.x > 500){
        this.x = -30;
        this.speed =  80 + Math.floor(Math.random() * 200);
    }
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        60 + player.y > this.y){
        player.x = 202;
        player.y = 405;

    }
};

/**
*@description a function that draw enemy on the screen.
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


/**
*@description Represents a Player(model)
*@constructor
*@param {number} x - the x coordinate of the player 
*@param {number} y - the y coordinate of the player 
*/

const Player = function (x,y){
    this.x = x;
    this.y = y;
    this.player = 'images/char-boy.png';
};

/**
*@description - a method for updating the player's position
 * @param {number} dt - use the  available time delta information
*/

Player.prototype.update = function(dt){

};

/**
*@description - a function that draw player on the screen.
*/

 Player.prototype.render = function( ){
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
 };

 /**
*@description - a method that control player  movement on the screen.
*@param {Key value} keyPress - the key board key which was pressed.either,left,right,up or down.
*/

Player.prototype.handleInput = function (keyPress){
    if (keyPress == 'left' && this.x > 0){
        this.x -= 102;
    }
    if (keyPress == 'right' && this.x < 405){
        this.x += 102;
    }
    if (keyPress == 'up' && this.y > 0){
        this.y -= 83;
    }
    if (keyPress == 'down' && this.y < 405){
        this.y += 83;
    }
    if (this.y < 0){
        
        setTimeout(function(){

            player.x = 202;
            player.y = 405;     
             
        }.bind(this),1000);
    }
};


// allEnemies array use to collect all enemies
let allEnemies = [];
// the y coordinate of the enemies location
let enemyLocation = [63,147,230];

//instantiating the enemies and adding to allEnemies array
enemyLocation.forEach(function (location){
    enemy = new Enemy(0,location,200);
    allEnemies.push(enemy);
});


// creating a new player
let player = new Player(202, 405);


/**
*@description - This listens for key presses and sends the keys to  Player.handleInput() method.
*/
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
