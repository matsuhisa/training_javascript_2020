const add = require('../source/javascripts/sample_for_jest/add')

describe('test funciton add', () => {
  it('1 + 2 = 3', done => {
    function callback(data) {
      expect(data).toBe(3)
      done()
    }

    add(1, 2, callback)
  })
})