const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Productos
router.get('/menu', (req, res) => {
  mysqlConnection.query('CALL PRC_MENU()', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An Productos for id
router.get('/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM employee WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// GET Ingredientes
router.post('/ingredientes', (req, res) => {
  const {id} = req.body;
  console.log(id);
  const query = `
    SET @id = ?;
    CALL PRC_LIST_INGREDIENTES(@id);
  `;
  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
      res.json({status:'' });
    } else {
      console.log(err);
    }
  });

});
// SAVE NEW CUSTOMER
router.post('/newcustomer', (req, res) => {
  const {nombre, nit, correo, password, direccion} = req.body;
  console.log();
  const query = `

    SET @nombre = ?;
    SET @nit = ?;
    SET @correo = ?;
    SET @password = ?;
    SET @direccion = ?;
    CALL PRC_CREATE_CLI(@nombre, @nit, @correo, @password, @direccion);
  `;
  mysqlConnection.query(query, [nombre, nit, correo, password, direccion], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
      res.json({status:'Cliente agregado' });
    } else {
      console.log(err);
    }
  });
});

// GET SUBMENU
router.put('/submenu/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SET @id = ?;
    CALL PRC_SUB_MENU(@id);
  `;
  mysqlConnection.query(query, [id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
      res.json({status:' '});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
