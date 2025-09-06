DROP DATABASE IF EXISTS navix;
CREATE DATABASE navix;
USE navix;

CREATE TABLE empresa (
	id_empresa INT NOT NULL auto_increment,
    razaoSocial VARCHAR(50) NOT NULL,
    cnpj VARCHAR(14) NOT NULL,
    emailCorporativo VARCHAR(50) not null,
    senha VARCHAR(250) not null,
	caminhoImagem VARCHAR(500) NOT NULL DEFAULT '../assets/img/foto-usuario.png',
    PRIMARY KEY (id_empresa),
    UNIQUE (emailCorporativo, cnpj)
);

create table usuario (
	id_usuario INT NOT NULL auto_increment,
    fkEmpresa INT,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    telefone VARCHAR(11),
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(250) NOT NULL,
    cargo VARCHAR(30) NOT NULL,
	caminhoImagem VARCHAR(500) NOT NULL DEFAULT '../assets/img/foto-usuario.png',
    CONSTRAINT chk_telefone CHECK (CHAR_LENGTH(telefone) IN (10, 11)),
    PRIMARY KEY (id_usuario),
    UNIQUE (email), 
    CONSTRAINT fk_empresa_usuario FOREIGN KEY (fkEmpresa) REFERENCES empresa(id_empresa), 
	KEY ix_fkEmprsa (fkEmpresa) 
);

create table lote(
	id_lote int not null auto_increment,
    codigo_lote varchar(50) not null, 
    data_fabricacao date,
    primary key(id_lote),
    unique(codigo_lote)
);

create table veiculo (
	id_veiculo int not null auto_increment,
    fkempresa int not null,
    fklote int not null,
    modelo varchar(50),
    pilotoAuto_versao varchar(20),
    data_ativacao date,
    status enum('ativo', 'manutenção', 'inativo'),
    primary key (id_veiculo),
    constraint fk_veiculo_empresa foreign key (fkempresa) references empresa(id_empresa),
    constraint fk_veiculo_lote foreign key (fklote) references lote(id_lote)
);

create table t_hardware (
	idTipo int not null primary key auto_increment,
    tipo enum ('CPU','RAM','DISCO')
);

create table hardware (
	idHardware int not null primary key,
    fkTipo int not null,
    fkVeiculo int not null,
    parametro decimal(5,2) not null,
    constraint fk_tipo foreign key (fkTipo) references t_hardware(idTipo),
    constraint fk_veiculo foreign key (fkVeiculo) references veiculo(id_veiculo)
);


create table alerta (
	id_alerta INT NOT NULL auto_increment,
    descricao text,
    nivel enum('baixo', 'medio', 'alto') NOT NULL,
    data_alerta DATETIME NOT NULL default CURRENT_TIMESTAMP,
    status enum('pendente', 'em análise', 'resolvido') NOT NULL, 
    prioridade int not null,
    PRIMARY KEY (id_alerta),
    CONSTRAINT chk_prioridade CHECK (prioridade IN (1, 2, 3, 4, 5))
);

create table hard_alerta (
	idHAlerta int not null auto_increment,
	fkAlerta int not null,
    fkHardware int not null,
    quantidade int,
    primary key(idHAlerta, fkAlerta, fkHardware),
    constraint fk_Alerta foreign key (fkAlerta) references alerta(id_Alerta),
    constraint fk__Hardware foreign key (fkHardware) references hardware(idHardware)
);

