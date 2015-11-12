module.exports = (test) => {
  return {
    then: (fn) => test ? fn() : null,
    otherwise: (fn) => !test ? fn() : null
  }
}
