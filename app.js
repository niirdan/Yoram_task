const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mysql = require('mysql');
const port = 3000;
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test',
    multipleStatements: true
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static(__dirname + "/public"))

app.get("/", function(req, res){
    // Find count of users in DB
    let search = req.query.search
    var q= `select * from patient`
    if (req.query.search) {
      var q= `SELECT *  
      FROM patient  
      WHERE FirstName LIKE '%${req.query.search}%' or ID LIKE '%${req.query.search}%' or LastName LIKE '%${req.query.search}%'`
    }

    connection.query(q, function(err, results){
        if(err) throw err;
        const qer = results 
        res.render("index", {search,qer});
    });
});


app.listen(port,()=> {
    console.log(`Starting on ${port}`)
})
