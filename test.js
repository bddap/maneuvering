const THREE = require('three')
const init = require('three-default')

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
