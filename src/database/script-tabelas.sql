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
    statusPerfil ENUM("Inativo", "Ativo") NOT NULL,
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

-- Inserir cargos
INSERT INTO cargo (titulo) VALUES
('Administrador'), 
('Funcionario'),   
('Analista');

-- Inserir empresas
INSERT INTO empresa (razaoSocial, cnpj, codigo_ativacao) VALUES
('Tech Solutions LTDA', '12345678000195', 'ABC123'),
('Auto Veículos S.A.', '98765432000189', 'XYZ987');

-- Inserir endereços
INSERT INTO endereco (rua, numero, cep, bairro, cidade, estado, pais,fkEmpresa) VALUES 
('Rua das Flores', 123, '12345678', 'Centro', 'São Paulo', 'SP', 'Brasil',1),
('Av. Paulista', 1000, '87654321', 'Bela Vista', 'São Paulo', 'SP', 'Brasil',2);

-- Inserir funcionários
INSERT INTO funcionario (fkEmpresa, nome, sobrenome, telefone, email, senha, fkCargo) VALUES 
(1, 'Carlos', 'Silva', '11987654321', 'carlos.silva@tech.com', 'senha123', 1),
(2, 'Ana', 'Oliveira', '11987654322', 'ana.oliveira@auto.com', 'senha456', 2),
(1, 'Gabriel', 'Santos', '11982654321', 'gabriel.santos@tech.com', 'senha143', 3);

-- Inserir lotes
INSERT INTO lote (codigo_lote, data_fabricacao, fkEmpresa, status) VALUES 
('LOTE-A001', '2024-05-10', 1, 'Ativo'),
('LOTE-B002', '2024-08-20', 2, 'Manutenção');

-- Inserir modelos
INSERT INTO modelo (nome, status, versaoPilotoAutomatico, fkEmpresa) VALUES 
('NAV-M100', 'Ativo', '1.2.5', 1),
('NAV-M200', 'Descontinuado', '2.0.1', 2);

-- Inserir veículos
INSERT INTO veiculo (fkModelo, fkLote, data_ativacao) VALUES 
(1, 1, '2025-01-01'),
(2, 2, '2025-02-15');

-- Inserir hardware
INSERT INTO hardware (tipo) VALUES 
('CPU'),
('RAM'),
('DISCO');

-- Inserir parametros hardware (CPU uso, CPU temperatura, RAM, Disco)
INSERT INTO parametroHardware (fkHardware, fkModelo, unidadeMedida, parametroMinimo, parametroNeutro, parametroAtencao, parametroCritico) VALUES 
(1, 1, 'USO', 20, 50, 75, 90),        -- CPU uso
(1, 1, 'TEMPERATURA', 40, 60, 75, 90), -- CPU temperatura
(2, 1, 'GB', 15, 25, 60, 80),          -- RAM
(3, 1, 'GB', 10, 20, 60, 80);          -- Disco

select * from funcionario;