/* global fail */

const {deleteCar} = require('../../service');

module.exports = (req, res) => () => {

  it('Nothing to delete', async() => {
    req.body = {};
    const {status} = await deleteCar(req, res);

    expect(status).toBe(400);
  });

  it('Correct props', async() => {
    req.params = {id: '659aa63cae153ba0caac5b08'};
    const {deletedCount} = await deleteCar(req, res);

    expect(deletedCount).toBe(1);
  });
};