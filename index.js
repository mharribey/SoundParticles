// dom elements
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let start = document.getElementById('start')
let title = document.getElementById('title')
// let bg = document.getElementById('bg')
let duration = document.getElementById('duration')

// init
canvas.style.width = window.innerWidth
canvas.style.height = window.innerHeight

document.addEventListener('resize', resize())

let canvasWidth = canvas.width
let canvasHeight = canvas.height
let CENTER_X = canvas.width / 2
let CENTER_Y = canvas.height / 2

// var
let particles = []
let fbc_array = []
let list_of_freq = [808, 700, 640, 589, 560, 500, 458, 400, 389, 354, 329]
let COLORS = [
  '#F0C5CE',
  '#BDD2B9',
  '#A2283B',
  '#78CCB6',
  '#8DA7A0',
  '#98B0DC',
  '#96D1EE',
  '#ECE2C3',
  '#F7CE65'
]
let dur = 0
let mouse = {
  x: 0,
  y: 0
}
let biquadFilter = null
let contextAudio = null

function initShapes(frequences, centerX, centerY) {
  let NUMBER_CIRCLES = 10
  let NUMBER_PARTICLES = 30

  let diff = 30 + frequences[808] / 8

  for (let i = 1; i < NUMBER_CIRCLES; i++) {
    for (let k = 0; k < 2; k++) {
      let stroke = k == 0 ? true : false
      let radius =
        k == 1
          ? i % 2 == 0 ? -i * diff : i * diff
          : i % 2 == 0 ? -i * diff + 5 : i * diff + 5
      const NUMBER_PARTICLES = 15
      const freq = frequences[list_of_freq[NUMBER_CIRCLES - i]]
      for (let j = 1; j <= NUMBER_PARTICLES; j++) {
        let angle = 2 * Math.PI * j / NUMBER_PARTICLES

        let x = CENTER_X + Math.cos(angle) * radius
        let y = CENTER_Y + Math.sin(angle) * radius

        let circle = new Particle(x, y, COLORS)
        circle.draw(ctx, freq, stroke)
      }
    }
  }
}

function randomShapes(frequences) {
  if (frequences[707] > 40) {
    ctx.beginPath()
    ctx.strokeFill = `rgba(${COLORS[2]},0.5)`
    ctx.arc(
      getRandomInt(canvas.width),
      getRandomInt(canvas.height),
      getRandomInt(50),
      0,
      Math.PI * 2
    )
    ctx.stroke()
  }
}

function enableFilter() {
  biquadFilter.type = 'lowshelf'
  biquadFilter.frequency.setValueAtTime(mouse.x, contextAudio.currentTime)
  biquadFilter.gain.setValueAtTime(mouse.y / 20, contextAudio.currentTime)
}

function randomParticles() {
  particles.forEach(el => {
    ctx.beginPath()
    el.draw(ctx, COLORS, fbc_array)
  })

  // Uncomment to enable links between particles
  // for (let i = 0; i < particles.length; i++) {
  //   for (let j = 0; j < particles.length; j++) {
  //     const dist = vec2.dist(particles[i].position, particles[j].position)
  //     if (dist < 40 && i !== j) {
  //       particles[i].link(ctx, particles[j], dist, COLORS)
  //     }
  //   }
  // }
}

function initAudio() {
  var audio = new Audio()
  audio.src = 'sound.mp3'
  audio.loop = false
  audio.autoplay = true
  audio.load()

  audio.addEventListener('loadedmetadata', function() {
    setInterval(function() {
      duration.style.width = dur + '%'
      if (dur <= 99.8) {
        dur += 1 / audio.duration // 1/2secondesa
      } else {
        canvas.classList.toggle('display-none')
      }
    }, 10)
  })

  contextAudio = new AudioContext() // AudioContext object instance
  analyser = contextAudio.createAnalyser() // AnalyserNode method
  biquadFilter = contextAudio.createBiquadFilter()

  source = contextAudio.createMediaElementSource(audio)
  source.connect(analyser)
  source.connect(biquadFilter)

  analyser.connect(contextAudio.destination)
  biquadFilter.connect(contextAudio.destination)

  animate()
}

function animate() {
  fbc_array = new Uint8Array(analyser.frequencyBinCount)
  analyser.getByteFrequencyData(fbc_array)

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  initShapes(fbc_array, CENTER_X, CENTER_Y)
  randomShapes(fbc_array)

  if (fbc_array[800] > 80 && particles.length < 100) {
    particles.push(new movingParticle(canvasWidth, canvasHeight))
  }

  randomParticles()
  enableFilter()
  requestAnimationFrame(animate)
}

// run
start.addEventListener('click', () => {
  start.style.animation = 'fadeOut 2s forwards'
  title.style.animation = 'fadeOut 1s forwards'
  setTimeout(() => {
    start.remove()
    title.remove()
    canvas.classList.toggle('display-none')
    initAudio()
  }, 2000)
})

// tools
function resize() {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}

document.addEventListener('mousemove', el => {
  mouse = {
    x: el.x,
    y: el.y
  }
})
