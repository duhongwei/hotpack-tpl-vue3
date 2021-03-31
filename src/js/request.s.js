class Request{
    get() { return Promise.resolve({}) }
    post() {return Promise.resolve({})  }
    abort() { }
}
export default Request