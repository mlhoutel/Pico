import vec3 from '../../maths.js'

export default function (ctx) {
  return {
    name: 's004_scene',
    states: {},
    initialize: function () {
      // this.viewer.load(getPathModel('submarine.txt'))
      ctx.draw.addSprite('cursor', ctx.getPathSprite('cursor.png'), new vec3(0.5, 0.5), true, new vec3(1, 1), true, true)
    },
    update: function (dt) {
      ctx.draw.removeText('counter')
      ctx.draw.addText('counter', `${Math.floor(dt * 100000) / 1000}:${dt.toString(16)}`, new vec3(0.51, 0.51), true, 10)
    },
    pursue: function () {
      ctx.draw.removeSprite('cursor')
    },
  }
}
