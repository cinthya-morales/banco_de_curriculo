const { v4: uuidv4 } = require('uuid');

var express = require('express');
var router = express.Router();

var pgp = require('pg-promise')(/* options */)
var ssl = {rejectUnauthorized: false};
var db = pgp({
  connectionString: process.env.DATABASE_URL || 'postgres://cinthya:123456@localhost:5432/jobsnet',
  max: 30,
  ssl:ssl
});

router.get('/', function(req, res, next) {
  // #swagger.description = 'Lista todos os candidatos cadastrados'

  db.any('select * from candidatos')
    .then(function(data) {
      res.send(data);
      // success;
    })
    .catch(function(error) {
      res.send(error); 
      // error;
    });
});


router.get('/:idCandidato', function(req, res, next) {
  // #swagger.description = 'Retorna um candidato específico'

  db.one("select * from candidatos where id = $1", req.params["idCandidato"])
    .then(function(data) {

      /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Candidato" },
      description: "Retorna um candidato específico" } */
      res.send(data);
      // success;
    })
    .catch(function(error) {
      res.status(404).send(error);
      // error;
    });

    /*res.send('candidato '+req.params["idCandidato"]);*/
});

router.post('/', function(req, res, next) {
  // #swagger.description = 'Cadastra um candidato'
  /*	#swagger.parameters['Candidato'] = {
            in: 'body',
            description: 'Informações do candidato',
            required: true,
            type: 'object',
            schema: { $ref: "#/definitions/Candidato" }
    } */
    console.log(req.body);

    var tem_cnh = false;
    if(req.body["tem_cnh"] == "sim") {
      tem_cnh = true
    }

    var tem_veiculo = false;
    if(req.body["tem_veiculo"] == "sim") {
      tem_veiculo = true
    }

    db.none(
      'insert into candidatos values(${id}, ${cpf}, ${rg}, ${nome}, ${cargo}, to_date(${nascimento}, \'DD/MM/YYYY\'),${estado_civil}, ${sexo}, '+
      '${email}, ${tem_cnh}, ${tem_veiculo}, ${cep}, ${bairro}, ${cidade}, ${endereco}, ${numero_casa}, ${telefone}, ${celular})', 
    {
        id: uuidv4(), 
        cpf: req.body["cpf"],
        rg: req.body["rg"],
        nome:req.body["nome"],
        cargo:req.body["cargo"],
        nascimento:req.body["nascimento"],
        estado_civil:req.body["estado_civil"],
        sexo:req.body["sexo"],
        email:req.body["email"],
        tem_cnh: tem_cnh,
        tem_veiculo: tem_veiculo,
        cep:req.body["cep"],
        bairro:req.body["bairro"],
        cidade:req.body["cidade"],
        endereco:req.body["endereco"],
        numero_casa:req.body["numero_casa"],
        telefone:req.body["telefone"],
        celular: req.body["celular"],
    }).then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Candidato adicionado com sucesso!'
        });
    })
    .catch(function (err) {
      return next(err);
    });
  });

module.exports = router;
