DROP DATABASE IF EXISTS navix;
CREATE DATABASE navix;
USE navix;

CREATE TABLE endereco (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    rua VARCHAR(300) NOT NULL,
    numero INT NOT NULL,
    cep CHAR(8) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(200) NOT NULL,
    estado VARCHAR(100) NOT NULL,
    pais VARCHAR(200) NOT NULL
);

CREATE TABLE empresa (
	id_empresa INT NOT NULL AUTO_INCREMENT,
    razaoSocial VARCHAR(50) NOT NULL,
    cnpj VARCHAR(14) NOT NULL,
    fkEndereco INT NOT NULL,
    PRIMARY KEY (id_empresa),
    CONSTRAINT fkendereco FOREIGN KEY (fkEndereco) REFERENCES endereco(id)
);

CREATE TABLE funcionario (
	id_funcionario INT NOT NULL AUTO_INCREMENT,
    fkEmpresa INT,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    telefone VARCHAR(11),
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(250) NOT NULL,
    cargo VARHCAR(100) NOT NULL,
	caminhoImagem VARCHAR(500) NOT NULL DEFAULT '../assets/img/foto-usuario.png',
    CONSTRAINT chk_telefone CHECK (CHAR_LENGTH(telefone) IN (10, 11)),
    PRIMARY KEY (id_funcionario),
    UNIQUE (email), 
    CONSTRAINT fk_empresa_funcionario FOREIGN KEY (fkEmpresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE lote (
	id_lote INT NOT NULL AUTO_INCREMENT,
    codigo_lote VARCHAR(50) NOT NULL, 
    data_fabricacao DATE,
    PRIMARY KEY(id_lote),
    UNIQUE(codigo_lote)
);

CREATE TABLE veiculo (
	id_veiculo INT NOT NULL AUTO_INCREMENT,
    fkempresa INT NOT NULL,
    fklote INT NOT NULL,
    modelo VARCHAR(50),
    pilotoAuto_versao VARCHAR(20),
    data_ativacao DATE,
    status ENUM('ativo', 'manutenção', 'inativo'),
    PRIMARY KEY (id_veiculo),
    CONSTRAINT fk_veiculo_empresa FOREIGN KEY (fkempresa) REFERENCES empresa(id_empresa),
    CONSTRAINT fk_veiculo_lote FOREIGN KEY (fklote) REFERENCES lote(id_lote)
);

CREATE TABLE t_hardware (
	idTipo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tipo ENUM ('CPU','RAM','DISCO'),
    unidadeMedida VARCHAR(10)
);

CREATE TABLE hardware (
	idHardware INT NOT NULL PRIMARY KEY,
    fkTipo INT NOT NULL,
    fkVeiculo INT NOT NULL,
    parametro INT NOT NULL,
    CONSTRAINT fk_tipo FOREIGN KEY (fkTipo) REFERENCES t_hardware(idTipo),
    CONSTRAINT fk_veiculo FOREIGN KEY (fkVeiculo) REFERENCES veiculo(id_veiculo)
);

CREATE TABLE alerta (
	id_alerta INT NOT NULL AUTO_INCREMENT,
    descricao TEXT,
    nivel ENUM('baixo', 'medio', 'alto') NOT NULL,
    data_alerta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente', 'em análise', 'resolvido') NOT NULL, 
    prioridade INT NOT NULL,
    PRIMARY KEY (id_alerta),
    CONSTRAINT chk_prioridade CHECK (prioridade IN (1, 2, 3, 4, 5))
);

CREATE TABLE hard_alerta (
	idHAlerta INT NOT NULL AUTO_INCREMENT,
	fkAlerta INT NOT NULL,
    fkHardware INT NOT NULL,
    quantidade INT,
    PRIMARY KEY(idHAlerta, fkAlerta, fkHardware),
    CONSTRAINT fk_Alerta FOREIGN KEY (fkAlerta) REFERENCES alerta(id_Alerta),
    CONSTRAINT fk__Hardware FOREIGN KEY (fkHardware) REFERENCES hardware(idHardware)
);DROP DATABASE IF EXISTS navix;
CREATE DATABASE navix;
USE navix;

CREATE TABLE endereco (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    rua VARCHAR(300) NOT NULL,
    numero INT NOT NULL,
    cep CHAR(8) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    cidade VARCHAR(200) NOT NULL,
    estado VARCHAR(100) NOT NULL,
    pais VARCHAR(200) NOT NULL
);

CREATE TABLE empresa (
	id_empresa INT NOT NULL AUTO_INCREMENT,
    razaoSocial VARCHAR(50) NOT NULL,
    cnpj VARCHAR(14) NOT NULL,
    fkEndereco INT NOT NULL,
    PRIMARY KEY (id_empresa),
    CONSTRAINT fkendereco FOREIGN KEY (fkEndereco) REFERENCES endereco(id)
);

CREATE TABLE funcionario (
	id_funcionario INT NOT NULL AUTO_INCREMENT,
    fkEmpresa INT,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    telefone VARCHAR(11),
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(250) NOT NULL,
    cargo BOOLEAN NOT NULL,
	caminhoImagem VARCHAR(500) NOT NULL DEFAULT '../assets/img/foto-usuario.png',
    CONSTRAINT chk_telefone CHECK (CHAR_LENGTH(telefone) IN (10, 11)),
    PRIMARY KEY (id_funcionario),
    UNIQUE (email), 
    CONSTRAINT fk_empresa_funcionario FOREIGN KEY (fkEmpresa) REFERENCES empresa(id_empresa)
);

CREATE TABLE lote (
	id_lote INT NOT NULL AUTO_INCREMENT,
    codigo_lote VARCHAR(50) NOT NULL, 
    data_fabricacao DATE,
    PRIMARY KEY(id_lote),
    UNIQUE(codigo_lote)
);

CREATE TABLE veiculo (
	id_veiculo INT NOT NULL AUTO_INCREMENT,
    fkempresa INT NOT NULL,
    fklote INT NOT NULL,
    modelo VARCHAR(50),
    pilotoAuto_versao VARCHAR(20),
    data_ativacao DATE,
    status ENUM('ativo', 'manutenção', 'inativo'),
    PRIMARY KEY (id_veiculo),
    CONSTRAINT fk_veiculo_empresa FOREIGN KEY (fkempresa) REFERENCES empresa(id_empresa),
    CONSTRAINT fk_veiculo_lote FOREIGN KEY (fklote) REFERENCES lote(id_lote)
);

CREATE TABLE t_hardware (
	idTipo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tipo ENUM ('CPU','RAM','DISCO'),
    unidadeMedida VARCHAR(10)
);

CREATE TABLE hardware (
	idHardware INT NOT NULL PRIMARY KEY,
    fkTipo INT NOT NULL,
    fkVeiculo INT NOT NULL,
    parametro INT NOT NULL,
    CONSTRAINT fk_tipo FOREIGN KEY (fkTipo) REFERENCES t_hardware(idTipo),
    CONSTRAINT fk_veiculo FOREIGN KEY (fkVeiculo) REFERENCES veiculo(id_veiculo)
);

CREATE TABLE alerta (
	id_alerta INT NOT NULL AUTO_INCREMENT,
    descricao TEXT,
    nivel ENUM('baixo', 'medio', 'alto') NOT NULL,
    data_alerta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente', 'em análise', 'resolvido') NOT NULL, 
    prioridade INT NOT NULL,
    PRIMARY KEY (id_alerta),
    CONSTRAINT chk_prioridade CHECK (prioridade IN (1, 2, 3, 4, 5))
);

CREATE TABLE hard_alerta (
	idHAlerta INT NOT NULL AUTO_INCREMENT,
	fkAlerta INT NOT NULL,
    fkHardware INT NOT NULL,
    quantidade INT,
    PRIMARY KEY(idHAlerta, fkAlerta, fkHardware),
    CONSTRAINT fk_Alerta FOREIGN KEY (fkAlerta) REFERENCES alerta(id_Alerta),
    CONSTRAINT fk__Hardware FOREIGN KEY (fkHardware) REFERENCES hardware(idHardware)
);