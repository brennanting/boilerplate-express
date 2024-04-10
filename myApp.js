let express = require('express');
let bodyParser = require('body-parser')

console.log("Hello World");

let app = express();

app.use("/public", express.static(__dirname + "/public"));

app.use(function(req, res, next){
  console.log (req.method + " " + req.path + " - " + req.ip);
  next();
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html")
});

app.get("/json", function(req, res){
  var response = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response=response.toUpperCase()
  }
  res.json({"message": response});
});

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
next();},
       function (req, res){
         res.send({time: req.time});
       });

app.get('/:word/echo', function(req, res){
  res.json({echo: req.params.word});
});

app.get('/name', function(req, res){
  res.json({name: req.query.first + " " + req.query.last});
});

app.use(bodyParser.urlencoded({extended: false}))

app.post('/name', function(req, res){
  res.json({name: req.body.first + " " + req.body.last});
})
































 module.exports = app;
