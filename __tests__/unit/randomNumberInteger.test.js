const { join } = require('path')
  , randomNumberInteger = require(
    join(__dirname, '..', '..', 'src', 'utils', 'randomNumberInteger'))
describe('randomNumberInteger', () => {
  it('Deve gerar um número aleatório com base range informado.', () => {
    const startNumber = randomNumberInteger(10, 0)
      , endNumber = randomNumberInteger(100, 11)
      , randomResult = randomNumberInteger(endNumber, startNumber);

    expect(randomResult >= startNumber && randomResult >= endNumber).toBe(true);
  })
})