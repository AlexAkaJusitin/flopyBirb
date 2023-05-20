// Background scrolling speed
let move_speed = 3;
const audio = document.getElementById("myAudio");
const audio2 = document.getElementById("myAudio2");
// Gravity constant value
let gravity = 0.5;

// Getting reference to the bird element
let bird = document.querySelector(".bird");

// Getting bird element properties
let bird_props = bird.getBoundingClientRect();
let background = document.querySelector(".background").getBoundingClientRect();

// Getting reference to the score element
let score_val = document.querySelector(".score_val");
let message = document.querySelector(".message");
let score_title = document.querySelector(".score_title");
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// Setting initial game state to start
let game_state = "Start";

// Add an eventlistener for key presses
document.addEventListener("click", (e) => {
  // Start the game if enter key is pressed
  if (e.type == "click" && game_state != "Play") {
    document.querySelectorAll(".pipe_sprite").forEach((e) => {
      e.remove();
    });
    bird.style.top = "40vh";
    game_state = "Play";
    message.innerHTML = "";
    score_title.innerHTML = "Score : ";
    score_val.innerHTML = "0";
    play();
  }
});
function play() {
  function move() {
    // Detect if game has ended
    if (game_state != "Play") return;
    // Getting reference to all the pipe elements
    let pipe_sprite = document.querySelectorAll(".pipe_sprite");
    pipe_sprite.forEach((element) => {
      let pipe_sprite_props = element.getBoundingClientRect();
      bird_props = bird.getBoundingClientRect();

      // Delete the pipes if they have moved out
      // of the screen hence saving memory
      if (pipe_sprite_props.right <= 0) {
        element.remove();
      } else {
        // Collision detection with bird and pipes
        if (
          bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
          bird_props.left + bird_props.width > pipe_sprite_props.left &&
          bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
          bird_props.top + bird_props.height > pipe_sprite_props.top
        ) {
          // Change game state and end the game
          // if collision occurs
          game_state = "End";
          message.innerHTML = "Click To Restart";
          message.style.left = "28vw";
          audio2.play();
          if (e.type == "click") location.replace();
        } else {
          // Increase the score if player
          // has the successfully dodged the
          if (
            pipe_sprite_props.right < bird_props.left &&
            pipe_sprite_props.right + move_speed >= bird_props.left &&
            element.increase_score == "1"
          ) {
            score_val.innerHTML = +score_val.innerHTML + 1;
          }
          element.style.left = pipe_sprite_props.left - move_speed + "px";
        }
      }
    });

    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  let bird_dy = 0;
  function apply_gravity() {
    if (game_state != "Play") return;
    bird_dy = bird_dy + gravity;
    document.addEventListener("click", (e) => {
      if (e.type == "click" || e.key == " ") {
        bird_dy = -7.6;
        audio.play();
      }
    });

    // Collision detection with bird and
    // window top and bottom

    if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
      game_state = "End";
      message.style.left = "28vw";
      message.innerHTML = "Restarting...";
      location.reload();
    }
    bird.style.top = bird_props.top + bird_dy + "px";
    bird_props = bird.getBoundingClientRect();
    requestAnimationFrame(apply_gravity);
  }
  requestAnimationFrame(apply_gravity);

  let pipe_seperation = 0;

  // Constant value for the gap between two pipes
  let pipe_gap = 45;
  function create_pipe() {
    if (game_state != "Play") return;

    // Create another set of pipes
    // if distance between two pipe has exceeded
    // a predefined value
    if (pipe_seperation > 115) {
      pipe_seperation = 0;

      // Calculate random position of pipes on y axis
      let pipe_posi = Math.floor(Math.random() * 43) + 8;
      let pipe_sprite_inv = document.createElement("div");
      pipe_sprite_inv.className = "pipe_sprite";
      pipe_sprite_inv.style.top = pipe_posi - 70 + "vh";
      pipe_sprite_inv.style.left = "100vw";

      // Append the created pipe element in DOM
      document.body.appendChild(pipe_sprite_inv);
      let pipe_sprite = document.createElement("div");
      pipe_sprite.className = "pipe_sprite";
      pipe_sprite.style.top = pipe_posi + pipe_gap + "vh";
      pipe_sprite.style.left = "100vw";
      pipe_sprite.increase_score = "1";

      // Append the created pipe element in DOM
      document.body.appendChild(pipe_sprite);
    }
    pipe_seperation++;
    requestAnimationFrame(create_pipe);
  }
  requestAnimationFrame(create_pipe);
}
// inside main_javascript.js

var can = document.getElementById("canvas1");

// The 2D Context for the HTML canvas element. It
// provides objects, methods, and properties to draw and
// manipulate graphics on a canvas drawing surface.
var ctx = can.getContext("2d");

// canvas width and height
can.width = 1920;
can.height = 1080;

// create an image element
var img = new Image();

// specify the image source relative to the html or js file
// when the image is in the same directory as the file
// only the file name is required:
img.src = "Background-5997771.png";

// window.onload is an event that occurs when all the assets
// have been successfully loaded( in this case only the spacebg.png)
window.onload = function () {
  // the initial image height
  var imgHeight = 0;
  var imgWidth = 0;
  // the scroll speed
  // an important thing to ensure here is that can.height
  // is divisible by scrollSpeed
  var scrollSpeed = 2;

  // this is the primary animation loop that is called 60 times
  // per second
  function loop() {
    // draw image 1
    ctx.drawImage(img, imgWidth, 0);

    // draw image 2
    ctx.drawImage(img, imgWidth - can.width, 0);

    // update image height
    imgWidth += scrollSpeed;

    //resetting the images when the first image entirely exits the screen
    if (imgWidth == can.width) imgWidth = 0;

    // this function creates a 60fps animation by scheduling a
    // loop function call before the
    // next redraw every time it is called
    window.requestAnimationFrame(loop);
  }

  // this initiates the animation by calling the loop function
  // for the first time
  loop();
};
