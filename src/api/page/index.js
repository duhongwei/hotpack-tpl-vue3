function getHome() {
  return Promise.resolve({
    text:'I am home'
  })
}
function getAbout() {
  return Promise.resolve({
    text:'I am about'
  })
}
export {

  getHome,
  getAbout
}
