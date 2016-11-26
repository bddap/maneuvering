const THREE = require('three')
const init = require('three-default')
const maneuvering = require('./maneuvering.js')

document.write(`
<style>
  html, body {
    margin: 0;
    height: 100%;
    overflow: hidden;
  }
</style>
<meta name="viewport" content="width=device-width, user-scalable=no">
`)

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
    camera.rotateY(x / 500)
    camera.rotateX(y / 500)
  },
  twoFingerDrag: (x, y, angle, distance) => {
    const v = new THREE.Vector3( -x / 200, y / 200, - distance / 500)
    v.applyQuaternion(camera.quaternion)
    camera.position.add(v)
    camera.rotateZ(angle)
  }
})
