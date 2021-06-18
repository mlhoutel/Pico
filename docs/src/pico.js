import PicoCADViewer from '../libs/pico-cad-viewer.esm.js'
import vec3 from './maths.js'
import Player from './player.js'

const RESOLUTION = 6

class Pico {
  constructor(canvas) {
    this.canvas = canvas
    this.player = new Player()

    this.time = 0 // timer
    this.refresh = 0 // last canvas refresh
    this.interval = 0.05 // refresh rate

    this._initialize_viewer()
    this._initialize_events()
    this._initialize_loop()
  }

  _initialize_viewer() {
    this.viewer = new PicoCADViewer({
      canvas: this.canvas,
      //renderMode: 'color',
    })

    this.viewer.load('./models/vehicles.txt')
    this.viewer.load('./models/submarine.txt')
  }

  _initialize_events() {
    this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock

    const self = this
    this.canvas.onclick = function () {
      self.canvas.requestPointerLock()
    }

    // pointer lock event listeners

    // Hook pointer lock state change events for different browsers
    document.addEventListener('pointerlockchange', lockChangeAlert, false)
    document.addEventListener('mozpointerlockchange', lockChangeAlert, false)

    function lockChangeAlert() {
      if (document.pointerLockElement === self.canvas || document.mozPointerLockElement === self.canvas) {
        console.log('The pointer lock status is now locked')
        self.player.launchEvents()
      } else {
        console.log('The pointer lock status is now unlocked')
        self.player.disableEvents()
      }
    }
  }

  _initialize_loop() {
    this.viewer.startDrawLoop((dt) => {
      this.time += dt

      if (this.time - this.refresh > this.interval) {
        this.refresh = this.time
        this.viewer.setResolution(document.documentElement.clientWidth / RESOLUTION, document.documentElement.clientHeight / RESOLUTION, RESOLUTION)
      }

      this.player.Update(dt)

      this.viewer.cameraPosition = this.player.position
      this.viewer.cameraRotation = this.player.rotation
      // this.viewer.lightDirection = { x: 10, y: 10, z: Math.sin(time) * 10 }

      // this.viewer.setTurntableCamera(Math.sin(time) * 2 + 10, 2, 0)
      this.viewer.setLightDirectionFromCamera()
    })
  }
}

export default Pico
