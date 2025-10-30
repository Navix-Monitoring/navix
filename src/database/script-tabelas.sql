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
    status ENUM('Ativo','Inativo'),
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
    CONSTRAINT fkEmpresaLote FOREIGN KEY(fkEmpresa) REFERENCES empresa(id)
);

-- Tabela: modelo
CREATE TABLE modelo(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    status ENUM('Ativo','Descontinuado'),
    versaoPilotoAutomatico VARCHAR(45)
);

-- Tabela: veiculo
CREATE TABLE veiculo(
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkModelo INT NOT NULL,
    fkLote INT NOT NULL,
    data_ativacao DATE,
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
    unidadeMedida VARCHAR(10),
    parametroMinimo INT,
    parametroNeutro INT,
    parametroAtencao INT,
    parametroCritico INT,
    CONSTRAINT fkHardwareParametro FOREIGN KEY(fkHardware) REFERENCES hardware(id),
    CONSTRAINT fkModeloParametro FOREIGN KEY(fkModelo) REFERENCES modelo(id),
    PRIMARY KEY(fkHardware, fkModelo)
);



-- 1. Inserir Cargos (Regras de Negócio: Administrador, Funcionario, Analista)
INSERT INTO cargo (titulo)
VALUES
('Administrador'), -- ID 1
('Engenheiro Automotivo'), -- ID 2
('Engenheiro de Qualidade'); -- ID 3  


INSERT INTO empresa (razaoSocial, cnpj, codigo_ativacao)
VALUES 
('Tech Solutions LTDA', '12345678000195', 'ABC123'),
('Auto Veículos S.A.', '98765432000189', 'XYZ987');

INSERT INTO endereco (rua, numero, cep, bairro, cidade, estado, pais,fkEmpresa)
VALUES 
('Rua das Flores', 123, '12345678', 'Centro', 'São Paulo', 'SP', 'Brasil',1),
('Av. Paulista', 1000, '87654321', 'Bela Vista', 'São Paulo', 'SP', 'Brasil',2);

INSERT INTO funcionario (fkEmpresa, nome, sobrenome, telefone, email, senha, fkCargo, status)
VALUES 
(1, 'Carlos', 'Silva', '11987654321', 'carlos.silva@tech.com', 'senha123', 1, 'ativo'), -- ID 1: Administrador
(1, 'Célia', 'Taniwaki', '11982654321', 'celia.taniwaki@tech.com', 'senha456', 2, 'ativo'), -- ID 2: Engenheiro Automotivo
(1, 'Gabriel', 'Santos', '11982654321', 'gabriel.santos@tech.com', 'senha789', 3, 'inativo'), -- ID 3: Engenheiro de Qualidade

(2, 'Jhonas', 'da Silva', '11987654322', 'jhonas.silva@auto.com', 'senha456', 2, 'ativo'), -- ID 1: Administrador
(2, 'Ana', 'Oliveira', '11987654322', 'ana.oliveira@auto.com', 'senha678', 2, 'inativo'), -- ID 2: Engenheiro Automotivo
(2, 'Maria', 'Clara', '1193227855', 'maria.clara02@auto.com', 'senha890', 3, 'inativo'); -- ID 3: Engenheiro de Qualidade

INSERT INTO lote (codigo_lote, data_fabricacao, fkEmpresa, status)
VALUES 
-- Empresa 1
('LT-A93F', '2025-02-11', 1, 'ativo'),
('LT-B72K', '2024-12-28', 1, 'inativo'),
('LT-C19P', '2025-03-23', 1, 'ativo'),
('LT-D58X', '2025-05-09', 1, 'manutenção'),
('LT-E07L', '2025-07-02', 1, 'ativo'),
('LT-F34T', '2025-06-14', 1, 'ativo'),
('LT-G91R', '2025-09-26', 1, 'ativo'),
('LT-H56N', '2025-01-30', 1, 'manutenção'),
('LT-J83M', '2025-10-08', 1, 'ativo'),
('LT-K62Z', '2025-04-17', 1, 'inativo'),

-- Empresa 2
('ENG-A93F', '2025-02-11', 2, 'ativo'),
('CAR-B72K', '2024-12-28', 2, 'ativo'),
('TRN-C19P', '2025-03-23', 2, 'manutenção'),
('BRK-D58X', '2025-05-09', 2, 'ativo'),
('SUS-E07L', '2025-07-02', 2, 'ativo'),
('ELE-F34T', '2025-06-14', 2, 'ativo'),
('INT-G91R', '2025-09-26', 2, 'inativo'),
('EXT-H56N', '2025-01-30', 2, 'manutenção'),
('TIR-J83M', '2025-10-08', 2, 'ativo'),
('OIL-K62Z', '2025-04-17', 2, 'ativo');

INSERT INTO modelo (nome, status, versaoPilotoAutomatico)
VALUES
('E-Drive Alpha L3', 'ativo', '1.2.5'),
('NeoMotion LX3', 'descontinuado', '5.2.5'),
('Voltura Urban 300', 'ativo', '3.3.4'),
('Autovance E3', 'descontinuado', '2.2'),
('TerraEV Vision L3', 'ativo', '1.8'),

-- Modelos 100% Elétricos - Nível 4

('E-Drive Alpha L4', 'ativo', '1.2'),
('NeoMotion LX4', 'ativo', '1.43'),
('Voltura Urban 400', 'descontinuado', '6.4.1'),
('Autovance E4', 'ativo', '2.8.7'),
('TerraEV Vision L4', 'descontinuado', '9.2.8'),
('SkyRide Autonomous', 'ativo', '1.9.3'),
('ElectraOne L4+', 'descontinuado', '1.7.7');

INSERT INTO hardware (tipo)
VALUES 
('CPU'), -- ID 1
('RAM'), -- ID 2
('DISCO'); -- ID 3

-- 8. Inserir Veículos (Dois dados - Usando as FKs criadas)
INSERT INTO veiculo (fkModelo, fkLote, data_ativacao)
VALUES 
(1, 1, '2025-01-01'), -- Veículo 1: Modelo M100 do LOTE-A001
(2, 2, '2025-02-15'); -- Veículo 2: Modelo M200 do LOTE-B002

-- 9. Inserir parametroHardware (Dois dados - N:N)
INSERT INTO parametroHardware (fkHardware, fkModelo, unidadeMedida, parametroMinimo, parametroNeutro, parametroAtencao, parametroCritico)
VALUES 
(1, 1, 'GHz', 2, 3, 4, 5), -- CPU (ID 1) no Modelo M100 (ID 1)
(2, 1, 'GB', 8, 16, 24, 32), -- RAM (ID 2) no Modelo M100 (ID 1)
(3,1,'GB',10,20,30,40);