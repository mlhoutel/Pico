import PicoCADViewer from './libs/pico-cad-viewer.esm.js'

// Wait for the document to be fully loaded before calling the functions
document.addEventListener('DOMContentLoaded', function () {
  console.log('loaded...')

  const myCanvas = document.getElementById('canvas')

  const viewer = new PicoCADViewer({
    canvas: myCanvas,
  })

  // Load models from file, string or URL.
  viewer.load('./example.txt')

  /* AUDIO
  document.body.addEventListener('mousemove', function () {
    var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/examples/t-rex-roar.mp3')
    audio.play()
  })
  */

  // Draw the model manually or start a draw loop.
  let time = 0 // timer
  let refresh = 0 // last canvas refresh
  let interval = 0.05 // refresh rate
  viewer.startDrawLoop((dt) => {
    time += dt

    if (time - refresh > interval) {
      refresh = time
      viewer.setResolution(document.documentElement.clientWidth, document.documentElement.clientHeight, 1)
    }
    //
    // This callback is called before every frame is drawn.
    viewer.setTurntableCamera(Math.sin(time) * 2 + 10, time, time)
    viewer.setLightDirectionFromCamera()
  })
})
