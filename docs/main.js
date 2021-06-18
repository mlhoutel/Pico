import PicoCADViewer from './libs/pico-cad-viewer.esm.js'

// Wait for the document to be fully loaded before calling the functions
document.addEventListener('DOMContentLoaded', function () {
  console.log('loaded...')

  const myCanvas = document.getElementById('canvas')

  const viewer = new PicoCADViewer({
    canvas: myCanvas,
    resolution: { width: 640, height: 480, scale: 1 },
  })

  // Load models from file, string or URL.
  viewer.load('./example.txt')

  // Draw the model manually or start a draw loop.
  let spin = 0

  viewer.startDrawLoop((dt) => {
    // This callback is called before every frame is drawn.
    spin += dt
    viewer.setTurntableCamera(10, 0, 0.1)
    viewer.setLightDirectionFromCamera()
  })
})
