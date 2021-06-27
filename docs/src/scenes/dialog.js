import vec3 from '../maths.js'

class Dialog {
  constructor(name, sprites, dialogs, viewer, draw, player) {
    this.name = name
    this.states = { dialog: 0, frame: 0, text: 0, sprite_timer: 0, writing: false }

    this.initialize = function () {
      player.lock_move = true
      player.lock_camera = true

      for (let i in sprites) {
        draw.addSprite(`${this.name}_${i}`, `./sprites/${sprites[i].src}`, new vec3(0, 0), false, sprites[i].size, true, false, sprites[i].frame, new vec3(0, 0))
      }

      draw.addText(`${this.name}_dialog`, '', new vec3(0.1, 0.1), true, 12)
    }

    this.update = function (dt) {
      if (this.states.dialog >= dialogs.length) {
        return this.Pursue()
      }

      const dialog = dialogs[this.states.dialog]

      this.states.frame += dt // update every [interval] sec
      this.states.sprite_timer += dt // sprite time on screen
      if (this.states.frame > dialog.interval) {
        this.states.frame = 0

        let sprite = draw.getSprite(`${this.name}_${dialog.character}`)
        if (sprite != undefined) {
          sprite.visible = true
          sprite.pos = dialog.position(this.states.sprite_timer)
          sprite.index.y = dialog.animation
          sprite.nextFrame()

          let text = dialog.dialog.text
          if (this.states.text < 1) {
            this.states.writing = true
            this.states.text += 1 / dialog.dialog.time
            if (this.states.text > 1) this.states.text = 1
          } else {
            this.states.writing = false
          }

          text = text.substring(0, Math.floor(text.length * this.states.text))
          draw.getText(`${this.name}_dialog`).text = text
        }

        draw.removeText('press_next')
        if (!this.states.writing) {
          draw.addText('press_next', '[Press A]', new vec3(0.49, 0.49), true, 12)
        }
      }

      // next dialog
      if (player.keys['KeyQ'] && !this.states.writing) {
        draw.removeText('press_next')

        let sprite = draw.getSprite(`${this.name}_${dialog.character}`)
        if (sprite != undefined) sprite.visible = false

        this.states.text = 0
        this.states.frame = 0
        this.states.sprite_timer = 0
        this.states.writing = true
        this.states.dialog++
      }
    }

    this.pursue = function () {
      player.lock_move = false
      player.lock_camera = false

      for (let i = 0; i < sprites.length; i++) {
        draw.removeSprite(`${this.name}_${i}`)
      }

      draw.removeText(`${this.name}_dialog`)
    }
  }

  /*
  sprites [ {'src': 'aaa', size: '', frame: new vec3(10, 10)}]
    [{
        character: 0,
        position(time): [x, y], // function(dt), function(dt)
        animation: [0, 0], // line, number of frame for the line
        dialog: {
            "",
            "",
            "",
        }
    },
    {
        character: 1,
        animation: 0 // line
        dialog: {
            "",
            "",
            "",
        }
    }]
    */
}

export default Dialog
