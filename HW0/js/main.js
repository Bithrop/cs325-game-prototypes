"use strict";

function make_main_game_state( game )
{
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'Ghost2', 'assets/Ghost2.png' );
		game.load.image('sky', 'assets/sky3.png');
		game.load.image('luigi2', 'assets/luigi2.png');
    }
    
    var bouncy;
    var luigi;
    function create() {
		
		
		
		//Adding a sky backround
		var sky = this.add.image(0,1, 'sky');
        // Create a sprite at the center of the screen using the 'logo' image.
        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'Ghost2' );
		//add a luigi to later be killed
		luigi = game.add.sprite(500,500,'luigi2');
		luigi.scale.setTo(0.1,0.1);
		
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.5, 0.5 );
        
		
		
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
        bouncy.scale.setTo(0.05,0.05);
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Kill all Luigis.", style );
        text.anchor.setTo( 0.5, 0.0 );
		
		
		
		
		
		
    }
    
    function update() {
		
		
		
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 100, 100, 400 );
		
		//update for overlap
		game.physics.arcade.overlap(bouncy, luigi, killLuigi(luigi), null, this);
		
    }
    
    return { "preload": preload, "create": create, "update": update };
}

    function killLuigi(luigi) 
	{
		
		luigi.scale.setTo(1,1);
		//var text = game.add.text(game.world.centerX , 20 , "You did it!", style);
		//luigi.kill;
		
		
		
		
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
