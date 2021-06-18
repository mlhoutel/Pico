import Pico from './src/pico.js'

// Wait for the document to be fully loaded before calling the functions
document.addEventListener('DOMContentLoaded', function () {
  console.log('loaded...')

  const canvas = document.getElementById('canvas')

  const pico = new Pico(canvas)
})
