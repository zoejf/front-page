var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
});





app.listen(3000, function () {
  console.log('server started on localhost:3000');
});