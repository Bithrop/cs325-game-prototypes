"use strict";

function make_main_game_state( game )
{
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
		game.load.spritesheet('chicken', 'assets/chicken.png', 32, 32);
		game.load.image( 'egg', 'assets/egg.png' );
		//game.load.audio('cock', 'assets/Cockadoodledoo-sound.mp3');
		game.load.image('farm', 'assets/farm.png');
		game.load.spritesheet('farmer', 'assets/oldman_walk_sheet.png', 64, 64);
		game.load.image('bullet', 'assets/new_bullet.png');
		game.load.image('crow', 'assets/raven-black0001.png');
		game.load.image('peas1', 'assets/peas3.png' );
    }
    
    var bouncy;
    var cursors;
	var score = 0;
	var speed = 5;
	var noise;
	var farm;
	var farmer;
	var crow;
	var crows;
	//for shooting stuff
	var bullets;
	var fireRate = 100;
	var nextFire = 0;
	var texts;
	var peas;
	var wave = 1;
	var waveText;
	var style;
	
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
		//noise = game.add.audio('cock');
		farm = game.add.sprite(game.world.centerX, game.world.centerY, 'farm');
		farm.anchor.setTo( 0.5, 0.5 );
		//noise.addMarker('cock', 0, 5.0);
        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'farmer' );
		peas = game.add.sprite( game.world.centerX, 500, 'peas1' );
		peas.anchor.setTo(0.5,0.5);
		peas.scale.setTo(0.05,0.05);
		game.physics.enable(peas, Phaser.Physics.ARCADE);
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.5, 0.5 );
		bouncy.enableBody = true;
		//used for reseting eggs, may make more.
		
        //for testing
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE);
		
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
		bouncy.angle = 45;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        style = { font: "25px Verdana", fill: "#9912rq", align: "center" };
        
		cursors = game.input.keyboard.createCursorKeys();
		
		//shooting stuff for create
		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;

		bullets.createMultiple(50, 'bullet');
		bullets.setAll('checkWorldBounds', true);
		bullets.setAll('outOfBoundsKill', true);
		
		
		
		//crow = game.add.sprite( 500, 500, 'crow' );
		//crow.scale.setTo(0.1,0.1);
		//game.physics.enable(crow, Phaser.Physics.ARCADE);
		//game.physics.arcade.moveToXY(crow,0,0,400);
		
		crows = game.add.group();
		createCrows();
		//var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
		 texts = game.add.text( game.world.centerX, 15, "Score!!: " + score, style );
        texts.anchor.setTo( 0.5, 0.0 );
		waveText = game.add.text( 60, 15, "Wave " + wave, style );
		waveText.anchor.setTo( 0.5, 0.0 );
    }
    
	
	
	function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(bouncy.x - 8, bouncy.y - 8);
		bullet.scale.setTo(0.75,0.75);
        game.physics.arcade.moveToPointer(bullet, 300);
    }

}
	
	
	function createCrows()
	{
		
		for(var i = 0; i < 4; i++)
		{
			var crow = crows.create(i * 100, 100, 'crow');
			crow.scale.setTo(0.1,0.1);
			game.physics.enable(crow, Phaser.Physics.ARCADE);
			game.physics.arcade.moveToXY(crow,game.world.centerX,500,300);
		}
		
	}
	
	function collisionHandler(bullet, crow)
	{
		bullet.kill();
		crow.kill();
		score = score + 10;
		texts.setText("Score: " + score);
		
		if (crows.countLiving() == 0)
		{
			wave++;
			waveText.setText("Wave " + wave);
			createCrows();
		}
		
	}
	
	function GameOver (peas, crow)
	{
		crows.removeAll();
		peas.kill()
		var overText = game.add.text( game.world.centerX, game.world.centerY, "Game Over: \n The crows eat your peas!", style );
		overText.anchor.setTo( 0.5, 0.0 );
	}
	
	
    function update() {
		//bouncy.body.setZeroVelocity;
		
		
		bouncy.rotation = game.physics.arcade.angleToPointer(bouncy);
		//if statements for checking if it should switch to be going down, up, left or right
		if(cursors.left.isDown)
		{
			bouncy.x -= speed
			console.log("help");
			
			//bouncy.body.moveLeft(400);
			
		}
		if(cursors.right.isDown)
		{
			bouncy.x += speed;
			console.log("help");
			
			//bouncy.body.moveLeft(400);
			
		}
		if(cursors.up.isDown)
		{
			bouncy.y -= speed;
			console.log("help2");
			
			//bouncy.body.moveLeft(400);
			
		}
		if(cursors.down.isDown)
		{
			bouncy.y += speed;
			console.log("help2");
			
			//bouncy.body.moveLeft(400);
			
		}
		//if statements that actually move the player
		if (game.input.activePointer.isDown)
		{
        fire();
		}
        
		//testing for kill
		game.physics.arcade.overlap(bullets, crows, collisionHandler, null, this);
		game.physics.arcade.overlap(peas, crows, GameOver, null, this);
    }
    
    return { "preload": preload, "create": create, "update": update };
}


window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game' );
    
    game.state.add( "main", make_main_game_state( game ) );
    
    game.state.start( "main" );
};
