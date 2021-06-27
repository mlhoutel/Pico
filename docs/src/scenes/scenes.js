class Scene {
  constructor(name, states, initialize, update, pursue, next) {
    this.name = name // Scene name
    this.states = { timer: 0, ...states } // States
    this.next = next // Next scene

    this._initialize = initialize // At initialisation
    this._update = update // At initialisation
    this._pursue = pursue // At next scene
  }

  Initialize() {
    this._initialize()
  }

  Update(dt) {
    this.states.timer += dt
    const s = this._update(dt)
    return s ? s : this
  }

  Pursue() {
    this._pursue()
    if (this.next != null) {
      this.next._initialize()
    }
    return this.next
  }

  setNext(s) {
    if (this.next == null) {
      this.next = s
    } else {
      this.next.setNext(s)
    }
  }
}

class Scenes {
  constructor() {
    this._current = null
  }

  addScene(s) {
    if (this._current == null) {
      this._current = new Scene(s.name, s.states, s.initialize, s.update, s.pursue, null)
    } else {
      this._current.setNext(new Scene(s.name, s.states, s.initialize, s.update, s.pursue, null))
    }
  }

  Start() {
    if (this._current != null) {
      this._current.Initialize()
    }
  }

  Update(dt) {
    if (this._current != null) {
      this._current = this._current.Update(dt)
    }
  }
}

export default Scenes
