let time = 0;
let wave = [];
let sliderSeries;
let sliderTime;

function setup() {
    createCanvas(600, 400);
    sliderSeries = createSlider(1, 20, 5);
    sliderTime = createSlider(1, 100, 50);
}

function draw() {
    background(25);
    translate(150, 200);

    let x = 0;
    let y = 0;

    for (let i = 0; i < sliderSeries.value(); i++) {
        let prevx = x;
        let prevy = y;

        let n = i * 2 + 1;
        let radius = 75 * (4 / (n * PI));
        x += radius * cos(n * time);
        y += radius * sin(n * time);

        stroke(255, 100);
        noFill();
        ellipse(prevx, prevy, radius * 2);

        stroke(255);
        line(prevx, prevy, x, y);
    }
    wave.unshift(y);
    
    translate(200, 0);
    line(x - 200, y, 0, wave[0]);
    beginShape();
    noFill();
    for (let i = 0; i < wave.length; i++) {
        vertex(i, wave[i]);        
    }
    endShape();

    time += map(sliderTime.value(), 1, 100, 0.001, 0.1)

    if (wave.length > 250) {
        wave.pop();
    }

    translate(-350, -190);
    text(`Series: ${sliderSeries.value()}`, 10, 10);
    text(`Speed: ${sliderTime.value()}`, 10, 25);
}