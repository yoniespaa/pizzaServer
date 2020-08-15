const express = require('express');
const router = express.Router();
//llamamos a la conexion de mysql
var mysqlConnection = require('../database.js').mysqlConnection;


// GET all Productos
router.get('/menu', (req, res) => {
  mysqlConnection.getConnection(function (err, conn) {
    conn.query('CALL PRC_MENU()', (err, rows) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }

    });
  })
});

// GET An Productos for id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.getConnection(function (err, conn) {
    conn.query('SELECT * FROM tbl_producto WHERE id_producto = ?', [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows[0]);
      } else {
        console.log(err);
      }
    });
  });
});

// GET Ingredientes
router.post('/ingredientes', (req, res) => {
  const { id } = req.body;
  console.log(id);
  const query = `
    CALL PRC_LIST_INGREDIENTES(?);
  `;
  mysqlConnection.getConnection(function (err, conn) {
    conn.query(query, [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows);
        res.json({ status: 'Ingredientes encontrados' });
      } else {
        console.log(err);
      }

    });
    console.log(err);
  });

});
// SAVE NEW CUSTOMER
router.post('/newcustomer', (req, res) => {
  const { nombre, nit, correo, password, direccion } = req.body;
  console.log();
  const query =`
    CALL PRC_CREATE_CLI( ? , ? , ? , ? , ?);
  `;
  mysqlConnection.getConnection(function (err, conn) {
    conn.query(query, [nombre, nit, correo, password, direccion], (err, rows, fields) => {
      if (!err) {
        res.json(rows);
        res.json({ status: 'Cliente agregado' });
      } else {
        console.log(err);
      }
    });
  });
});

// GET SUBMENU
router.put('/submenu/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SET @id = ?;
    CALL PRC_SUB_MENU(@id);
  `;
  mysqlConnection.getConnection(function (err, conn) {
    conn.query(query, [id], (err, rows, fields) => {
      if (!err) {
        res.json(rows);
        res.json({ status: ' ' });
      } else {
        console.log(err);
      }
    });
  });
});

module.exports = router;
