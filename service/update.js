const {ObjectId} = require('mongodb');

exports.update = async(req, res) => {
  const {body = {}, params = {}} = req;
  const {id} = params;
  const {
    params: {brand, model, year, price} = {}
  } = body;

  if (!id || (!brand && !model && !year && !price)) {
    return res.sendStatus(400);
  }

  const {collection} = req.app.locals;
  const details = {'_id': new ObjectId(id)};
  const car = {
    ...brand ? {brand} : {},
    ...model ? {model} : {},
    ...year ? {year} : {},
    ...price ? {price} : {},
  };

  const {modifiedCount} = await collection.updateOne(details, {$set: car});

  return res.json({modifiedCount});
}