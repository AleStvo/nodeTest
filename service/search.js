exports.search = async(req, res) => {
  const {params: {brand, limit, offset, sort} = {}} = req.body || {};
  const {collection} = req.app.locals;

  const carsColl = collection.find({...brand ? {brand} : {}});

  if (limit && limit > 0) {
    carsColl.limit(limit);
  }

  if (offset && offset > 0) {
    carsColl.offset(offset);
  }

  if (sort) {
    const sortObj = {};
    Object.entries(sort).forEach(([key, val]) => {
      if ([-1, 1].includes(val)) {
        sortObj[key] = val;
      }
    });

    carsColl.sort(sortObj);
  }

  try {
    const cars = await carsColl.toArray();

    return res.json(cars);
  } catch(err) {
    console.log(err);
  }

  return res.sendStatus(500);
}