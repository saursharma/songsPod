var express = require('express');
var router = express.Router();

/* Establish connection with MySQL server */
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'songs'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

/* GET number of albums and number of songs in the database. */
router.get('/', function(req, res, next) {
  var songcount = 0;
  var albumcount = 0;
  connection.query('SELECT COUNT(*) AS songscount FROM `songs`', function (error, results, fields) {
    if (error) {
      console.error('error fetching: ' + error.stack);
    return;
    }
    songcount = results[0].songscount;
    connection.query('SELECT COUNT(DISTINCT albumID) AS albumcount FROM `songs`', function (error, results, fields) {
      if (error) {
        console.error('error fetching: ' + error.stack);
        return;
      }
      albumcount = results[0].albumcount;
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send({
        'songs': songcount,
        'album': albumcount
      });
    });
  });
});

/* GET songs listing. Returns 50 in one go. */
router.get('/songs/:id', function(req, res, next) {
  connection.query('SELECT * FROM `songs` LIMIT 50 OFFSET ?', [parseInt(req.params.id)], function (error, results, fields) {
      // error will be an Error if one occurred during the query
    //   // results will contain the results of the query
    //     // fields will contain information about the returned results fields (if any)
  if (error) {
    console.error('error fetching: ' + error.stack);
    return;
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.send(results);
  });
});

/* Updates song. */
router.post('/update', function(req, res, next) {
  connection.query('UPDATE `songs` SET name=?,link=?,albumID=?,downloads=? WHERE songID= ?',
                   [req.body.name, req.body.link, req.body.albumID, req.body.downloads, req.body.songID],
                   function (error, results, fields) {
  if (error) {
    console.error('error fetching: ' + error.stack);
    return;
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.send(results);
  });
});

module.exports = router;
