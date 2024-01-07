const {create} = require('../../service');

module.exports = (req, res) => () => {
  it('Nothing to create', async() => {
    const {status} = await create(req, res);

    expect(status).toBe(400);
  });

  it('Correct props', async() => {
    req.body = {params: {brand: 44, model: 66, year: 55, price: 99}};
    const data = await create(req, res);

    expect(data).toBe('dddd');
  });
};