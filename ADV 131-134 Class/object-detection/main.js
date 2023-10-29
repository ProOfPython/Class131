data = []
img = ''
label = 0
paints = []
secs = ['00', '77', 'FF']
stat = false
Xs = []

function modelLoaded(){console.log('Model is loaded.'); stat = true;}
function gotResult(error, results){if (error){console.log(error)}; console.log(results); data = results}
function preload(){img = loadImage('catNdog.jpg')}
function importImg(){
    img = loadImage(document.getElementById('imgFile').files[0])
    /* console.log(document.getElementById('imgFile').files[0]) */
    objDetect.detect(img, gotResult)
}

function setup(){
    canvas = createCanvas(640, 420)
    canvas.center();
    objDetect = ml5.objectDetector('cocossd', modelLoaded)
    objDetect.detect(img, gotResult)
}

function getPaint(){
    paint = '#'
    for (i = 0; i < 3; i++){
        part = secs[round(Math.random() * 100 / 33)]
        paint += part
    }
    return paint
}

function draw(){
    image(img, 0, 0, 640, 420)
    if (stat == true) {
        for (i = 0; i < data.length; i++){
            x = data[i].x
            y = data[i].y
            w = data[i].width
            h = data[i].height * 0.875
            c = data[i].confidence
            l = data[i].label
            
            if (Xs.includes(x)){
                paint = paints[Xs.indexOf(x)]
            } else {
                Xs.push(x)
                paint = getPaint()
                paints.push(paint)
            }
            
            fill(paint)
            stroke(paint)
            noFill()
            rect(x, y, w, h)
            text(l + ' (' + (floor(c * 100)) + '%)', x + 15, y + 20)
        }
    }
}