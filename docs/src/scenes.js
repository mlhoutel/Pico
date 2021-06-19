import vec3 from './maths.js'

const INITIAL_SCENE = 0

class Scene {
  constructor(name, active, states, Initialise, Update, Remove) {
    this.name = name
    this.active = active
    this.states = states
    this.Initialise = Initialise
    this.Update = Update
    this.Remove = Remove
  }
}

class Scenes {
  constructor(viewer, draw, player) {
    this.viewer = viewer
    this.draw = draw
    this.player = player
    this.active = INITIAL_SCENE
    this.scenes = []
    this.Scenario()
  }

  Update(dt) {
    if (this.active < this.scenes.length) {
      if (this.scenes[this.active].active) {
        this.scenes[this.active].Update(dt)
      } else {
        this.scenes[this.active].Remove()

        this.active++
        if (this.active < this.scenes.length) {
          this.scenes[this.active].active = true
          this.scenes[this.active].Initialise()
        }
      }
    }
  }

  Scenario() {
    const self = this
    const scenes = [
      {
        name: 'intro',
        states: { timer: 0, duration: 5 },
        initialise: function () {
          self.player.lock_move = true
          self.player.lock_camera = true
          self.draw.addText('title', 'PICO', new vec3(0.48, 0.48, 0), true, 60, 'rgba(255,255,255,1)', 0)
        },
        update: function (dt) {
          this.states.timer += dt
          if (this.states.timer > this.states.duration) {
            this.active = false
          }
          const shade = this.states.timer / this.states.duration
          const toggle = 0.6
          const relative = (shade - toggle) / (1 - toggle)
          self.draw.background = shade < toggle ? 'black' : `rgba(${relative * 255}, ${relative * 255}, ${relative * 255},1)`
        },
        remove: function () {
          self.player.lock_move = false
          self.player.lock_camera = false
          self.draw.background = `rgba(0,0,0,0)`
          self.draw.removeText('title')
        },
      },
      {
        name: 'scene1',
        states: {},
        initialise: function () {
          console.log('test')
          // this.viewer.load('./models/submarine.txt')
          self.viewer.load('./models/vehicles.txt')
          self.draw.addSprite('cursor', './sprites/cursor.png', new vec3(0.5, 0.5, 0), true)
          self.draw.addText('label', 'Experiment : Going on...', new vec3(0.02, 0.95, 0), true, 30, 'white', 0)
        },
        update: function (dt) {
          self.draw.removeText('counter')
          self.draw.addText('counter', `${Math.floor(dt * 100000) / 1000}:${dt.toString(16)}`, new vec3(0.51, 0.51, 0), true, 15, 'white', 0)
        },
        remove: function () {
          self.draw.removeSprite('cursor', './sprites/cursor.png', new vec3(0.5, 0.5, 0), true)
          self.draw.removeText('label', 'Experiment : Going on...', new vec3(0.02, 0.95, 0), true, 30, 'white', 0)
        },
      },
    ]

    // Parser
    for (let i = 0; i < scenes.length; i++) {
      this.scenes.push(new Scene(scenes[i].name, i == INITIAL_SCENE, scenes[i].states, scenes[i].initialise, scenes[i].update, scenes[i].remove))
    }

    this.scenes[INITIAL_SCENE].Initialise()
  }
}

export default Scenes
