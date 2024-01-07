exports.create = async(req, res) => {
  const {
    params: {brand, model, year, price} = {}
  } = req.body || {};

  if (!brand || !model || !year || !price) {
    return res.sendStatus(400);
  }

  const {collection} = req.app.locals;

  const {insertedId} = await collection.insertOne({brand, model, year, price});

  return res.json(insertedId);
}