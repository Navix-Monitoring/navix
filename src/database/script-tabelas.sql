-- Active: 1747055877462@@localhost@3307@roadmap_cyber
CREATE DATABASE roadmap_cyber;
USE roadmap_cyber;

-- DROP DATABASE roadmap_cyber;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50),
    apelido VARCHAR(12) UNIQUE,
    email VARCHAR(50) UNIQUE,
    senha VARCHAR(50) NOT NULL
);

CREATE TABLE filmes_series (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(50),
    ano_De_Lancamento YEAR,
    categoria VARCHAR(30),
    tempo_de_duracao INT
);

insert into users (nome, apelido, email, senha)values
	('Lucas Amorim', 'Amorim', 'amorim@gmail.com', 'Home3549#');

CREATE TABLE insight (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fkuser INT,
    fkfilmes_series INT,
    nota DECIMAL(2,1),
    FOREIGN KEY (fkuser) REFERENCES users(id),
    FOREIGN KEY (fkfilmes_series) REFERENCES filmes_series(id),
    UNIQUE (fkuser, fkfilmes_series)
);

CREATE Table quiz_perguntas (
    id int PRIMARY KEY AUTO_INCREMENT,
    pergunta TEXT
);

CREATE table alternativas (
    id int PRIMARY key AUTO_INCREMENT,
    fkquiz_perguntas int,
    texto varchar(200),
    valor int,
    UNIQUE(fkquiz_perguntas, texto),
    UNIQUE(fkquiz_perguntas, valor),
    foreign key (fkquiz_perguntas) references quiz_perguntas(id)
);

CREATE table feedback (
    id INT PRIMARY KEY AUTO_INCREMENT,
    analise VARCHAR(355),
    classe VARCHAR(50),
    pontuacao_min int,
    pontuacao_max int,
    check (classe in ('Script Kiddie', 'Problem Solver', 'Cyber Architect'))
);

CREATE TABLE ficha_tecnica (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fkuser INT,
    fkquiz_perguntas INT,
    pontuacao INT,
    UNIQUE(fkuser, fkquiz_perguntas), 
    FOREIGN KEY (fkuser) REFERENCES users(id),
    FOREIGN KEY (fkquiz_perguntas) REFERENCES quiz_perguntas(id)
);

CREATE TABLE ficha_resultado (
    fkuser INT,
    pontuacao_total INT,
    dataFinalizacao DATE,
    fkfeedback INT,
    PRIMARY KEY (fkuser),  -- cada usuário só pode ter 1 resultado por quiz
    FOREIGN KEY (fkuser) REFERENCES users(id),
    FOREIGN KEY (fkfeedback) REFERENCES feedback(id)
);


INSERT INTO quiz_perguntas (pergunta) VALUES
  ('Você está acampando e percebe que esqueceu de levar comida. O que você faz?'),
  
  ('Você está no meio de um projeto em andamento, já finalizando, mas percebe que esqueceu de comentar as funções e deixar o código limpo. O que você faz?'),
  
  ('Se você precisasse aprender a usar uma nova tecnologia ou ferramenta, como você faria?'),
  
  ('Em um ambiente de trabalho. Você está construindo várias funções de código parecidas e percebe que está ficando repetitivo, deixando o código pesado. O que você faz?'),
  
  ('Você está em um grupo onde começam a falar mal de uma pessoa conhecida de todos, inclusive sua. Qual atitude você toma?');

    
