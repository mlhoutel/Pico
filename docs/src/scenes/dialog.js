import vec3 from '../maths.js'

const FONT_SIZE = 12
const SIDE_SPACE = 40
const POS_X = 0.5
const POS_Y = 0.9

class Dialog {
  constructor(name, sprites, dialogs, viewer, draw, player) {
    this.name = name
    this.states = { dialog: 0, frame: 0, speach: 0, text: 0, lines: 0, sprite_timer: 0, writing: true }

    this.initialize = function () {
      player.lock_move = true
      player.lock_camera = true

      for (let i in sprites) {
        draw.addSprite(`${this.name}_${i}`, `./sprites/${sprites[i].src}`, new vec3(0, 0), false, sprites[i].size, true, false, sprites[i].frame, new vec3(0, 0))
      }
    }

    this.update = function (dt) {
      if (this.states.dialog >= dialogs.length) {
        return this.Pursue()
      }

      const dialog = dialogs[this.states.dialog]

      this.states.frame += dt // update sprite every [interval] sec
      this.states.speach += dt // update text every [interval] sec
      this.states.sprite_timer += dt // sprite time on screen

      if (this.states.frame > dialog.interval) {
        this.states.frame = 0

        let sprite = draw.getSprite(`${this.name}_${dialog.character}`)
        if (sprite != undefined) {
          sprite.visible = true
          sprite.pos = dialog.position(this.states.sprite_timer)
          sprite.index.y = dialog.animation
          sprite.nextFrame()
        }

        draw.removeText('press_next')
        if (!this.states.writing) {
          draw.addText('press_next', '[Press E]', new vec3(0.5, 0.5), true, 12)
        }
      }

      if (this.states.speach > dialog.interval / 4) {
        this.states.speach = 0

        let text = dialog.dialog.text
        if (this.states.text < 1) {
          this.states.writing = true
          this.states.text += 1 / (dialog.dialog.time * 4)
          if (this.states.text > 1) this.states.text = 1
        } else {
          this.states.writing = false
        }

        for (let i = 0; i < this.states.lines; i++) {
          draw.removeText(`${this.name}_dialog_${i}`)
        }

        text = text.substring(0, Math.floor(text.length * this.states.text))
        const lines = []
        while (text.length > 0) {
          const nbchar_space = Math.min(Math.floor((draw.stage.width - SIDE_SPACE * 2) / FONT_SIZE), text.length)
          lines.push(text.substring(0, nbchar_space))
          text = text.substring(nbchar_space + 1)
        }
        this.states.lines = lines.length

        for (let i = 0; i < this.states.lines; i++) {
          const font_rel = FONT_SIZE / draw.stage.height
          const pos_y = POS_Y - (this.states.lines / 2) * font_rel + i * font_rel
          draw.addText(`${this.name}_dialog_${i}`, lines[i], new vec3(POS_X, pos_y), true, FONT_SIZE, 'white', 'center', 'middle', true)
        }
      }

      // next dialog
      if (player.keys['KeyE'] && !this.states.writing) {
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

      for (let i = 0; i < this.states.lines; i++) {
        draw.removeText(`${this.name}_dialog_${i}`)
      }
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
