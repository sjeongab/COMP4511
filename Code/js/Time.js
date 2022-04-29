var clock = new THREE.Clock();
var timeText;

function displayTime() {
    clock.start();
    timeText = document.createElement('div');
    timeText.id = "time";
    timeText.style.position = 'absolute';
    timeText.style.width = 100;
    timeText.style.height = 100;
    timeText.innerHTML = "Time: " + (timeLimit - Math.trunc(clock.getElapsedTime()));
    timeText.style.top = 70 + 'px';
    timeText.style.left = 680 + 'px';
    timeText.style.color = 'black';
    timeText.style.fontWeight = 'bold';
    timeText.style.fontSize = '20px';
    timeText.style.fontFamily = 'Fantasy';
    document.body.appendChild(timeText);
}

function updateTime() {
    document.getElementById("time").innerHTML = "Time: " + (timeLimit - 1 - Math.trunc(clock.getElapsedTime()));
}