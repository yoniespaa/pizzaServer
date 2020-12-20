const express = require('express');
const sql = require('mssql');
const { connection } = require('../database.js');
const router = express.Router();
//llamamos a la conexion de mysql
//var requ = require('../database.js').request;


// GET all movies
router.get('/all', (req, res) => {

  request.query('select * from movie', function (err, recuperado) {
            
    if (err) console.log(err)

    // send records as a response
    res.json(recuperado);
    //console.log(recuperado)
    
});
});
// GET all cinema_show
router.post('/getListings', (req, res) => {
  const { fecha } = req.body;
  const query = `
    GET_MOVIE_SHOW_FOR_DATE '${fecha}';
  `;
  request.query(query, function (err, recuperado) {
            
    if (err) console.log(err)

    // send records as a response
    res.json(recuperado);
    //console.log(recuperado)
    
});
});
//get show for movie an date
router.post('/getShows', (req, res) => {
 // console.log("llega aqui")
  const { id_movie } = req.body;
  const { fecha } = req.body;
  const query = `
  EXEC GET_SHOW_FOR_MOVIE_AND_DATE ${id_movie}, '${fecha}';
  `;
 // console.log(query)
  request.query(query, function (err, recuperado) {
            
    if (err) console.log(err)

    // send records as a response
    res.json(recuperado);
    //console.log(recuperado)
    
});
});
//obtiene informacion por pelicula
router.post('/getMovie', (req, res) => {
  // console.log("llega aqui")
   const { id_movie } = req.body;
   const query = `
   EXEC GET_MOVIE_FOR_ID ${id_movie};
   `;
  // console.log(query)
   request.query(query, function (err, recuperado) {
             
     if (err) console.log(err)
 
     // send records as a response
     res.json(recuperado);
     //console.log(recuperado)
     
 });
 });
 //DISPONIBILIDAD DE ASIENTOS POR EVENTO
 router.post('/availability', (req, res) => {
   //console.log("llega aqui")
   const { id_show } = req.body;
   const query = `
   EXEC SP_GET_AVAILABILTY_SEATS ${id_show};
   `;
  // console.log(query)
   request.query(query, function (err, recuperado) {
             
     if (err) console.log(err)
 
     // send records as a response
     res.json(recuperado);
     //console.log(recuperado)
     
 });
 });
 // obtiene informacion de la reservacion
 router.post('/validate', (req, res) => {
  //console.log("llega aqui")
  const { id_show } = req.body;
  const { id_seat } = req.body;
  const query = `
  SP_GET_PRESERVATION_INFO ${id_show} ,${id_seat};
  `;
 // console.log(query)
  request.query(query, function (err, recuperado) {
            
    if (err) console.log(err)

    // send records as a response
    res.json(recuperado);
    //console.log(recuperado)
    
});
});
// inser new reservation 
router.post('/newReservation', (req, res) => {
  //console.log("llega aqui")
  const { id_show } = req.body;
  const { id_seat } = req.body;
  const { name } = req.body;
  const { card } = req.body;
  const query = `
  EXEC [NEW_RESERVATION] ${id_show}, ${id_seat}, '${name}', '${card}'
  `;
 // console.log(query)
  request.query(query, function (err, recuperado) {
            
    if (err) console.log(err)

    // send records as a response
    res.json(recuperado);
    //console.log(recuperado)
    
});
});

module.exports = router;
