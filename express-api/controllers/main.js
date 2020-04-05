const getTableData = (req, res, db) => {
  db.select('*').from('escdummy')
  .then(items => {
    if(items.length){
      res.json(items)
    } else {
      res.json({dataExists: 'false'})
    }
  })
  .catch(err => res.status(400).json({dbError: 'db error'}))
}
  
const postTableData = async (req, res, db) => {

  // Create table if it doesn't exist
  await db.schema.hasTable('escdummy').then(function(exists) {
    if (!exists) {
      return db.schema.createTable('escdummy', function(t) {
        t.string('id').primary();
        t.string('company');
        t.string('project_name');
        t.string('type_of_prototype');
        t.float('length');
        t.float('width');
        t.float('height');
        t.integer('number_of_power_points_needed');
        t.date('date_added');
      })
    }
  })

  // Delete previous values (if any)
  db('escdummy').del()
  .catch(err => res.status(400).json({dbError: 'db error'}))

  // Insert values from CSV
  for (let i = 0; i < req.body.length; i++) {
    const { id, company, project_name, type_of_prototype, length, width, height, number_of_power_points_needed } = req.body[i]
    const date_added = new Date()
    db('escdummy').insert({id, company, project_name, type_of_prototype, length, width, height, number_of_power_points_needed, date_added})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
  }
}
  
const putTableData = (req, res, db) => {
  for (let i = 0; i < req.body.length; i++) {
    const { id, company, project_name, type_of_prototype, length, width, height, number_of_power_points_needed } = req.body[i]
    const date_added = new Date()
    db('escdummy').where({
      id: id
    })
    .update({id, company, project_name, type_of_prototype, length, width, height, number_of_power_points_needed, date_added})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  // const { id, first, last, email, phone, location, hobby } = req.body
  // db('escdummy').where({id}).update({first, last, email, phone, location, hobby})
  //   .returning('*')
  //   .then(item => {
  //     res.json(item)
  //   })
  //   .catch(err => res.status(400).json({dbError: 'db error'}))
}
  
const deleteTableData = (req, res, db) => {
  const { id } = req.body
  db('escdummy').where({id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

const getHexagons = (req, res, db, st) => {
  db.withSchema('gis').select('hexagons_l1_1m.*')
  .from('ccl1').leftJoin('hexagons_l1_1m', st.dwithin('ccl1.geom', 'hexagons_l1_1m.geom', 0))
  .leftJoin('ccl1_pits', st.intersects('ccl1_pits.geom', 'hexagons_l1_1m.geom'))
  .whereNull('ccl1_pits.gid')
  .then(items => {
    if(items.length){
      res.json(items)
    } else {
      res.json({dataExists: 'false'})
    }
  })
  .catch(err => res.status(400).json({dbError: 'db error'}))
}

const clearHexagons = (req, res, db) => {
  db('hexagons_l1_1m').withSchema('gis')
  .update({
    project_no : '-1',
  })
  .then(items => {
      res.json({Update: 'true'})
  })
  .catch(err => res.status(400).json({dbError: 'db error'}))
}

const allocateHexagons = (req, res, db, st) => {
  db.withSchema('gis').select('hexagons_l1_1m.*')
  .from('ccl1').leftJoin('hexagons_l1_1m', st.dwithin('ccl1.geom', 'hexagons_l1_1m.geom', 0))
  .leftJoin('ccl1_pits', st.intersects('ccl1_pits.geom', 'hexagons_l1_1m.geom'))
  .whereNull('ccl1_pits.gid')
  .limit(40)
  .then(items => {
    if(items.length){
      res.json(items)
    } else {
      res.json({dataExists: 'false'})
    }
  })
  .catch(err => res.status(400).json({dbError: 'db error'}))
}



module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
  getHexagons,
  clearHexagons,
  allocateHexagons,
}