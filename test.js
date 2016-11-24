const THREE = require('three')
const init = require('three-default')
const maneuvering = require('./maneuvering.js')

document.write(`<style>
  html, body {
    margin: 0;
    height: 100%;
    overflow: hidden;
  }
</style>`);

const {
  scene,
  camera,
  renderer,
  autoSize,  // function: fill parent, resize whenever necessary
  autoRender // function: render forever
} = init(THREE)

autoSize()
autoRender()

scene.add(
  new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
      color: 0xff7733,
      wireframe: true
})))
camera.position.z = 2

maneuvering({
  oneFingerDrag: (x, y) => {
    camera.position.x -= x / 1000
    camera.position.y += y / 1000
  }
})
