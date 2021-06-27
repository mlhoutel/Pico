import vec3 from '../../maths.js'

export default function (ctx) {
  return {
    name: 's002_scene',
    states: {},
    initialize: function () {
      ctx.draw.addText('label', 'Experiment : Going on...', new vec3(0.02, 0.95), true, 10)
      ctx.draw.addSprite('compass', ctx.getPathSprite('compass.png'), new vec3(20, 20), false, new vec3(5, 5), true, true, new vec3(16, 1), new vec3(0, 0))
    },
    update: function (dt) {
      const target = new vec3(0, 0, 0)
      const toggle_dist = 5

      const compass = ctx.draw.getSprite('compass')
      if (compass != undefined) {
        const player_angle = ((ctx.player.rotation.y % Math.PI) + Math.PI) % Math.PI

        const pos_rot = ctx.player.position.minus(new vec3(10 * Math.cos(ctx.player.rotation.y), 10 * Math.sin(ctx.player.rotation.y)))
        const pos_tar = ctx.player.position.minus(target)
        const total_angle = (Math.atan2(pos_rot.cross(pos_tar), pos_rot.dot(pos_tar)) % Math.PI) + Math.PI

        compass.index.x = 1 // Math.floor((total_angle % Math.PI) * (compass.num_frame / Math.PI))
      }
      ctx.draw.removeText('button')
      if (Math.sqrt(Math.pow(ctx.player.position.x - target.x, 2), Math.pow(ctx.player.position.y - target.y, 2)) < toggle_dist) {
        ctx.draw.addText('button', '[Press E]', new vec3(0.49, 0.49), true, 10)
        if (ctx.player.keys['KeyE']) {
          return this.Pursue()
        }
      }
    },
    pursue: function () {
      ctx.draw.removeText('button')
      ctx.draw.removeText('label')
      ctx.draw.removeSprite('compass')
    },
  }
}
