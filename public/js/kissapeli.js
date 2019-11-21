
// var Määrittää asioita
var taustakuva;
var kissakuva;
var lautan_y = 340;
var lautan_leveys = 80;
var painovoima = 0.05;
var kissalista = [];
var taustan_leveys = 800;
var taustan_korkeus = 400;
var kissahautomoTimer;
var score = 0;
var health = 3;

// preload Tapahtuu kun peli käynnistyy
function preload() {
  taustakuva = loadImage('https://igno.cc/opetus/kuvat/tausta.png');
  kissakuva = loadImage('https://igno.cc/opetus/kuvat/cat.png');
}

// Piirtää Kanvaasin ja luo Kissan
function setup() {
   var canvas = createCanvas(windowWidth, windowWidth / 3);
   canvas.parent('kissapeli_paikka');
   angleMode(DEGREES);

}

function startGame()
{
  score = 0;
  health = 3;
  kissalista =[];
  clearTimeout(kissahautomoTimer);
  loop()
  kissahautomo();
}

// function draw piirtää kanvaasille kuva/FPS
function draw() {
  // image piirtää taustakuvan
   image(taustakuva, 0, 0, windowWidth, windowWidth / 3);
   // luo_lautta piirtää lautan
   luo_lautta(windowWidth);
   // kissa_olio.liikuta liikuttaa kissaa

  kissalista.forEach(function(kissa_olio, i){
    kissa_olio.liikuta(windowWidth);
    if(kissa_olio.kissan_Y > windowWidth / 3){
      kissalista.splice(i, 1);
      health = health - 1;

      if(health == 0){
        GameOver();
      }
    }
    if(kissa_olio.kissan_X > windowWidth){
      kissalista.splice(i, 1);
      score = score + 10;
    }
    textSize(32);
    text('SCORE: '+ score, 10, 30);
    textSize(32);
    text('HEALTH: '+ health, 10, 60);
  });
}

// Tekee lautan jolla kissoja pomputetaan
function luo_lautta(windowWidht){
   colorMode(HSB);
   fill(255, 204, 100);
   // Asettaa lautan koordinaatit ja asettaa hiiren X koordinaatin liikutuksen alaiseksi
   rect(mouseX, windowWidht /3 -50, lautan_leveys, 25, 50, 50 ,0, 0);
}

function kissahautomo(){
  let kissa_olio = new Kissa();
  var timeout = random(500, 5000);
  kissalista.unshift(kissa_olio);
  kissahautomoTimer = setTimeout(kissahautomo, 2000)
}

  // Luo luokan "Kissa"
  class Kissa{
    // Luo kissan koordinaatit
   constructor(){
     this.kissan_X = 30;
     this.kissan_Y = 200;
     this.kissan_korkeus = 50;
     this.kissan_leveys = 50;
     this.kissan_nopeusY = random(-1, -5);
     this.kissan_nopeusX = random(1, 5);
     this.kulma = 0;
   }

   // Liikutetaan kissaa/FPS
     liikuta(windowWidht){

       this.kissan_X = this.kissan_X + this.kissan_nopeusX;

       this.kissan_nopeusY = this.kissan_nopeusY + painovoima;

       if(this.kissan_Y + this.kissan_korkeus /2 > windowWidht / 3 -50){
         if(this.kissan_X + this.kissan_leveys > mouseX && this.kissan_X < mouseX + lautan_leveys){
         this.kissan_nopeusY = -abs(this.kissan_nopeusY);
         }
       }

this.kissan_Y = this.kissan_Y + this.kissan_nopeusY;
this.kulma = this.kulma + 10;

push();
translate(this.kissan_X, this.kissan_Y);
rotate(this.kulma);
imageMode(CENTER);
image(kissakuva, 0, 0, this.kissan_leveys, this.kissan_korkeus);
pop();


   }
 }

  function GameOver() {

    push();
    noLoop();
    textAlign(CENTER);
    textSize(60);
    text("GAME OVER", windowWidth / 2, windowWidth /2 /3);
    pop();
    clearTimeout(kissahautomoTimer);

  }
