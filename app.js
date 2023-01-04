const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mysql = require('mysql');
const port = 3000;
var connection = mysql.createConnection({
    //Please Set Your Configuration
    host     : 'localhost',
    user     : 'root',
    password : '', // if your mysql root user has a pw insert it here
    database : 'task',
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
    let filter = req.query.filter
    if (!search && !filter) {
      var q= `select * from patient`
    }
    if (filter === 'normal') {
      var q= `SELECT *  
      FROM patient  
      WHERE FirstName LIKE '%${req.query.search}%' or ID LIKE '%${req.query.search}%' or LastName LIKE '%${req.query.search}%'`
    } else
    if (filter === 'age') {
      var q= `SELECT *  
      FROM patient  
      WHERE FirstName LIKE '%${req.query.search}%' or ID LIKE '%${req.query.search}%' or LastName LIKE '%${req.query.search}%' ORDER BY patient_age DESC`
    } else
    if (filter === "ga") {
      var q= `SELECT *  
      FROM patient  
      WHERE FirstName LIKE '%${req.query.search}%' or ID LIKE '%${req.query.search}%' or LastName LIKE '%${req.query.search}%' ORDER BY pregnancy_age DESC`
    }
    connection.query(q, function(err, results){
        if(err) throw err;
        const qer = results 
        res.render("index", {filter,search,qer});
    });
});


app.listen(port,()=> {
    console.log(`Server Has Started On Port ${port}`)
})