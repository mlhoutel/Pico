import vec3 from '../../maths.js'

export default function (ctx) {
  return {
    name: 's002_scene',
    states: { target: new vec3(0, 0), toggle: 10 },
    initialize: function () {},
    update: function (dt) {
      ctx.draw.removeText('button')

      const dx = ctx.player.position.x - this.states.target.x
      const dy = ctx.player.position.z - this.states.target.y
      if (Math.sqrt(dx * dx + dy * dy) < this.states.toggle) {
        ctx.draw.addText('button', '[Press E]', new vec3(0.49, 0.49), true, 10)
        if (ctx.player.keys['KeyE']) {
          return this.Pursue()
        }
      }
    },
    pursue: function () {
      ctx.draw.removeText('button')
    },
  }
}