INSERT INTO alternativas (fkquiz_perguntas, texto, valor)VALUES
    (1, 'Volto para casa imediatamente.', 1),
    (1, 'Reclamo da situação e tento aguentar um dia sem comer.', 2),    
    (1, 'Analiso os arredores e tento encontrar algum alimento.', 3), 
    (1, 'Peço ajuda para alguém próximo ou vizinho de acampamento.', 4),
    (1, 'Volto até um lugar onde passei e vi que tinha uma loja para comprar comida
    e continuo acampando.', 5),
    
    (2, 'Ignoro, afinal está funcionando.', 1),
    (2, 'utilizo uma IA para comentar e otimizar o meu código', 2),
    (2, 'Anoto para corrigir depois e entrego o projeto.', 3),
	(2, 'Comento só o que achar mais importante e envio.', 4),
    (2, 'Faço uma revisão completa, aplico boas práticas e otimizo antes de finalizar.', 5),
	
    (3, 'Procuro um vídeo rápido no YouTube e copio os passos.', 1),
    (3, 'Pergunto para alguém me ensinar direto.', 2),
    (3, 'Utilizo uma IA para gerar uma documentação resumida e aplico na prática.', 3),
    (3, 'Faço um curso rápido e coloco em prática com projetos.', 4), 
    (3, 'Estudo a documentação oficial e crio anotações para revisar e ensinar.', 5),
    
    (4, 'Deixo assim mesmo, ninguém falou que tinha que deixar o código leve.', 1),
    (4, 'Deixo o serviço para outra pessoa fazer, meu código está funcional e isso que importa.', 2),
    (4, 'Tento organizar um pouco para reduzir a bagunça.', 3),
    (4, 'Crio funções reutilizáveis para limpar o código.', 4), 
    (4, 'Refatoro toda a lógica e aplico padrões de projeto.', 5),
    
	(5, 'Fico quieto e observo a conversa.', 1),
	(5, 'Dou risada, e participo da conversa.', 2),
	(5, 'Aviso a pessoa do assunto, e falo que estão falando mal dela.', 3),
	(5, 'Levanto e saio, porque não acho certo participar disso.', 4),
	(5, 'Questiono o grupo e tento conscientizar sobre respeito e ética.', 5);
    
INSERT INTO feedback (analise, classe, pontuacao_min, pontuacao_max)VALUES
  ('Você está no ponto zero da jornada — movido pela curiosidade, mas ainda sem fundamentos sólidos. Suas decisões mostram impulsividade, 
  desorganização e foco apenas no resultado imediato. Esse perfil, conhecido como "Script Kiddie", não sobrevive em ambientes profissionais sérios.',
  'Script Kiddie', 5, 10),
  
  ('Você demonstra iniciativa, senso prático e começa a construir uma mentalidade analítica. Sabe resolver problemas, mas ainda falta visão
  ampla e refinamento técnico. É o típico "Problem Solver": alguém que entrega, mas pode tropeçar em projetos maiores se não se aprofundar.',
  'Problem Solver', 11, 17),
  
  ('Você opera em outro nível. Analisa cenários com profundidade, antecipa problemas e valoriza ética, clareza e estratégia. É o perfil de um
  verdadeiro "Cyber Architect" — alguém que pensa em sistemas, não só em linhas de código. Essa postura te torna referência, líder técnico, Amigo ou Alguém de confiança,
  e a peça-chave em qualquer equipe.',
  'Cyber Architect', 18, 25);

INSERT INTO filmes_series (titulo, ano_De_Lancamento, categoria, tempo_de_duracao) VALUES
    ('Hacker: Todo Crime tem um Início', 2016, 'Suspense', 95),
    ('Mr. Robot', 2015, 'Engenharia Social e Hacker', 2540),
    ('Snowden', 2016, 'Baseados em Fatos Reais', 135),
    ('Invasores – Nenhum Sistema Está a Salvo', 2014, 'Ficção Tecnológica', 102),
    ('Matrix', 1999, 'Ficção Científica', 136),
    ('O Jogo da Imitação', 2014, 'Baseados em Fatos Reais', 114),
    ('Black Mirror', 2011, 'Ficção Científica', 1733),
    ('Hacker', 2015, 'Ação e Suspense', 133);



SELECT * from users;
SELECT*from filmes_series;
SELECT*from insight;
select * from quiz_perguntas;
select * from alternativas;
select pontuacao from ficha_tecnica where fkuser = 2;
select * from ficha_resultado;
select 
	fr.pontuacao_total as pontuacaoTotal,
    fr.dataFinalizacao as dataRealizacaoQuiz,
    fd.analise as analise,
    fd.classe as classe
    from ficha_resultado fr
    inner join feedback fd 
    on fr.fkfeedback = fd.id where fr.fkuser = 1;

select 
	qp.id, qp.pergunta,
    pg.texto, pg.valor
From alternativas pg
inner join quiz_perguntas qp
on qp.id = pg.fkquiz_perguntas;

SELECT 
    qp.id,
    qp.pergunta AS questao,
    GROUP_CONCAT(pg.texto ORDER BY pg.valor SEPARATOR ';') AS alternativas,
    GROUP_CONCAT(pg.valor ORDER BY pg.valor SEPARATOR ';') AS pontos
FROM quiz_perguntas qp
JOIN alternativas pg ON qp.id = pg.fkquiz_perguntas
GROUP BY qp.id, qp.pergunta;


 INSERT INTO ficha_tecnica (fkuser, fkquiz_perguntas, pontuacao)
        VALUES (2, 4, 3);

truncate ficha_resultado;



insert into ficha_tecnica (fkuser, fkquiz_perguntas, pontuacao)values
	(1, 1, 3),  -- usuário 1 tirou 3 na pergunta 1
    (1, 2, 1),  -- usuário 1 tirou 1 na pergunta 2
    (1, 3, 5),  -- e assim por diante
    (1, 4, 4),
    (1, 5, 2);
    
    INSERT INTO ficha_resultado (fkuser, dataFinalizacao, pontuacao_total, fkfeedback)
SELECT
    pontos.fkuser,
    CURDATE(),
    pontos.total_pontos,
    f.id
FROM (
    SELECT fkuser, SUM(pontuacao) AS total_pontos
    FROM ficha_tecnica
    WHERE fkuser = 2
    GROUP BY fkuser
) AS pontos
JOIN feedback f
  ON pontos.total_pontos BETWEEN f.pontuacao_min AND f.pontuacao_max;
    
    
    
    
    
create table datas (
dat1 date,
dat2 date,
dat3 date
);
    insert into datas(dat1, dat2, dat3)values (CURDATE(), now(), '1999-02-15');
    select * from datas;
ALTER TABLE filmes_series AUTO_INCREMENT = 1;

SELECT ROUND(AVG(nota), 1) FROM insight WHERE fkfilmes_series = 2;

select id, nome, apelido, email, senha FROM users WHERE (email = '' OR 1=1) limit 1;
 -- "' or apelido = '' OR 1=1 order by 1) -- "') AND senha = 'ASD';\n` 
 
SELECT DATE_FORMAT(sua_coluna_de_data, '%d %y %Y') AS data_formatada
FROM sua_tabela;
desc ficha_resultado;
 select 
	fr.pontuacao_total as pontuacaoTotal,
    fr.dataFinalizacao as dataRealizacaoQuiz,
    fd.analise as analise,
    fd.classe as classe
    from ficha_resultado fr
    inner join feedback fd 
    on fr.fkfeedback = fd.id where fr.fkuser = 1;