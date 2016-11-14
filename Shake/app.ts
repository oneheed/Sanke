class SimpleGame {  
    constructor() {
        this.game = new Phaser.Game(800, 600, Phaser.AUTO, 'content', {
            preload: this.preload, create: this.create, update: this.update
        });
    }

    game: Phaser.Game;
    snakeHead: Phaser.Sprite;

    preload() {
        this.game.load.crossOrigin = "anonymous";
        this.game.load.spritesheet('food', 'http://s.ntustcoding.club/snake/foods.png', 36, 36);
        this.game.load.image('ball', 'http://s.ntustcoding.club/snake/body.png');
        this.game.load.image('ground', 'http://s.ntustcoding.club/snake/ground.png');
    }

    create() {
        var game = this.game;
        //背景(tileSprite)
        game.add.tileSprite(0, 0, 4000, 4000, 'ground');
        //邊界
        game.world.setBounds(0, 0, 4000, 4000);

        //畫蛇頭(sprite 位置 x y 圖片來源)
        this.snakeHead = game.add.sprite(400, 300, 'ball');
        this.snakeHead.anchor.setTo(0.5, 0.5);

        for (var i = 0; i < snakeSectinNum; i++) {
            snakeSection[i] = game.add.sprite(400, 300, 'ball');
            snakeSection[i].anchor.setTo(0.5, 0.5);

      //var point = new Phaser.Point(snakeSection[i].x, snakeSection[i].y);
      //snakePath[i] = point;
      //snakePath[i] = snakeSection[i];
      //console.log(snakePath[i].x, snakePath[i].y);
      //game.physics.enable(snakeSection[i], Phaser.Physics.ARCADE);
    }

    update() {

    }
}

window.onload = () => {
    var game = new SimpleGame();
};