const planetsParameters = [
    {name: "mercury", radius: 100, velocity: 47.9, size: 10},
    {name: "venus", radius: 125, velocity: 35, size: 20},
    {name: "earth", radius: 150, velocity: 29.8, size: 25},
    {name: "mars", radius: 175, velocity: 24, size: 20},
    {name: "jupiter", radius: 250, velocity: 13, size: 45},
    {name: "saturn", radius: 300, velocity: 10, size: 40},
    {name: "uranus", radius: 350, velocity: 7, size: 30},
    {name: "neptune", radius: 400, velocity: 6, size: 25},
]

function Planet({name, radius, velocity, size}) {
    this.planetElement = document.getElementById(name);
    this.pos = Math.random() * (10);
    this.radius = radius;
    this.velocity = velocity;
    this.sizePlanet = size;
}

Planet.prototype.updatePosition = function () {
    const {pos, radius, velocity, sizePlanet} = this;
    const updatedPosition = pos + (Math.PI * (velocity / 5000));
    const x = Math.cos(updatedPosition) * radius - sizePlanet / 2;
    const y = Math.sin(updatedPosition) * radius - sizePlanet / 2;

    this.pos = updatedPosition;
    this.planetElement.style.top = x + 'px';
    this.planetElement.style.right = y + 'px';
}

Planet.prototype.resetPosition = function () {
    this.pos = 0;
    this.updatePosition();
}

const planets = [];

function createPlanets() {
    for (let i = 0; i < planetsParameters.length; i++) {
        const planet = new Planet(planetsParameters[i]);
        // set initial position
        planet.updatePosition();
        planets.push(planet);
    }
}

createPlanets();

let reqAnimationId;

function animatePlanets() {
    for (let i = 0; i < planets.length; i++) {
        const currentPlanet = planets[i];
        currentPlanet.updatePosition();
    }

    // call the animatePlanets function again!
    reqAnimationId = requestAnimationFrame(animatePlanets);
}

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const tg1 = document.getElementById("tg1");
const vk1 = document.getElementById("vk1");

// Event listener for the start button.
startBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // Start the animation.
    if (reqAnimationId) {
        cancelAnimationFrame(reqAnimationId)
    }
    reqAnimationId = requestAnimationFrame(animatePlanets)
});

// Event listener for the stop button.
stopBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // Stop the animation;
    cancelAnimationFrame(reqAnimationId)
});

// Event listener for the reset button.
resetBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // Stop the animation;
    cancelAnimationFrame(reqAnimationId)
    // Reset positions;
    for (let i = 0; i < planets.length; i++) {
        const currentPlanet = planets[i];
        currentPlanet.resetPosition();
    }
});