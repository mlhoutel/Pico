import Scenes from './scenes.js'
import { Body, Vec3, ConvexPolyhedron } from '../../libs/cannon.esm.js'

const models = './models'
const sprites = './sprites'

import s001_intro from './ressources/s001_intro.js'
import s002_scene from './ressources/s002_scene.js'
import s003_dialog from './ressources/s003_dialog.js'
import s004_scene from './ressources/s004_scene.js'

class Story {
  constructor(viewer, draw, player, world) {
    this.viewer = viewer
    this.draw = draw
    this.player = player
    this.world = world

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

  async setupScene(model) {
    await this.viewer.load(model)

    // Reset world bodies (from 2, keep player & ground)
    for (let i = 2; i < this.world.numObjects(); i++) {
      const obj = this.world.getBodyById(i)
      this.world.removeBody(obj)
    }

    // Initialize scene
    const body = new Body({
      type: Body.STATIC,
      mass: 0,
    })

    const models = this.viewer.model.objects

    for (let i = 0; i < models.length; i++) {
      const model = models[i]
      let verts = []
      for (let j = 0; j < model.vertices.length; j++) {
        verts.push(new Vec3(model.vertices[j][0], model.vertices[j][2], model.vertices[j][1])) // x z y
      }

      let faces = []
      for (let j = 0; j < model.faces.length; j++) {
        for (let k = 2; k < model.faces[j].indices.length; k++) {
          faces.push([model.faces[j].indices[0], model.faces[j].indices[k - 1], model.faces[j].indices[k]])
        }
      }
      const bodyPart = new ConvexPolyhedron({
        vertices: verts,
        faces: faces,
      })

      const offset = new Vec3(model.position[0], model.position[2], model.position[1]) // x z y

      body.addShape(bodyPart, offset)
    }
    this.world.addBody(body)
  }

  Generate() {
    this.scenes.addScene(s001_intro(this))

    this.scenes.addScene(s002_scene(this))

    this.scenes.addScene(s003_dialog(this))

    this.scenes.addScene(s004_scene(this))

    this.scenes.Start()
  }
}

export default Story
