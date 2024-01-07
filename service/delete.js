const {ObjectId} = require('mongodb');

exports.delete = async(req, res) => {
  const {id} = req.params || {};

  if (!id) {
    return res.sendStatus(400);
  }

  const {collection} = req.app.locals;

  const {deletedCount} = await collection.deleteOne({'_id': new ObjectId(id)});

  return res.json({deletedCount});
}