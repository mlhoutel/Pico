import vec3 from './maths.js'

const SPEED = 0.1
const MAX_SPEED = 0.5
const FRICTION = 0.05
const SIZE = 1.7
const KEY_UP = 'KeyW'
const KEY_DOWN = 'KeyS'
const KEY_LEFT = 'KeyA'
const KEY_RIGHT = 'KeyD'

class Player {
  constructor(position = new vec3(0, -SIZE, 0), rotation = new vec3(0, 0, 0), velocity = new vec3(0, 0, 0)) {
    this.position = position
    this.rotation = rotation
    this.velocity = velocity
    this.mouse = new vec3(0, 0, 0)
    this.keys = {}
  }

  Update(dt) {
    this.rotation.y = (this.mouse.x / window.innerWidth) * Math.PI
    this.rotation.x = this.mouse.y / window.innerHeight - 0.5

    //console.log(this.keys)

    // acceleration
    if (this.keys[KEY_UP]) {
      this.velocity.y += SPEED
    }
    if (this.keys[KEY_DOWN]) {
      this.velocity.y -= SPEED
    }
    if (this.keys[KEY_LEFT]) {
      this.velocity.x += SPEED
    }
    if (this.keys[KEY_RIGHT]) {
      this.velocity.x -= SPEED
    }

    // friction
    if (Math.abs(this.velocity.x) > 0) {
      this.velocity.x = Math.sign(this.velocity.x) * Math.max(0, Math.abs(this.velocity.x) - FRICTION)
    }

    if (Math.abs(this.velocity.y) > 0) {
      this.velocity.y = Math.sign(this.velocity.y) * Math.max(0, Math.abs(this.velocity.y) - FRICTION)
    }

    if (Math.abs(this.velocity.x) > MAX_SPEED) {
      this.velocity.x = Math.sign(this.velocity.x) * MAX_SPEED
    }
    if (Math.abs(this.velocity.y) > MAX_SPEED) {
      this.velocity.y = Math.sign(this.velocity.y) * MAX_SPEED
    }

    const rot_x = Math.sin(this.rotation.y)
    const rot_z = Math.cos(this.rotation.y)

    this.position.x += rot_x * this.velocity.x
    this.position.z += rot_z * this.velocity.y
  }

  handleEvent = function (e) {
    switch (e.type) {
      case 'mousemove':
        this._mouseUpdate(e)
        break
      case 'mouseenter':
        this._mouseUpdate(e)
        break
      case 'keydown':
        this._positionUpdate(e)
        break
      case 'keyup':
        this._positionUpdate(e)
        break
    }
  }

  _mouseUpdate(e) {
    this.mouse.x += e.movementX
    this.mouse.y += e.movementY
  }

  _positionUpdate(e) {
    this.keys[e.code] = e.type === 'keydown'
  }

  launchEvents() {
    document.addEventListener('mousemove', this, false)
    document.addEventListener('mouseenter', this, false)
    document.addEventListener('keydown', this, false)
    document.addEventListener('keyup', this, false)
  }

  disableEvents() {
    document.removeEventListener('mousemove', this, false)
    document.removeEventListener('mouseenter', this, false)
    document.removeEventListener('keydown', this, false)
    document.removeEventListener('keyup', this, false)
  }
}

export default Player
