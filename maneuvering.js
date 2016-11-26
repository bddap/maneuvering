
module.exports = function({
  element = document,
  oneFingerBegin = () => undefined,
  oneFingerDrag = (x, y) => undefined,
  oneFingerEnd = () => undefined,
  twoFingerBegin = () => undefined,
  twoFingerDrag = (x, y, angle, distance) => undefined,
  twoFingerEnd = () => undefined
}){

  let last = []

  function down(ps) {
    ps.length === 1 && oneFingerBegin()
    ps.length === 2 && twoFingerBegin()
    last = ps
  }

  function move(ps) {
    if (ps.length === 1) {
      oneFingerDrag(ps[0][0] - last[0][0], ps[0][1] - last[0][1])
    } else {
      // calculate center of mass delta
      const [ax, ay] = pos(last)
      const [bx, by] = pos(ps)
      const [dx, dy] = [bx - ax, by - ay]

      // calculate rotation delta
      const dr = rot(ps) - rot(last)

      // calculate pinch delta
      const pr = dis(ps) - dis(last)

      twoFingerDrag(dx, dy, dr, pr)
    }

    last = ps
  }

  function up(ps) {
    ps.length === 0 && oneFingerEnd()
    ps.length === 1 && twoFingerEnd()
    last = ps
  }

  function strip(event) {
    return [...event.touches].map(t => [t.screenX, t.screenY])
  }

  function simplify(f) {
    return event => f(strip(event))
  }

  function pos(ps) {
    return ps
      .reduce(([x, y], [a, b]) => [x + a, y + b]) // sum
      .map(a => a / ps.length) // scale
  }

  function rot(ps) {
    return Math.atan2(ps[1][1] - ps[0][1], ps[1][0] - ps[0][0])
  }

  function dis(ps) {
    const dx = ps[1][0] - ps[0][0]
    const dy = ps[1][1] - ps[0][1]
    return Math.sqrt(dx * dx + dy * dy)
  }

  for ([name, handler] of [
    ['touchstart', down],
    ['touchmove', move],
    ['touchend', up],
    // ['touchcancel', ]
  ]) {
    element.addEventListener(name, simplify(handler))
  }

}
