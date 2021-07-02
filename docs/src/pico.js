import PicoCADViewer from '../libs/pico-cad-viewer.esm.js'
import { World, Body, Plane, Sphere, Material, ContactMaterial, Vec3 } from '../libs/cannon.esm.js'

import vec3 from './maths.js'
import Player from './player.js'
import Draw from './draw.js'
import Story from './scenes/story.js'

const RESOLUTION = 6 // pixel resolution
const MAX_DT = 0.3 // avoid physic strange behaviours

class Pico {
  constructor(canvas, stage) {
    this.canvas = canvas
    this.stage = stage

    this.time = 0 // timer
    this.refresh = 0 // last canvas refresh
    this.interval = 0.01 // refresh rate

    this._initialize_viewer()
    this._initialize_events()
    this._initialize_loop()
  }

  _initialize_viewer() {
    this.viewer = new PicoCADViewer({
      canvas: this.canvas,
      //renderMode: 'color',
    })

    this.draw = new Draw(this.stage)
    this.world = new World({ gravity: new Vec3(0, 0, 60) })
    this.player = new Player()

    this.world.solver.iterations = 10

    // Manage materials
    const defaultMaterial = new Material('defaultMaterial')
    const def_def_ContactMaterial = new ContactMaterial(defaultMaterial, defaultMaterial, {
      friction: 0.3,
      restitution: 0.3,
      contactEquationStiffness: 1e8,
      contactEquationRelaxation: 3,
      frictionEquationStiffness: 1e8,
      frictionEquationRegularizationTime: 3,
    })
    this.world.addContactMaterial(def_def_ContactMaterial)

    // Initialize player
    const player_collider = new Sphere(this.player.size / 2)
    const player_body = new Body({
      shape: player_collider,
      mass: 1,
      position: new Vec3(this.player.position.x, this.player.position.z, this.player.position.y),
      material: defaultMaterial,
    })

    // Manage jumps
    const self = this
    player_body.addEventListener('collide', function (e) {
      const contact = e.contact
      let contactNormal = new Vec3()
      let upAxis = new Vec3(0, 0, -1)

      if (contact.bi.id == player_body.id) {
        contact.ni.negate(contactNormal) // bi is the player body, flip the contact normal
      } else {
        contactNormal.copy(contact.ni) // bi is something else. Keep the normal as it is
      }

      if (contactNormal.dot(upAxis) > 0.1) {
        self.player.can_jump = true // If contactNormal.dot(upAxis) is between 0 and 1, we know that the contact normal is somewhat in the up direction.
      }
    })

    this.world.addBody(player_body)

    // Initialize ground
    const ground = new Body({
      type: Body.STATIC,
      shape: new Plane(),
      mass: 0,
      material: defaultMaterial,
    })

    ground.quaternion.setFromEuler(-Math.PI, 0, 0) // make it face up
    this.world.addBody(ground)

    this.story = new Story(this.viewer, this.draw, this.player, this.world)
  }

  _initialize_events() {
    this.stage.requestPointerLock = this.stage.requestPointerLock || this.stage.mozRequestPointerLock
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock

    const self = this
    this.stage.onclick = function () {
      self.stage.requestPointerLock()
    }

    // pointer lock event listeners

    // Hook pointer lock state change events for different browsers
    document.addEventListener('pointerlockchange', lockChangeAlert, false)
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false)

    function lockChangeAlert() {
      if (document.pointerLockElement === self.stage || document.mozPointerLockElement === self.stage) {
        // console.log('The pointer lock status is now locked')
        self.player.launchEvents()
      } else {
        // console.log('The pointer lock status is now unlocked')
        self.player.disableEvents()
      }
    }
  }

  _initialize_loop() {
    this.viewer.startDrawLoop((dt) => {
      if (dt > MAX_DT) dt = MAX_DT

      this.time += dt

      if (this.time - this.refresh > this.interval) {
        this.refresh = this.time
        this.viewer.setResolution(document.documentElement.clientWidth / RESOLUTION, document.documentElement.clientHeight / RESOLUTION, RESOLUTION)
        this.stage.width = document.documentElement.clientWidth
        this.stage.height = document.documentElement.clientHeight
      }

      this.story.Update(dt)

      this.world.getBodyById(0).velocity.set(this.player.avelocity.x, this.player.avelocity.z, this.player.avelocity.y)

      this.world.step(dt)

      const pos = this.world.getBodyById(0).position
      const vel = this.world.getBodyById(0).velocity

      this.player.position = new vec3(pos.x, pos.z, pos.y)
      this.player.velocity.z = vel.z

      this.player.Update(dt)

      this._draw_canvas()
      this._draw_stage()
    })
  }

  _draw_canvas() {
    this.viewer.cameraPosition = this.player.camera
    this.viewer.cameraRotation = this.player.rotation
    // this.viewer.lightDirection = { x: 10, y: 10, z: Math.sin(time) * 10 }

    // this.viewer.setTurntableCamera(Math.sin(time) * 2 + 10, 2, 0)
    this.viewer.setLightDirectionFromCamera()
  }

  _draw_stage() {
    this.draw.drawSprites()
  }
}

export default Pico
