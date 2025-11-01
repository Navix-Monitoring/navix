-- DDL (Data Definition Language)
-- Criação do Banco de Dados e Tabelas

DROP DATABASE IF EXISTS navix;

CREATE DATABASE IF NOT EXISTS navix;

USE navix;

-- Tabela: cargo (Ajustado o 'id' para ser AUTO_INCREMENT para facilitar a FK)
CREATE TABLE cargo(
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(30)
);

-- Tabela: empresa
CREATE TABLE empresa(
    id INT PRIMARY KEY AUTO_INCREMENT,
    razaoSocial VARCHAR(50),
    cnpj VARCHAR(14),
    codigo_ativacao VARCHAR(20)
);

-- Tabela: endereco
CREATE TABLE endereco(
    id INT PRIMARY KEY AUTO_INCREMENT,
    rua VARCHAR(50),
    numero INT,
    cep CHAR(8),
    bairro VARCHAR(30),
    cidade VARCHAR(30),
    estado VARCHAR(20),
    pais VARCHAR(20),
    fkEmpresa INT NOT NULL,
    CONSTRAINT fkEnderecoEmpresa FOREIGN KEY(fkEmpresa) REFERENCES empresa(id)

);


-- Tabela: funcionario
CREATE TABLE funcionario(
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkEmpresa INT NOT NULL,
    nome VARCHAR(50),
    sobrenome VARCHAR(50),
    telefone VARCHAR(11),
    email VARCHAR(100),
    senha VARCHAR(250),
    fkCargo INT NOT NULL,
    caminhoImagem VARCHAR(500),
    CONSTRAINT fkEmpresaFuncionario FOREIGN KEY(fkEmpresa) REFERENCES empresa(id),
    CONSTRAINT fkCargoFuncionario FOREIGN KEY(fkCargo) REFERENCES cargo(id)
);


-- Tabela: lote
CREATE TABLE lote(
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo_lote VARCHAR(50),
    data_fabricacao DATE,
    fkEmpresa INT,
    status ENUM('Ativo','Manutenção','Inativo'),
    CONSTRAINT fkEmpresaLote FOREIGN KEY(fkEmpresa) REFERENCES empresa(id),
    UNIQUE KEY uk_lote_empresa (codigo_lote, fkEmpresa)
);

-- Tabela: modelo
CREATE TABLE modelo(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    status ENUM('Ativo','Descontinuado'),
    versaoPilotoAutomatico VARCHAR(45),
    fkEmpresa int,
    CONSTRAINT fkEmpresaModelo FOREIGN KEY(fkEmpresa) REFERENCES empresa(id),
    UNIQUE KEY uk_modelo_empresa (nome, versaoPilotoAutomatico, fkEmpresa)
);

-- Tabela: veiculo
CREATE TABLE veiculo(
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkModelo INT NOT NULL,
    fkLote INT NOT NULL,
    data_ativacao DATE,
    quantidade_modelo INT,
    CONSTRAINT fkModeloVeiculo FOREIGN KEY(fkModelo) REFERENCES modelo(id),
    CONSTRAINT fkLoteVeiculo FOREIGN KEY(fkLote) REFERENCES lote(id)
);

-- Tabela: hardware (Ajustado o 'id' para ser AUTO_INCREMENT para facilitar as FKs)
CREATE TABLE hardware(
    id INT PRIMARY KEY AUTO_INCREMENT,
    tipo ENUM('CPU','RAM','DISCO')
);

-- Tabela Associativa: parametroHardware (N:N)
CREATE TABLE parametroHardware(
    fkHardware INT,
    fkModelo INT,
    unidadeMedida VARCHAR(15),
    parametroMinimo INT,
    parametroNeutro INT,
    parametroAtencao INT,
    parametroCritico INT,
    CONSTRAINT fkHardwareParametro FOREIGN KEY(fkHardware) REFERENCES hardware(id),
    CONSTRAINT fkModeloParametro FOREIGN KEY(fkModelo) REFERENCES modelo(id),
    PRIMARY KEY(fkHardware, fkModelo, unidadeMedida)
);

-- 1. Inserir Cargos (Regras de Negócio: Administrador, Funcionario, Analista)
INSERT INTO cargo (titulo)
VALUES
('Administrador'), -- ID 1
('Funcionario'),   -- ID 2
('Analista');      -- ID 3

INSERT INTO empresa (razaoSocial, cnpj, codigo_ativacao)
VALUES 
('Tech Solutions LTDA', '12345678000195', 'ABC123'),
('Auto Veículos S.A.', '98765432000189', 'XYZ987');

INSERT INTO endereco (rua, numero, cep, bairro, cidade, estado, pais,fkEmpresa)
VALUES 
('Rua das Flores', 123, '12345678', 'Centro', 'São Paulo', 'SP', 'Brasil',1),
('Av. Paulista', 1000, '87654321', 'Bela Vista', 'São Paulo', 'SP', 'Brasil',2);

INSERT INTO funcionario (fkEmpresa, nome, sobrenome, telefone, email, senha, fkCargo)
VALUES 
(1, 'Carlos', 'Silva', '11987654321', 'carlos.silva@tech.com', 'senha123', 1), -- ID 1: Administrador
(2, 'Ana', 'Oliveira', '11987654322', 'ana.oliveira@auto.com', 'senha456', 2), -- ID 2: Funcionario
(1, 'Gabriel', 'Santos', '11982654321', 'gabriel.santos@tech.com', 'senha143', 3); -- ID 3: Analista

INSERT INTO hardware (tipo)
VALUES 
('CPU'), -- ID 1
('RAM'), -- ID 2
('DISCO'); -- ID 3


select * from funcionario;
select * from modelo;
select * from parametroHardware;
select * from lote;
select * from veiculo;

-- Mdelos de uma empresa
SELECT 
    m.id, 
    m.nome AS Modelo, 
    m.status, 
    e.razaoSocial AS Empresa
FROM 
    modelo m
JOIN 
    empresa e ON m.fkEmpresa = e.id
WHERE 
    e.id = 1;

-- Lotes de uma empresa
SELECT 
    l.id, 
    l.codigo_lote, 
    l.status, 
    e.razaoSocial AS Empresa
FROM 
    lote l
JOIN 
    empresa e ON l.fkEmpresa = e.id
WHERE 
    e.id = 1; 

-- Veiculos de uma empresa
SELECT 
    v.id AS idVeiculo,
    v.data_ativacao,
    v.quantidade_modelo,
    m.nome AS Modelo,         
    l.codigo_lote AS Lote,  
    e.razaoSocial AS Empresa  
FROM 
    veiculo v
JOIN 
    modelo m ON v.fkModelo = m.id   
JOIN 
    empresa e ON m.fkEmpresa = e.id  
JOIN
    lote l ON v.fkLote = l.id       
WHERE 
    e.id = 2;
-- AND l.codigo_lote = 'empresalote';    