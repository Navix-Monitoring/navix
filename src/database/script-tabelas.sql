DROP DATABASE IF EXISTS navix;
CREATE DATABASE navix;
USE navix;

CREATE TABLE empresa (
	id_empresa INT NOT NULL auto_increment,
    razaoSocial VARCHAR(50) NOT NULL,
<<<<<<< HEAD
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(60) NOT NULL,
=======
>>>>>>> 79ee1f84db90287bccc3ff755825f2b69af75841
    cnpj VARCHAR(14) NOT NULL,
    emailCorporativo char(50) not null,
    senhaHash char(250) not null,
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
    senha VARCHAR(20) NOT NULL,
    CONSTRAINT chk_telefone CHECK (CHAR_LENGTH(telefone) IN (10, 11)),
    PRIMARY KEY (id_usuario),
    UNIQUE (email), 
    CONSTRAINT fk_empresa_usuario FOREIGN KEY (fkEmpresa) REFERENCES empresa(id_empresa), 
	KEY ix_fkEmprsa (fkEmpresa) 
);

create table veiculo (
	id_veiculo int not null auto_increment,
    fkempresa int not null,
    placa varchar(10) not null,
    numero_serie varchar(50),
    modelo varchar(50),
    ano_fabricacao year,
    tipo varchar(50), --  Passível a mudanças, enum se encaxaria melhor nessa parte, mas é necessa´rio alinhar primeioro
    pilotoAuto_versao varchar(20),
    data_ativacao date,
    status enum('ativo', 'manutenção', 'inativo'),
    ultimo_checkup datetime,
    primary key (id_veiculo),
    constraint fk_veiculo_empresa foreign key (fkempresa) references empresa(id_empresa)
);

create table alerta (
	id_alerta INT NOT NULL auto_increment,
    fkVeiculo INT NOT NULL,
    tipo_alerta ENUM('CPU', 'RAM', 'REDE', 'SISTEMA', 'OUTRO') NOT NULL,
    descricao text,
    nivel enum('baixo', 'medio', 'alto') NOT NULL,
    data_alerta DATETIME NOT NULL default CURRENT_TIMESTAMP,
    status enum('pendente', 'em análise', 'resolvido') NOT NULL, 
    prioridade int not null,
    PRIMARY KEY (id_alerta),
    CONSTRAINT fk_alerta_veiculo FOREIGN KEY (fkVeiculo) REFERENCES veiculo(id_veiculo),
    CONSTRAINT chk_prioridade CHECK (prioridade IN (1, 2, 3, 4, 5))
);

create table alerta_veiculo_empresa (
	id_alerta INT NOT NULL,
    fkVeiculo INT NOT NULL,
    fkEmpresa INT NOT NULL,
    PRIMARY KEY (id_alerta, fkVeiculo, fkEmpresa),
    CONSTRAINT fk_veiculo_alerta FOREIGN KEY (id_alerta) REFERENCES alerta(id_alerta),
    CONSTRAINT fk_alerta_veiculo_veiculo FOREIGN KEY (fkVeiculo) REFERENCES veiculo(id_veiculo),
    CONSTRAINT fk_alerta_veiculo_empresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(id_empresa)
);	

