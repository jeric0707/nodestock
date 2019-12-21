const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const request = require('request');

const PORT  = process.env.PORT || 5000;

//API KEY pk_4faa6cc753644e4a9a567b861a7ef398
//create call_api function

function call_api(finishedAPI){
	request ('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_4faa6cc753644e4a9a567b861a7ef398', { json: true}, (err, res,body) =>{
	if (err) {return console.log(err); }
	console.log(body);
	if (res.statusCode === 200){
		//console.log(body);
		finishedAPI (body);
		};
	}) ;
};





//set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
const otherstuff = "hello there, this is another stuff!";

//set Handlebars routes
app.get('/', function (req, res) {
	 call_api(function(doneAPI) {
	 	 res.render('home', {
    	stock: doneAPI
    	});
	 });
	
   
});


// create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
    	
    });

// Set static folder

app.use(express.static(path.join(__dirname, 'public')  ));

app.listen(PORT, () => console.log('Server Listening on Port ' +  PORT)); 