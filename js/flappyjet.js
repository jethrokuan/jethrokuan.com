var height = $( window ).height();
var width = $( window ).width();

var game = new Phaser.Game(width, height, Phaser.AUTO, "phaser");

// Create our 'main' state that will contain the game
var mainState = {
  preload: function() { 
    // Load the bird sprite
    game.load.image('pipe', '/images/pipe.png');
    this.pipes = game.add.group(); 
    game.load.image('bird', '/images/flappyjet.png'); 
  },

  addOnePipe: function(x, y) {
    // Create a pipe at the position x and y
    var pipe = game.add.sprite(x, y, 'pipe');

    // Add the pipe to our previously created group
    this.pipes.add(pipe);

    // Enable physics on the pipe 
    game.physics.arcade.enable(pipe);

    // Add velocity to the pipe to make it move left
    pipe.body.velocity.x = -200 - (width/8);
    
    // Automatically kill the pipe when it's no longer visible 
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },

  addRowOfPipes: function() {
    numPipes = Math.floor(height/19);
    holesize = Math.floor(numPipes / 3.5);
    console.log(numPipes);
    // This will be the hole position
    var hole = Math.floor(Math.random() * (numPipes-5)) + 1;

    // With one big hole at position 'hole' and 'hole + 1'
    var list = [];
    for (var i = 0; i <= holesize; i++) {
      list.push(hole + i);
    }
    
    for (var i = 0; i < numPipes; i++)
      if (-1 == $.inArray(i, list)) {
        this.addOnePipe(width, i * 19);
      }
    this.score += 1;
    this.labelScore.text = this.score;
  },

  create: function() { 
    // Change the background color of the game to blue
    game.stage.backgroundColor = '#71c5cf';

    // Set the physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Display the bird at the position x=100 and y=245
    this.bird = game.add.sprite((width/20), (height/2), 'bird');

    // Add physics to the bird
    // Needed for: movements, gravity, collisions, etc.
    game.physics.arcade.enable(this.bird);

    // Add gravity to the bird to make it fall
    this.bird.body.gravity.y = 1000;  

    // Call the 'jump' function when the spacekey is hit
    var spaceKey = game.input.keyboard.addKey(
      Phaser.Keyboard.SPACEBAR);
    game.input.onTap.add(this.jump, this);
    spaceKey.onDown.add(this.jump, this);

    this.timer = game.time.events.loop(1000, this.addRowOfPipes, this);

    this.score = 0;
    this.labelScore = game.add.text(20, 20, "0", 
                                    { font: "30px Arial", fill: "#ffffff" });   
  },

  update: function() {
    // If the bird is out of the screen (too high or too low)
    // Call the 'restartGame' function
    if (this.bird.y < 0 || this.bird.y > height)
      this.restartGame();

    game.physics.arcade.overlap(
      this.bird, this.pipes, this.restartGame, null, this);
  },

  // Make the bird jump 
  jump: function() {
    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;
  },

  // Restart the game
  restartGame: function() {
    // Start the 'main' state, which restarts the game
    game.state.start('main');
  },
};

// Add and start the 'main' state to start the game
game.state.add('main', mainState);  
game.state.start('main');
