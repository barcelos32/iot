/**
 * Pós Graduação Internet das Coisas - CEFET-MG Disciplina: Programação para
 * Sistemas de Computação Exemplo prático de RESTFul com NodeJS e MongoDB
 */

/* Módulos Utilizados */
var express = require('express'); 
var cors = require('cors'); 
var bodyParser = require('body-parser'); 
var atuador = require('./models/atuador_bd_connect'); // Modelos definidos
var mongoose = require('mongoose');

var url = "mongodb://localhost:27017/atuador";
mongoose.connect(url);

var app = express(); // Cria o app com Express
var router = express.Router();

app.use(cors()); // liberar todos os do app acessos CORS
app.use(bodyParser.urlencoded({ 
	extended : true
})); 
app.use(bodyParser.json()); // configurações do body parser

/* Rota para acompanhar as requisições */
router.use(function(req, res, next) {
	console.log('Entrou na rota ');
	next(); // continua na próxima rota
});

//GET /
router.get('/', function(req, res) {
	res.json({
		message : 'API - IoT'
	});
});

//GET /atuador
router.route('/atuador').get(function(req, res) {
	atuador.find(function(err, atuador) {
		if (err)
			res.send(err);

		res.json(atuador);
	});
	console.log('GET /atuador');
});

//GET /atuador/:id
router.route('/atuador/:id').get(function(req, res) {
	atuador.findById(req.params.id, function(error, atuador) {
		if(error)
			res.send(error);

		res.json(atuador);
	});
	console.log('GET /atuador/:id');
});

//GET /atuador/recente
router.route('/atuador/recente').get(function(req, res) {
	var limit =  1;
	var sort  = -1;
	Atuador.
	find().
	limit(limit).
	sort({ _id: sort })
	.exec(function(err, atuador) {
		if (err)
			res.send(err);

		res.json(atuador);
	});
	console.log('GET /atuador/recente');
});

/* POST /atuador {time:"..",valor:"..."} */
router.route('/atuador').post(function(req, res) {
	var atuador = new atuador();

	atuador.time = req.body.time;
	atuador.valor = req.body.valor;

	atuador.save(function(error) {
		if (error)
			res.send(error);

		res.json({
			message : 'atuador atualizado!'
		});
	});
	console.log('POST /atuador');
});

//PUT /atuador/:id {time:"..",valor:"..."}
router.route('/atuador/:id').put(function(req, res) {
	atuador.findById(req.params.id, function(error, atuador) {
		if(error)
			res.send(error);

		atuador.time = req.body.time;
		atuador.valor = req.body.valor;

		atuador.save(function(error) {
			if(error)
				res.send(error);
			res.json({ message: 'atuador Atualizado!' });
		});
	});
	console.log('PUT /atuador/:id');
});

//DELETE /atuador/:id
router.route('/atuador/:id').delete(function(req, res) {
	atuador.remove({
		_id: req.params.id
	}, function(error) {
		if(error)
			res.send(error);
		res.json({ message: 'atuador excluída com Sucesso! '});
	});
	console.log('DELETE /atuador/:id');
});

app.use('/', router);

app.listen(3000);
console.log('Servidor executando.');
