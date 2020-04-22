

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
        t.integer('level');
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
    const { id, company, project_name, type_of_prototype, length, width, height, level, number_of_power_points_needed } = req.body[i]
    const date_added = new Date()
    db('escdummy').insert({id, company, project_name, type_of_prototype, length, width, height, level, number_of_power_points_needed, date_added})
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
  }
}
  
const putTableData = (req, res, db) => {
  for (let i = 0; i < req.body.length; i++) {
    const { id, company, project_name, type_of_prototype, length, width, height, level, number_of_power_points_needed } = req.body[i]
    const date_added = new Date()
    db('escdummy').where({
      id: id
    })
    .update({id, company, project_name, type_of_prototype, length, width, height, level, number_of_power_points_needed, date_added})
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

const getSquaresL1 = (req, res, db, st) => {
  db.postgisDefineExtras((knex, formatter) => ({  
    asGeoJSON2(col) { // Not exactly sure why st.asGeoJSON won't build the query right
      return knex.raw('ST_asGeoJSON(ST_UNION(?))', [formatter.wrapWKT(col)]);
    }
  }));
  
  db.withSchema('gis').select('project_no',
  'project_name', 'company', 'length', 'width', 'height', 'level', 'number_of_power_points_needed',
  st.asGeoJSON2('geom'))
  .from('squares1')
  .joinRaw('FULL OUTER JOIN escdummy ON project_no = id')
  .whereNot('project_no', '-1')
  .groupBy('project_no', 'project_name', 'company', 'length', 'width', 'height', 'level', 'number_of_power_points_needed')
  .then(items => {
    console.log(items.length)
    if(items.length){
      res.json(items)
    } else {
      res.json({dataExists: 'false'})
    }
  })
  .catch(err => res.status(400).json({dbError: 'db error'}))
}

const getSquaresL2 = (req, res, db, st) => {
  db.postgisDefineExtras((knex, formatter) => ({  
    asGeoJSON2(col) { // Not exactly sure why st.asGeoJSON won't build the query right
      return knex.raw('ST_asGeoJSON(ST_UNION(?))', [formatter.wrapWKT(col)]);
    }
  }));
  
  db.withSchema('gis').select('project_no',
  'project_name', 'company', 'length', 'width', 'height', 'level', 'number_of_power_points_needed',
  st.asGeoJSON2('geom'))
  .from('squares2')
  .joinRaw('FULL OUTER JOIN escdummy ON project_no = id')
  .whereNot('project_no', '-1')
  .groupBy('project_no', 'project_name', 'company', 'length', 'width', 'height', 'level', 'number_of_power_points_needed')
  .then(items => {
    console.log(items.length)
    if(items.length){
      res.json(items)
    } else {
      res.json({dataExists: 'false'})
    }
  })
  .catch(err => res.status(400).json({dbError: 'db error'}))
}

const clearSquares = (req, res, db) => {
  db('squares1').withSchema('gis')
  .update({
    project_no : '-1',
  })
  .catch(err => res.status(400).json({dbError: 'db error'}))

  db('squares2').withSchema('gis')
  .update({
    project_no : '-1',
  })
  .catch(err => res.status(400).json({dbError: 'db error'}))

  res.json({Update: 'true'})
}

const allocateSquares = async(req, res, db, st) => {

  db('squares1').withSchema('gis')
  .update({
    project_no : '-1',
  }).catch(err => res.status(400).json({dbError: 'db error'}))

  let data = await db.select('*').from('escdummy')
  .where('height', '<', 50)
  .andWhere('level', 1)
  .orderByRaw('length+width DESC')
  .catch(err => res.status(400).json({dbError: 'db error'}))

  // 1. randomly select a row
  // 2. check if has all we need
  // 3. update
  for (let p = 0; p < data.length; p++){
    let success = false;
    while (!success){
      if (req.timedout) return
      let i = parseInt(data[p].length/0.5)
      let j = parseInt(data[p].width/0.5)

      let random = await db.withSchema('gis').select('*').from('squares1')
      .where('project_no', -1)
      .orderByRaw('random()')
      .limit(1)
      .catch(err => res.status(400).json({dbError: 'db error'}))

      let random_a = parseInt(random[0].a)
      let random_b = parseInt(random[0].b)

      let count = await db.withSchema('gis').count('a','b').from('squares1')
      .where('project_no', -1)
      .whereBetween('a', [random_a, random_a + i -1])
      .whereBetween('b', [random_b, random_b + j -1])
      .catch(err => res.status(400).json({dbError: 'db error'}))

      if (parseInt(count[0].count) == i*j){ //update if all values are available
        
        await db('squares1').withSchema('gis').update({
          project_no : data[p].id
        })
        .whereBetween('a', [random_a, random_a + i -1])
        .whereBetween('b', [random_b, random_b + j -1])
        .catch(err => res.status(400).json({dbError: 'db error'}))
        success = true
      } 
      else {
        //Try change rotation (Horizontal -> Vertical)
        let count = await db.withSchema('gis').count('a','b').from('squares1')
        .where('project_no', -1)
        .whereBetween('b', [random_a, random_a + i -1])
        .whereBetween('a', [random_b, random_b + j -1])
        .catch(err => res.status(400).json({dbError: 'db error'}))
  
        if (parseInt(count[0].count) == i*j){ //update if all values are available
          
          await db('squares1').withSchema('gis').update({
            project_no : data[p].id
          })
          .whereBetween('b', [random_a, random_a + i -1])
          .whereBetween('a', [random_b, random_b + j -1])
          .catch(err => res.status(400).json({dbError: 'db error'}))
          success = true
        }
        else{
        // res.json({test: 'failure })
          success = false 
        }
      }
    }
  }

  db('squares2').withSchema('gis')
  .update({
    project_no : '-1',
  }).catch(err => res.status(400).json({dbError: 'db error'}))

  let data2 = await db.select('*').from('escdummy')
  .where('height', '<', 50)
  .andWhere('level', 2)
  .orderByRaw('length+width DESC')
  .catch(err => res.status(400).json({dbError: 'db error'}))

  for (let p = 0; p < data2.length; p++){
    let success = false;
    while (!success){
      if (req.timedout) return

      let i = parseInt(data2[p].length/0.5)
      let j = parseInt(data2[p].width/0.5)

      let random = await db.withSchema('gis').select('*').from('squares2')
      .where('project_no', -1)
      .orderByRaw('random()')
      .limit(1)
      .catch(err => res.status(400).json({dbError: 'db error'}))

      let random_a = parseInt(random[0].a)
      let random_b = parseInt(random[0].b)

      let count = await db.withSchema('gis').count('a','b').from('squares2')
      .where('project_no', -1)
      .whereBetween('a', [random_a, random_a + i -1])
      .whereBetween('b', [random_b, random_b + j -1])
      .catch(err => res.status(400).json({dbError: 'db error'}))

      if (parseInt(count[0].count) == i*j){ //update if all values are available
        
        await db('squares2').withSchema('gis').update({
          project_no : data2[p].id
        })
        .whereBetween('a', [random_a, random_a + i -1])
        .whereBetween('b', [random_b, random_b + j -1])
        .catch(err => res.status(400).json({dbError: 'db error'}))
        success = true
      } 
      else {
        //Try change rotation (Horizontal -> Vertical)
        let count = await db.withSchema('gis').count('a','b').from('squares2')
        .where('project_no', -1)
        .whereBetween('b', [random_a, random_a + i -1])
        .whereBetween('a', [random_b, random_b + j -1])
        .catch(err => res.status(400).json({dbError: 'db error'}))
  
        if (parseInt(count[0].count) == i*j){ //update if all values are available
          
          await db('squares2').withSchema('gis').update({
            project_no : data2[p].id
          })
          .whereBetween('b', [random_a, random_a + i -1])
          .whereBetween('a', [random_b, random_b + j -1])
          .catch(err => res.status(400).json({dbError: 'db error'}))
          success = true
        }
        else{
        // res.json({test: 'failure })
          success = false 
        }
      }
    }
  }
  res.json({test: 'success'})
}

const getLevel1 = (req, res, db, st) => {
  db.postgisDefineExtras((knex, formatter) => ({  
    asGeoJSON2(col) { // Not exactly sure why st.asGeoJSON won't build the query right
      return knex.raw('ST_asGeoJSON(?)', [formatter.wrapWKT(col)]);
    }
  }));
  db.withSchema('gis').select(st.asGeoJSON2('geom'))
  .from('ccl1')
  .then(items => {
    if(items.length){
      res.json(items)
    } else {
      res.json({dataExists: 'false'})
    }
  })
  .catch(err => res.status(400).json({dbError: 'db error'}))
}

const getLevel2 = (req, res, db, st) => {
  db.postgisDefineExtras((knex, formatter) => ({  
    asGeoJSON2(col) { // Not exactly sure why st.asGeoJSON won't build the query right
      return knex.raw('ST_asGeoJSON(?)', [formatter.wrapWKT(col)]);
    }
  }));
  db.withSchema('gis').select(st.asGeoJSON2('geom'))
  .from('ccl2')
  .then(items => {
    if(items.length){
      res.json(items)
    } else {
      res.json({dataExists: 'false'})
    }
  })
  .catch(err => res.status(400).json({dbError: 'db error'}))
}



  /*
  //////////////////////////////////////////
  Users registrations & Logins
  //////////////////////////////////////////
  */

 const bcrypt = require("bcrypt"); //Hashing

 const registerUserData = async (req, res, db) => {

    // Create table if it doesn't exist
    await db.schema.hasTable('usertable').then(function(exists) {
      if (!exists) {
        return db.schema.createTable('usertable', function(t) {
          t.string('username').primary();
          t.string('password');
          t.string('email');
          t.string('type');
          t.date('date_added');
          t.string('salt');
        })
      }
    })
  // Register user
    var{ username, password, email, type } = req.body
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    console.log(password);
    password = await bcrypt.hash(password,salt);
    console.log(password);
    const date_added = new Date()
    db('usertable').insert({ username, password, email, type, date_added, salt })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
  }

  const getUserData = async (req, res, db) => {
    var { username, password } = req.body
    var salt = '';

    await db('usertable').where({
      username: username
    }).select('salt')
    .then(items => {
      console.log(items)
      salt = items[0].salt
      console.log(salt)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))

    console.log(password)
    password = await bcrypt.hash(password,salt);
    console.log(password)

    db('usertable').where({
      username: username ,
      password: password 
    }).select('password')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.status(400).json({dbError: 'No data found'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))

  }

  module.exports = {
    getTableData,
    postTableData,
    putTableData,
    deleteTableData,
    registerUserData,
    getUserData,
    getLevel1,
    getLevel2,
    getSquaresL1,
    getSquaresL2,
    clearSquares,
    allocateSquares
  }
