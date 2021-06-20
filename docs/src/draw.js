import vec3 from './maths.js'

class Sprite {
  constructor(name, src, pos, pos_abs = false, size = new vec3(1, 1, 1), size_abs = true, num_frame = 1, index = 0) {
    this.name = name
    this.img = new Image()
    this.img.src = src
    this.pos = pos
    this.pos_abs = pos_abs
    this.size = size
    this.size_abs = size_abs
    this.num_frame = num_frame
    this.index = index
  }

  draw(stage, ctx) {
    let pos_x = this.pos.x
    let pos_y = this.pos.y
    let size_x = this.size.x
    let size_y = this.size.y

    let frame_width = this.img.width / this.num_frame
    let frame_height = this.img.height

    if (this.pos_abs) {
      pos_x *= stage.width
      pos_y *= stage.height
    }

    if (this.size_abs) {
      size_x *= frame_width
      size_y *= frame_height
    }

    ctx.drawImage(this.img, frame_width * this.index, 0, frame_width, frame_height, pos_x, pos_y, size_x, size_y)
  }
}

class Text {
  constructor(name, text, pos, abs = false, size, color, index = 0) {
    this.name = name
    this.text = text
    this.pos = pos
    this.abs = abs
    this.size = size
    this.color = color
    this.index = index
  }

  draw(stage, ctx) {
    ctx.font = `${this.size}px Courier New`
    ctx.fillStyle = this.color
    let pos_x = this.pos.x
    let pos_y = this.pos.y

    if (this.abs) {
      pos_x *= stage.width
      pos_y *= stage.height
    }

    ctx.fillText(this.text, pos_x, pos_y)
  }
}

class Draw {
  constructor(stage) {
    this.stage = stage
    this.sprites = []
    this.texts = []
    this.background = 'rgba(0,0,0,0)'
  }

  addSprite(name, src, pos = new vec3(), pos_abs = false, size = new vec3(1, 1, 0), size_abs = true, num_frame = 1, index = 0) {
    this.sprites.push(new Sprite(name, src, pos, pos_abs, size, size_abs, num_frame, index))
  }

  getSprite(name) {
    const id = this.sprites.findIndex((e) => {
      return e.name == name
    })
    if (id > -1) {
      return this.sprites[id]
    }
    return undefined
  }

  addText(name, text, pos = new vec3(), abs = false, size = 30, color = 'white', index = 0) {
    this.texts.push(new Text(name, text, pos, abs, size, color, index))
  }

  drawSprites() {
    if (this.stage.getContext) {
      let ctx = this.stage.getContext('2d')
      ctx.fillStyle = this.background
      ctx.fillRect(0, 0, this.stage.width, this.stage.height)

      ctx.webkitImageSmoothingEnabled = false
      ctx.mozImageSmoothingEnabled = false
      ctx.imageSmoothingEnabled = false

      for (let i = 0; i < this.sprites.length; i++) {
        this.sprites[i].draw(this.stage, ctx)
      }
      for (let i = 0; i < this.texts.length; i++) {
        this.texts[i].draw(this.stage, ctx)
      }
    }
  }

  removeSprite(name) {
    const id = this.sprites.findIndex((e) => {
      return e.name == name
    })
    if (id > -1) {
      this.sprites.splice(id, 1)
    }
  }

  removeText(name) {
    const id = this.texts.findIndex((e) => {
      return e.name == name
    })
    if (id > -1) {
      this.texts.splice(id, 1)
    }
  }
}

export default Draw
