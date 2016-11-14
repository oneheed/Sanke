let snakeSectinNum: number = 5;
let snakeSpacer: number = 6;
let snakeHead: Phaser.Sprite;
let snakeSection: Array<Phaser.Sprite> = [];
let snakePath: Array<Phaser.Point> = [];

class SimpleGame {  
    game: Phaser.Game;
   
    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            preload: this.preload,
            create: this.create,
            update: this.update,
            move: this.move
        });
    }

    preload() {
        this.game.load.crossOrigin = "anonymous";
        this.game.load.spritesheet('food', 'http://s.ntustcoding.club/snake/foods.png', 36, 36);
        this.game.load.image('ball', 'http://s.ntustcoding.club/snake/body.png');
        this.game.load.image('ground', 'http://s.ntustcoding.club/snake/ground.png');
    }

    create() {
        //背景(tileSprite)
        this.game.add.tileSprite(0, 0, 4000, 4000, 'ground');
        //邊界
        this.game.world.setBounds(0, 0, 4000, 4000);

        //畫蛇頭(sprite 位置 x y 圖片來源)
        snakeHead = this.game.add.sprite(400, 300, 'ball'); 
        snakeHead.anchor.setTo(0.5, 0.5);

        for (var i = 0; i < snakeSectinNum; i++) {
            snakeSection[i] = this.game.add.sprite(400-10*i, 300, 'ball');
            snakeSection[i].anchor.setTo(0.5, 0.5);
        }

        //物理引擎(啟用物理引擎)
        this.game.physics.enable(snakeHead, Phaser.Physics.ARCADE);

        //是否蛇頭穿越邊界
        snakeHead.body.collideWorldBounds = true;

        //照相機
        this.game.camera.follow(snakeHead);
    }

    move() {
        // 改變蛇頭方向,自轉角度(自己角度)
        //snakeHead.rotation += 0.1;
        //console.log(this.snakeSpacer);
        //取得面相滑鼠的方位
        snakeHead.rotation = this.game.physics.arcade.angleToPointer(snakeHead);

        //蛇頭前進(速度)
        if (this.game.input.activePointer.leftButton.isDown) {
            snakeHead.body.velocity = this.game.physics.arcade.velocityFromRotation(snakeHead.rotation, 500);
        } else {
            snakeHead.body.velocity = this.game.physics.arcade.velocityFromRotation(snakeHead.rotation, 200);
        }

        var point = new Phaser.Point(snakeHead.x, snakeHead.y);
        snakePath.unshift(point);

        if (snakeSectinNum * snakeSpacer < snakePath.length) {
            snakePath.pop();
        }

        var tempSectinNum = Math.floor(snakePath.length / snakeSpacer);

        for (var i = 0; i < snakeSectinNum; i++) {
            var snakeIndex = tempSectinNum == 0 ? 0 : (i + 1) * tempSectinNum - 1;
            snakeSection[i].rotation = snakeHead.rotation;
            snakeSection[i].x = snakePath[snakeIndex].x;
            snakeSection[i].y = snakePath[snakeIndex].y;
        }
    }

    update() {
        this.move();
    }
}

window.onload = () => {
    var game = new SimpleGame();
};