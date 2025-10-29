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

CREATE TABLE cargo(
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(100)
);

CREATE TABLE funcionario (
	id INT NOT NULL AUTO_INCREMENT,
    fkEmpresa INT,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    telefone VARCHAR(11),
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(250) NOT NULL,
    statusPerfil ENUM("Ativo", "Inativo") NOT NULL DEFAULT "Ativo",
    fkCargo INT,
	caminhoImagem VARCHAR(500) NOT NULL DEFAULT '../assets/img/foto-usuario.png',
    CONSTRAINT chk_telefone CHECK (CHAR_LENGTH(telefone) IN (10, 11)),
    PRIMARY KEY (id),
    UNIQUE (email),
    CONSTRAINT fk_cargo_funcionario FOREIGN KEY (fkCargo) REFERENCES cargo(id),
    CONSTRAINT fk_empresa_funcionario FOREIGN KEY (fkEmpresa) REFERENCES empresa(id)
);

CREATE TABLE lote (
	id INT NOT NULL AUTO_INCREMENT,
    codigo_lote VARCHAR(50) NOT NULL, 
    data_fabricacao DATE,
    fkEmpresa INT NOT NULL,
    constraint fk_empresa_lote FOREIGN KEY(fkEmpresa) REFERENCES empresa(id),
    status ENUM('ativo', 'manutenção', 'inativo'),
    PRIMARY KEY(id),
    UNIQUE(codigo_lote)
);

CREATE TABLE t_hardware (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tipo ENUM ('CPU','RAM','DISCO'),
    unidadeMedida VARCHAR(10)
);

CREATE TABLE hardware (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    fkTipo INT NOT NULL,
    parametro INT NOT NULL,
    CONSTRAINT fk_tipo FOREIGN KEY (fkTipo) REFERENCES t_hardware(id)
);

create table modelo(
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(50),
status ENUM('ativo', 'descontinuado'),
fkHardware INT,
CONSTRAINT fk_modelo_hardware FOREIGN KEY (fkHardware) REFERENCES hardware(id)
);

	CREATE TABLE veiculo (
		id INT NOT NULL AUTO_INCREMENT,
		fkEmpresa INT NOT NULL,
		fkLote INT NOT NULL,
		fkModelo INT,
		pilotoAuto_versao VARCHAR(20),
		data_ativacao DATE,
		PRIMARY KEY (id),
		CONSTRAINT fk_veiculo_modelo FOREIGN KEY (fkModelo) REFERENCES modelo(id),
		CONSTRAINT fk_veiculo_empresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(id),
		CONSTRAINT fk_veiculo_lote FOREIGN KEY (fkLote) REFERENCES lote(id)
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

-- Inserir Cargos
INSERT INTO cargo(titulo)
VALUES
("Administrador"),
("Engenheiro Automotivo"),
("Engenheiro de Qualidade");

-- Inserir Funcionários
INSERT INTO funcionario (fkEmpresa, nome, sobrenome, telefone, email, senha, fkCargo)
VALUES 
(1, 'Carlos', 'Silva', '11987654321', 'carlos.silva@tech.com', 'senha123', '1'),
(2, 'Ana', 'Oliveira', '11987654322', 'ana.oliveira@auto.com', 'senha456', '1'),
(1, 'gab', 'Silva', '11982654321', 'gab.silva@tech.com', 'senha143', '2');

-- Inserir Lotes com status variados
INSERT INTO navix.lote (codigo_lote, data_fabricacao, fkEmpresa, status)
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


-- Inserir Tipos de Hardware
INSERT INTO t_hardware (tipo, unidadeMedida)
VALUES 
('CPU', 'GHz'),
('RAM', 'GB'),
('DISCO', 'TB');

-- Inserir Hardware
INSERT INTO hardware (fkTipo, parametro)
VALUES 
(1, 3),  -- 3 GHz de CPU
(2, 16), -- 16 GB de RAM
(3, 1);  -- 1 TB de Disco

-- Modelos 100% Elétricos - Nível 3
INSERT INTO modelo (nome, status, fkHardware)
VALUES
('E-Drive Alpha L3', 'ativo', 1),
('NeoMotion LX3', 'descontinuado', 2),
('Voltura Urban 300', 'ativo', 3),
('Autovance E3', 'descontinuado', 1),
('TerraEV Vision L3', 'ativo', 2);

-- Modelos 100% Elétricos - Nível 4
INSERT INTO modelo (nome, status, fkHardware)
VALUES
('E-Drive Alpha L4', 'ativo', 1),
('NeoMotion LX4', 'ativo', 2),
('Voltura Urban 400', 'descontinuado', 3),
('Autovance E4', 'ativo', 1),
('TerraEV Vision L4', 'descontinuado', 2),
('SkyRide Autonomous', 'ativo', 3),
('ElectraOne L4+', 'descontinuado', 2);

-- Veículos da Empresa 1 (10 lotes → 10 veículos)
INSERT INTO veiculo (fkEmpresa, fkLote, fkModelo, pilotoAuto_versao, data_ativacao)
VALUES
(1, 1, 1, 'v3.1.2', '2025-03-10'),
(1, 2, 2, 'v3.0.8', '2025-01-05'),
(1, 3, 3, 'v3.2.0', '2025-04-15'),
(1, 4, 4, 'v3.1.0', '2025-05-25'),
(1, 5, 5, 'v3.2.3', '2025-07-10'),
(1, 6, 6, 'v4.0.1', '2025-06-30'),
(1, 7, 7, 'v4.0.4', '2025-09-30'),
(1, 8, 8, 'v4.1.0', '2025-02-14'),
(1, 9, 9, 'v4.2.1', '2025-10-12'),
(1, 10, 10, 'v4.2.5', '2025-04-22');

-- Veículos da Empresa 2 (10 lotes → 10 veículos)
INSERT INTO veiculo (fkEmpresa, fkLote, fkModelo, pilotoAuto_versao, data_ativacao)
VALUES
(2, 11, 11, 'v4.0.0', '2025-03-05'),
(2, 12, 12, 'v4.1.2', '2025-01-22'),
(2, 13, 1, 'v4.1.5', '2025-03-28'),
(2, 14, 2, 'v4.2.0', '2025-05-11'),
(2, 15, 3, 'v4.3.0', '2025-07-09'),
(2, 16, 4, 'v4.3.2', '2025-06-25'),
(2, 17, 5, 'v4.4.0', '2025-09-20'),
(2, 18, 6, 'v3.1.4', '2025-01-10'),
(2, 19, 7, 'v3.2.5', '2025-10-14'),
(2, 20, 8, 'v4.0.5', '2025-04-19');

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

select * from navix.funcionario;
select * from navix.empresa;
select * from navix.lote;

SELECT v.*, l.*, 
       (SELECT COUNT(*) 
        FROM veiculo 
        WHERE fkLote = l.id) AS qtd_veiculos
FROM veiculo v
INNER JOIN lote l ON v.fkLote = l.id
WHERE l.id = 3;
