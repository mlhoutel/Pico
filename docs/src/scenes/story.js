import Scenes from './scenes.js'
import Dialog from './dialog.js'
import vec3 from '../maths.js'

const models = './models'
const sprites = './sprites'

import s001_intro from './ressources/s001_intro.js'
import s002_scene from './ressources/s002_scene.js'
import s003_dialog from './ressources/s003_dialog.js'
import s004_scene from './ressources/s004_scene.js'

class Story {
  constructor(viewer, draw, player) {
    this.viewer = viewer
    this.draw = draw
    this.player = player

    this.scenes = new Scenes()
    this.Generate()
  }

  Update(dt) {
    this.scenes.Update(dt)
  }

  getPathModel(model) {
    return `${models}/${model}`
  }

  getPathSprite(sprite) {
    return `${sprites}/${sprite}`
  }

  Generate() {
    let self = this
    this.scenes.addScene(s001_intro(this))

    this.scenes.addScene(s002_scene(this))

    this.scenes.addScene(s003_dialog(this))

    this.scenes.addScene(s004_scene(this))

    this.scenes.Start()
  }
}

export default Story
