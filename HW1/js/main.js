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
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'logo', 'assets/phaser.png' );
		game.load.image( 'Ghost2', 'assets/Ghost2.png' );
        // load a tilemap and call it 'map'.
        // from .json file
        game.load.tilemap('map', 'assets/tilemap_example.json', null, Phaser.Tilemap.TILED_JSON);
        // alternatively, from .csv file
        //game.load.tilemap('map', 'assets/tilemap_example.csv', null, Phaser.Tilemap.CSV);
        
        //load tiles for map
        game.load.image('tiles', 'assets/tiles.png');
		game.load.image('fieldTiles', 'assets/fieldTiles.png');
    }
    
    var map;
    var layer1;
	var layer2
    var bouncy;
	var bouncy2
    
    function create() {
		
		//game.physics.startSystem(Phaser.Physics.ARCADE);
        // Create the map. 
        map = game.add.tilemap('map');
        // for csv files specify the tile size.
        //map = game.add.tilemap('map', 32, 32);
        
        //add tiles
        map.addTilesetImage('tiles');
		map.addTilesetImage('fieldTiles',null, 71,47);
		
        //test colider
		map.setCollisionBetween(0,1, true, layer1);
		
        // Create a layer from the map
        //using the layer name given in the .json file
        layer1 = map.createLayer('Tile Layer 1');
		layer2 = map.createLayer('Tile Layer 2');
        //for csv files
        //layer1 = map.createLayer(0);
        
        //  Resize the world
        layer1.resizeWorld();
		layer2.resizeWorld();
		
		//map collision
        //map.setCollisionBetween(0, 12, true, layer2);
        // Create a sprite at the center of the screen using the 'logo' image.
        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'Ghost2' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.5, 0.5 );
        
		bouncy.scale.setTo(0.1,0.1);
		//bouncy 2 for testing collide
		bouncy2 = game.add.sprite( 300, 400, 'logo' );
		
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
		game.physics.enable( bouncy2, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
		bouncy2.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( 400, 15, "Test test test test!!!!!!", style );
        text.fixedToCamera = true;
        text.anchor.setTo( 0.5, 0.0 );
        
        game.camera.follow(bouncy);
        
		
		
		//this.physics.add.collider(bouncy, bouncy2);
    }
    
    function update() {
		//added colision to layer2
		game.physics.arcade.collide(bouncy, bouncy2);
		//game.physics.accade.collide(bouncy, layer1);
		
		
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
		
    }
};
