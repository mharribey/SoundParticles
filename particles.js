class Particle {
  constructor(x, y, colors) {
    this.radius = 6
    this.x = x
    this.y = y
    this.colors = colors
  }

  update(frequence) {
    this.radius = frequence / 11
  }

  draw(ctx, frequence, stroke, number) {
    const color = number < 10 ? this.colors[number] : this.colors[1]
    this.update(frequence)

    ctx.beginPath()
    ctx.fillStyle = color
    ctx.strokeStyle = color
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
