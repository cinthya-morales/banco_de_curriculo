create  table candidatos(
id uuid PRIMARY KEY,
cpf varchar(11) unique,
rg varchar(15) UNIQUE,
nome varchar(100) not null,
cargo varchar(30) not null,
nascimento date not null,
estado_civil varchar(15) not null,
sexo varchar(10) not null,
email varchar(100) not null,
tem_cnh boolean,
tem_veiculo boolean,
cep varchar(10) not null,
bairro varchar(50) not null,
cidade varchar(50) not null,
endereco varchar(100) not null,
numero_casa varchar(10) not null,
celular varchar(15),
telefone varchar(20)
);

insert into candidatos values('46fca726-0be1-4e5f-b408-f4c3e7f43cf4','51493739905', '330711726', 'Raimundo Raul Martins', 'Dev', '25/08/1987', 
'Casado', 'Masculino', 'raimundo@teste.com', true, false, '80530100', 'CIC', 'Curitiba', 'Rua Lysimaco Ferreira da Costa', '206','4138970311', '41991426998');

insert into candidatos values('46fca726-0be1-4e5f-b408-f4c3e7f43cf4','06795782930', '355852172', 'Caio Gustavo Hugo Pires', 'Dev', '12/03/1987', 
'Casado', 'Masculino', 'raimundo@teste.com', true, false, '80530100', 'CIC', 'Curitiba', 'Rua Engenheiro Eduardo Afonso Nadolny', '206','4138970311', '41991426998');
