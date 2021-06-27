import Dialog from '../dialog.js'
import vec3 from '../../maths.js'

export default function (ctx) {
  return new Dialog(
    's003_dialog',
    [{ src: 'defchar.png', size: new vec3(5, 5), frame: new vec3(2, 1) }],
    [
      {
        character: 0,
        animation: 0,
        interval: 0.2,
        position: (time) => {
          return new vec3(1, 1)
        },
        dialog: { text: 'texte texte texte texte', time: 10 },
      },
      {
        character: 0,
        animation: 0,
        interval: 0.1,
        position: (time) => {
          return new vec3(time * 100, 1)
        },
        dialog: { text: 'texte texte texte texte texte texte texte texte texte', time: 10 },
      },
    ],
    ctx.viewer,
    ctx.draw,
    ctx.player,
  )
}
