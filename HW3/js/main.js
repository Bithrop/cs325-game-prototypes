"use strict";

function make_main_game_state( game )
{
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
		game.load.spritesheet('chicken', 'assets/chicken.png', 32, 32);
		game.load.image( 'egg', 'assets/egg.png' );
    }
    
    var bouncy;
    var cursors;
	var movLeft, movRight, movDown, movUp = false;
	var egg;
	
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'chicken' );
		egg = game.add.sprite(game.world.randomX, game.world.randomY, 'egg');
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE);
		game.physics.enable(egg, Phaser.Physics.ARCADE);
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Test test test test test!!.", style );
        text.anchor.setTo( 0.5, 0.0 );
		cursors = game.input.keyboard.createCursorKeys();
    }
    
    function update() {
		//bouncy.body.setZeroVelocity;
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
		if(movLeft)
		{
			bouncy.x -= 10;
		}
		if(movRight)
		{
			bouncy.x += 10;
		}
		if(movUp)
		{
			bouncy.y -= 10;
		}
		if(movDown)
		{
			bouncy.y += 10;
		}
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
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
