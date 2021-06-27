import vec3 from '../../maths.js'

export default function (ctx) {
  return {
    name: 's001_intro',
    states: { duration: 5 },
    initialize: function () {
      ctx.player.lock_move = true
      ctx.player.lock_camera = true

      ctx.draw.addText('main_title', 'P. I. C. O.', new vec3(0.5, 0.5), true, 20, 'white', 'center', 'middle', true)

      const now = new Date()
      ctx.draw.addText('under_title', `50:49:43:4F @[ ${now.getFullYear()}:${now.getMonth() + 1}:${now.getDate()} - ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ]`, new vec3(0.02, 0.95), true, 11, 'white', 'left', 'middle', true)

      ctx.draw.background = `rgba(0, 0, 0, 0)`

      ctx.viewer.load(ctx.getPathModel('vehicles2.txt'))
      ctx.player.position.z = -10
    },
    update: function (dt) {
      if (this.states.timer > this.states.duration) {
        return this.Pursue()
      }

      const shade = this.states.timer / this.states.duration
      const toggle = 0.95
      const relative = (shade - toggle) / (1 - toggle)

      if (ctx.draw.stage.getContext) {
        let c = ctx.draw.stage.getContext('2d')
        c.fillStyle = 'rgba(1, 1, 1, 1)' // shade < toggle ? 'rgba(1, 1, 1, 1)' : `rgba(1, 1, 1, ${1 - relative})`
        c.beginPath()
        const ray = (ctx.draw.stage.width / 2) * (Math.exp(this.states.timer * 3 - 10) / 50)
        c.arc(ctx.draw.stage.width / 2, ctx.draw.stage.height / 2, ray, 0, 2 * Math.PI)
        c.rect(ctx.draw.stage.width, 0, -ctx.draw.stage.width, ctx.draw.stage.height)
        c.fill()

        if (ray > 5) ctx.player.lock_camera = false

        const main_title = ctx.draw.getText('main_title')
        if (main_title != undefined) main_title.color = ray < 5 ? `rgba(255, 255, 255, 1)` : `rgba(255, 255, 255, 0)`

        const under_title = ctx.draw.getText('under_title')
        if (under_title != undefined) under_title.color = ray < 5 ? `rgba(255, 255, 255, 1)` : `rgba(255, 255, 255, 0)`
      }
    },
    pursue: function () {
      ctx.player.lock_move = false
      ctx.player.lock_camera = false
      ctx.draw.background = `rgba(0,0,0,0)`

      ctx.draw.removeText('main_title')
      ctx.draw.removeText('under_title')
    },
  }
}
