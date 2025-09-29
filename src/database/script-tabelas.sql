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
	id INT NOT NULL AUTO_INCREMENT,
    razaoSocial VARCHAR(50) NOT NULL,
    cnpj VARCHAR(14) NOT NULL,
    codigo_ativacao VARCHAR(50) NOT NULL,
    fkEndereco INT NOT NULL,
    UNIQUE(cnpj),
    PRIMARY KEY (id),
    CONSTRAINT fkendereco FOREIGN KEY (fkEndereco) REFERENCES endereco(id)
);

CREATE TABLE funcionario (
	id INT NOT NULL AUTO_INCREMENT,
    fkEmpresa INT,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    telefone VARCHAR(11),
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(250) NOT NULL,
    cargo ENUM("Funcionario", "Administrador") NOT NULL,
	caminhoImagem VARCHAR(500) NOT NULL DEFAULT '../assets/img/foto-usuario.png',
    CONSTRAINT chk_telefone CHECK (CHAR_LENGTH(telefone) IN (10, 11)),
    PRIMARY KEY (id),
    UNIQUE (email), 
    CONSTRAINT fk_empresa_funcionario FOREIGN KEY (fkEmpresa) REFERENCES empresa(id)
);

CREATE TABLE lote (
	id INT NOT NULL AUTO_INCREMENT,
    codigo_lote VARCHAR(50) NOT NULL, 
    data_fabricacao DATE,
    PRIMARY KEY(id),
    UNIQUE(codigo_lote)
);

CREATE TABLE veiculo (
	id INT NOT NULL AUTO_INCREMENT,
    fkEmpresa INT NOT NULL,
    fkLote INT NOT NULL,
    modelo VARCHAR(50),
    pilotoAuto_versao VARCHAR(20),
    data_ativacao DATE,
    status ENUM('ativo', 'manutenção', 'inativo'),
    PRIMARY KEY (id),
    CONSTRAINT fk_veiculo_empresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(id),
    CONSTRAINT fk_veiculo_lote FOREIGN KEY (fkLote) REFERENCES lote(id)
);

CREATE TABLE t_hardware (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tipo ENUM ('CPU','RAM','DISCO'),
    unidadeMedida VARCHAR(10)
);

CREATE TABLE hardware (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fkTipo INT NOT NULL,
    fkVeiculo INT NOT NULL,
    parametro INT NOT NULL,
    CONSTRAINT fk_tipo FOREIGN KEY (fkTipo) REFERENCES t_hardware(id),
    CONSTRAINT fk_veiculo FOREIGN KEY (fkVeiculo) REFERENCES veiculo(id)
);

CREATE TABLE alerta (
	id INT NOT NULL AUTO_INCREMENT,
    descricao TEXT,
    nivel ENUM('baixo', 'medio', 'alto') NOT NULL,
    data_alerta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pendente', 'em análise', 'resolvido') NOT NULL, 
    prioridade INT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT chk_prioridade CHECK (prioridade IN (1, 2, 3, 4, 5))
);

CREATE TABLE hard_alerta (
	id INT NOT NULL AUTO_INCREMENT,
	fkAlerta INT NOT NULL,
    fkHardware INT NOT NULL,
    quantidade INT,
    PRIMARY KEY(id, fkAlerta, fkHardware),
    CONSTRAINT fk_Alerta FOREIGN KEY (fkAlerta) REFERENCES alerta(id),
    CONSTRAINT fk__Hardware FOREIGN KEY (fkHardware) REFERENCES hardware(id)
);

-- Inserir Endereços
INSERT INTO endereco (rua, numero, cep, bairro, cidade, estado, pais)
VALUES 
('Rua das Flores', 123, '12345678', 'Centro', 'São Paulo', 'SP', 'Brasil'),
('Av. Paulista', 1000, '87654321', 'Bela Vista', 'São Paulo', 'SP', 'Brasil');

-- Inserir Empresas
INSERT INTO empresa (razaoSocial, cnpj, codigo_ativacao, fkEndereco)
VALUES 
('Tech Solutions LTDA', '12345678000195', 'ABC123', 1),
('Auto Veículos S.A.', '98765432000189', 'XYZ987', 2);

-- Inserir Funcionários
INSERT INTO funcionario (fkEmpresa, nome, sobrenome, telefone, email, senha, cargo)
VALUES 
(1, 'Carlos', 'Silva', '11987654321', 'carlos.silva@tech.com', 'senha123', 'Administrador'),
(2, 'Ana', 'Oliveira', '11987654322', 'ana.oliveira@auto.com', 'senha456', 'Funcionario');

-- Inserir Lotes
INSERT INTO lote (codigo_lote, data_fabricacao)
VALUES 
('Lote001', '2025-01-15'),
('Lote002', '2025-03-10');

-- Inserir Veículos
INSERT INTO veiculo (fkEmpresa, fkLote, modelo, pilotoAuto_versao, data_ativacao, status)
VALUES 
(1, 1, 'Modelo X', 'V1', '2025-06-01', 'ativo'),
(2, 2, 'Modelo Y', 'V2', '2025-07-01', 'manutenção');

-- Inserir Tipos de Hardware
INSERT INTO t_hardware (tipo, unidadeMedida)
VALUES 
('CPU', 'GHz'),
('RAM', 'GB'),
('DISCO', 'TB');

-- Inserir Hardware
INSERT INTO hardware (fkTipo, fkVeiculo, parametro)
VALUES 
(1, 1, 3),  -- 3 GHz de CPU no Veículo 1
(2, 1, 16), -- 16 GB de RAM no Veículo 1
(3, 2, 1);  -- 1 TB de Disco no Veículo 2

-- Inserir Alertas
INSERT INTO alerta (descricao, nivel, status, prioridade)
VALUES 
('Erro no sistema de navegação', 'alto', 'pendente', 1),
('Temperatura elevada no motor', 'medio', 'em análise', 2);

-- Inserir Alerta para Hardware
INSERT INTO hard_alerta (fkAlerta, fkHardware, quantidade)
VALUES 
(1, 1, 2),  -- 2 alertas para o hardware de CPU
(2, 3, 1);  -- 1 alerta para o hardware de Disco