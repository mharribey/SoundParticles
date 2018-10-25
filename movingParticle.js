class movingParticle {
  constructor(canvasWidth, canvasHeight) {
    this.x = getRandomInt(canvasWidth) + 1
    this.y = getRandomInt(canvasHeight) + 1
    this.vx = getRandomInt(3) + 1
    this.vy = getRandomInt(3) + 1

    this.position = vec2.fromValues(this.x, this.y)
    this.direction = vec2.fromValues(this.vx, this.vy)
  }

  update() {
    const x = this.position[0] + this.direction[0]
    if (x > canvas.width || x < 0) {
      this.direction[0] = -this.direction[0]
    }

    const y = this.position[1] + this.direction[1]
    if (y > canvas.height || y < 0) {
      this.direction[1] = -this.direction[1]
    }

    vec2.add(this.position, this.position, this.direction)
  }

  draw(ctx, colors, frequences) {
    this.update()

    ctx.save()
    ctx.fillStyle = `rgba(${colors[getRandomInt(9)]},0.6`
    ctx.translate(this.position[0], this.position[1])
    ctx.beginPath()
    ctx.arc(0, 0, frequences[808] / 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  // Uncomment to enable links between particles
  // link(ctx, p, dist, colors) {
  //   let opacity = 1 - dist / 60
  //
  //   ctx.beginPath()
  //   ctx.lineWidth = 2
  //   ctx.moveTo(this.position[0], this.position[1])
  //   ctx.lineTo(p.position[0], p.position[1])
  //   ctx.strokeStyle = `rgba(${colors[getRandomInt(9)]},${opacity})`
  //   ctx.stroke()
  //   ctx.closePath()
  // }
}
