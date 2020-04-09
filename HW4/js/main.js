"use strict";

function make_main_game_state( game )
{
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
		game.load.spritesheet('chicken', 'assets/chicken.png', 32, 32);
		game.load.image( 'egg', 'assets/egg.png' );
		game.load.audio('cock', 'assets/Cockadoodledoo-sound.mp3');
		game.load.image('farm', 'assets/farm.png');
    }
    
    var bouncy;
    var cursors;
	var movLeft, movRight, movDown, movUp = false;
	var eggs;
	var egg;
	var score = 0;
	var speed = 5;
	var texts;
	var noise;
	var farm
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
		noise = game.add.audio('cock');
		farm = game.add.sprite(game.world.centerX, game.world.centerY, 'farm');
		farm.anchor.setTo( 0.5, 0.5 );
		noise.addMarker('cock', 0, 5.0);
        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'chicken' );
		egg = game.add.sprite(game.world.randomX, game.world.randomY, 'egg');
		egg.anchor.setTo(0.5,0.5);
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.5, 0.5 );
		bouncy.enableBody = true;
		//used for reseting eggs, may make more.
		
        //for testing
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE);
		game.physics.enable(egg, Phaser.Physics.ARCADE);
        // Make it bounce off of the world bounds.
        //bouncy.body.collideWorldBounds = true;
		
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        texts = game.add.text( game.world.centerX, 15, "Total eggs got: " + score , style );
        texts.anchor.setTo( 0.5, 0.0 );
		cursors = game.input.keyboard.createCursorKeys();
    }
    
	function eggGet(bouncy, egg)
	{
		
		egg.kill();
		score++;
		speed++;
		console.log("egg: " + score);
		egg.reset(game.world.randomX, game.world.randomY);
		egg.anchor.setTo(0.5,0.5);
		noise.play('cock');
		texts.setText("Total eggs got: " + score);
	}
	
	function chickenLose(bouncy)
	{
		console.log("chicken is dead!!!!!!!!!!!!");
		var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
		var over = game.add.text(game.world.centerX, game.world.centerY, "Game Over", style);
		bouncy.kill();
	}
	
    function update() {
		//bouncy.body.setZeroVelocity;
		game.physics.arcade.overlap(bouncy, egg, eggGet, null, this);
		bouncy.events.onOutOfBounds.add(chickenLose,this);
		//if statements for checking if it should switch to be going down, up, left or right
		if(cursors.left.isDown)
		{
			movLeft = true;
			movUp = false
			movDown = false;
			movRight = false;
			console.log("help");
			
			//bouncy.body.moveLeft(400);
			
		}
		if(cursors.right.isDown)
		{
			movRight = true;
			movDown = false;
			movUp = false;
			movLeft = false;
			console.log("help");
			
			//bouncy.body.moveLeft(400);
			
		}
		if(cursors.up.isDown)
		{
			movRight = false;
			movLeft = false;
			movDown = false;
			movUp = true;
			console.log("help2");
			
			//bouncy.body.moveLeft(400);
			
		}
		if(cursors.down.isDown)
		{
			movRight = false;
			movLeft = false;
			movUp = false;
			movDown = true;
			console.log("help2");
			
			//bouncy.body.moveLeft(400);
			
		}
		//if statements that actually move the player
		if(movLeft)
		{
			bouncy.x -= speed;
			console.log("" + bouncy.x);
		}
		if(movRight)
		{
			bouncy.x += speed;
		}
		if(movUp)
		{
			bouncy.y -= speed;
		}
		if(movDown)
		{
			console.log("" + bouncy.y);
			bouncy.y += speed;
		}
        
		//testing for kill
		if((bouncy.x <( game.world.length - 20)) || (bouncy.x > 820) || (bouncy.y > 620) || (bouncy.y < 0))
		{
			console.log("chicken is dead!!!!!!!!!!!!");
			var style = { font: "25px Verdana", fill: "#9509cf", align: "center" };
			var over = game.add.text(game.world.centerX - 110, game.world.centerY, "Better luck next time\n Your score is: " + score, style);
			bouncy.kill();
			texts.kill();
		}
		
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
