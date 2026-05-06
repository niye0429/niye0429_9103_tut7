let img; //mona lisa image

let fit = {
  x:0,
  y:0,
  w:0,
  h:0
};

let segments = [];

let drawSegments = true;
let numSegments = 50;

function preload(){
  img = loadImage("/assets/mona_lisa.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  calculateFit();

  for (let row = 0; row < numSegments; row++) {
    for (let col = 0; col < numSegments; col++) {
      segments.push(new ImageSegment(row, col));
    }
  }
}

function draw() {
  background(0);
  if (drawSegments) {
    for (const segment of segments) {
      segment.draw();
    }
  } else {
    image(img, fit.x, fit.y, fit.w, fit.h);
  }
}

function windowResize(){
  resizeCanvas(windowWidth, windowHeight);
  calculateFit();
}

function calculateFit() {
  let imgAspect = img.width / img.height;
  let canvasAspect = width / height;

  if ( imgAspect > canvasAspect){
    fit.w = width;
    fit.h = width/ imgAspect;
  } else {
    fit.h = height;
    fit.w = height * imgAspect;
  }

  fit.x = (width - fit.w) /2;
  fit.y = (height - fit.h) /2;

}

class ImageSegment {
  constructor (row,col) {
    this.row = row;
    this.col = col;

    this.colour = this.sampleColour();
  }
  sampleColour() {
    let sampleW = img.width/numSegments;
    let sampleH = img.height/numSegments;
    let x = this.col * sampleW + sampleW /2; //middle of each segment
    let y = this.row * sampleH + sampleH /2;
  return img.get(x,y);
  }

  draw() {
    let w = fit.w/numSegments;
    let h = fit.h/numSegments;

    let x = fit.x + this.col * w;
    let y = fit.y + this.row * h;

    stroke(0);
    fill(this.colour);
    rect(x,y,w,h);
  }
}
