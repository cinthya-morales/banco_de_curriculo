'use strict';

const limparFormulario = (endereco) =>{
    document.getElementById('endereco').value = '';
    document.getElementById('bairro').value = '';
    document.getElementById('cidade').value = '';
}


const preencherFormulario = (endereco) =>{
    document.querySelector("label[for='endereco']").className = "active";
    document.getElementById('endereco').value = endereco.logradouro;

    document.querySelector("label[for='bairro']").className = "active";
    document.getElementById('bairro').value = endereco.bairro;

    document.querySelector("label[for='cidade']").className = "active";
    document.getElementById('cidade').value = endereco.localidade;
}


const eNumero = (numero) => /^[0-9]+$/.test(numero);

const cepValido = (cep) => cep.length == 8 && eNumero(cep); 

const pesquisarCep = async() => {
    limparFormulario();
    
    const cep = document.getElementById('cep').value;
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    if (cepValido(cep)){
        const dados = await fetch(url);
        const endereco = await dados.json();
        if (endereco.hasOwnProperty('erro')){
            document.getElementById('endereco').value = 'CEP não encontrado!';
        }else {
            preencherFormulario(endereco);
        }
    }else{
        document.getElementById('endereco').value = 'CEP incorreto!';
    }
     
}

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems);
    document.getElementById('cep').addEventListener('focusout',pesquisarCep);
});
