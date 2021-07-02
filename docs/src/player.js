import vec3 from './maths.js'

const SPEED = 5
const JUMP = 20
const MAX_SPEED = 15
const FRICTION = 1.7
const DAMPING = 0.15
const DSPEED = 14
const KEY_UP = 'KeyW'
const KEY_DOWN = 'KeyS'
const KEY_LEFT = 'KeyA'
const KEY_RIGHT = 'KeyD'
const KEY_JUMP = 'Space'

class Player {
  constructor(position = new vec3(), rotation = new vec3(), velocity = new vec3()) {
    this.size = 1
    this.position = new vec3(position.x, position.y - this.size / 2, position.z)
    this.camera = new vec3(position.x - this.size / 2, position.y - this.size / 2, position.z - this.size / 2)
    this.dampwalk = 0
    this.rotation = rotation
    this.velocity = velocity
    this.avelocity = velocity
    this.mouse = new vec3()
    this.keys = {}
    this.time = 0
    this.lock_move = false
    this.lock_camera = false
    this.can_jump = false
  }

  Update(dt) {
    this.time += dt
    if (!this.lock_camera) {
      this.rotation.y = (this.mouse.x / window.innerWidth) * Math.PI
      this.rotation.x = this.mouse.y / window.innerHeight
    }

    const rot_x = Math.sin(this.rotation.y)
    const rot_y = Math.cos(this.rotation.y)

    // this.velocity = new vec3(-rot_y * this.avelocity.x + rot_x * this.avelocity.y, -this.avelocity.z, -rot_y * this.avelocity.y - rot_x * this.avelocity.x)

    // ACCELERATION
    if (this.can_jump) {
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
      if (this.keys[KEY_JUMP]) {
        this.velocity.z -= JUMP
        this.can_jump = false
      }
    }

    // FRICTION
    if (this.can_jump) {
      if (Math.abs(this.velocity.x) > 0) {
        this.velocity.x = Math.sign(this.velocity.x) * Math.max(0, Math.abs(this.velocity.x) - FRICTION)
      }

      if (Math.abs(this.velocity.y) > 0) {
        this.velocity.y = Math.sign(this.velocity.y) * Math.max(0, Math.abs(this.velocity.y) - FRICTION)
      }
    }

    // LIMITATION
    if (Math.abs(this.velocity.x) > MAX_SPEED) {
      this.velocity.x = Math.sign(this.velocity.x) * MAX_SPEED
    }

    if (Math.abs(this.velocity.y) > MAX_SPEED) {
      this.velocity.y = Math.sign(this.velocity.y) * MAX_SPEED
    }

    if (this.velocity.z < -JUMP) {
      this.velocity.z = -JUMP
    }

    if (this.lock_move) {
      this.velocity.x = 0
      this.velocity.y = 0
    }

    this.avelocity = new vec3(rot_y * this.velocity.x - rot_x * this.velocity.y, this.velocity.z, rot_y * this.velocity.y + rot_x * this.velocity.x)

    if (Math.abs(this.velocity.x) + Math.abs(this.velocity.y) > 0.3 || Math.abs(this.dampwalk) > DAMPING / 2) {
      this.dampwalk = DAMPING * Math.cos(this.time * DSPEED)
    }

    this.camera = new vec3(this.position.x, this.position.y - this.size / 2 - this.dampwalk, this.position.z)

    /*
    this.position.x += this.avelocity.x
    this.position.z += this.avelocity.z
    */
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
