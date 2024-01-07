const dbCollection = {
  insertOne: () => ({insertedId: 'dddd'}),
  deleteOne: () => ({deletedCount: 1})
};

const req = {
  app: {locals: {collection: dbCollection}}
};

const res = {
  sendStatus: (code) => ({status: code}),
  json: (data) => data
};

const {
  create,
  deleteCar
} = require('./app');

describe('test app', () => {
  describe('create', create(req, res));
  describe('delete', deleteCar(req, res));
});