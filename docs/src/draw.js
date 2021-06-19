import vec3 from './maths.js'

class Sprite {
  constructor(name, src, pos, abs = false, size, index = 0) {
    this.name = name
    this.img = new Image()
    this.img.src = src
    this.abs = abs
    this.pos = pos
    this.size = size
    this.index = index
  }

  draw(stage, ctx) {
    if (this.abs) {
      ctx.drawImage(this.img, stage.width * this.pos.x, stage.height * this.pos.y)
    } else {
      ctx.drawImage(this.img, this.pos.x, this.pos.y)
    }
  }
}

class Draw {
  constructor(stage) {
    this.stage = stage
    this.sprites = []
  }

  addSprite(name, src, pos = new vec3(), abs = false, size = new vec3(), index = 0) {
    this.sprites.push(new Sprite(name, src, pos, abs, size, index))
  }

  drawSprites() {
    if (this.stage.getContext) {
      let ctx = this.stage.getContext('2d')
      for (let i = 0; i < this.sprites.length; i++) {
        this.sprites[i].draw(this.stage, ctx)
      }
    }
  }

  removeSprite(name) {
    const id = this.sprites.find((e) => {
      return e.name == name
    })
    if (id != -1) {
      this.sprites.splice(id, 1)
    }
  }
}

export default Draw
