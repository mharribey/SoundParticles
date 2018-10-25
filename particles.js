class Particle {
  constructor(x, y, colors) {
    this.radius = 6
    this.x = x
    this.y = y
    this.colors = colors
  }

  update(frequence) {
    this.radius = frequence / 10
  }

  draw(ctx, frequence, stroke) {
    const randomColor = this.colors[getRandomInt(5)]
    this.update(frequence)

    ctx.beginPath()
    ctx.fillStyle = randomColor
    ctx.strokeStyle = randomColor
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    if (stroke == true) {
      ctx.stroke()
    } else {
      ctx.fill()
    }
    ctx.closePath()
  }
}

//tools
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}
