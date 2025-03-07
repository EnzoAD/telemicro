CREATE DATABASE IF NOT EXISTS telemicro;
USE telemicro;

-- Tabela de Usuários
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (id, name, email, password, situacao) VALUES
(1, 'Vanderson', 'vanderson@gmail.com', '$2y$10$gRrNuwmyH4TX/YyA/6PHF.6nAvHexZkPrHJeexIG3k.zLU58MebxS', 'ativo'),
(2, 'Enzo', 'enzo@gmail.com', '$2y$10$ys45QVsSlzgxm7ORNE9m7OF.eY9nE5Qoc15Xn0FJF21/DNMiKbfxu', 'ativo'),
(5, 'Rafael', 'ra', '$2y$10$W6ZolS6lK2tDjLuxi199EeC49x6Vi2cgIaK1.fzWaEUVKJpqO7jA2', 'ativo'),
(6, 'Rafaela', 'raa', '$2y$10$OYrMo.4172c4s5bVas4JpOia.pGEiKbYTs46WojTCJicnRzdR5F4K', 'ativo'),
(7, 'José', 'jose@gmail.com', '$2y$10$cPdx47hvkr322KZWcAKHvucpY9FZJdIpnQlhCdgrD//ulf4I1omea', 'ativo');

-- Tabela de Pacientes
CREATE TABLE paciente ( 
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nome_cliente VARCHAR(100) NOT NULL, 
    cpf VARCHAR(100) NOT NULL, 
    id_equipamento VARCHAR(100) NOT NULL, 
    marca VARCHAR(100) NOT NULL, 
    modelo VARCHAR(100) NOT NULL,
    id_defeito VARCHAR(100) NOT NULL, 
    id_causa VARCHAR(100) NOT NULL, 
    id_solucao VARCHAR(100) NOT NULL 
);

-- Inserção de alguns pacientes como exemplo
INSERT INTO paciente (id, nome, data_nascimento, genero, telefone, endereco) VALUES
(1, 'João Silva', '1990-05-14', 'Masculino', '31999998888', 'Rua A, 123'),
(2, 'Maria Souza', '1985-08-22', 'Feminino', '31988887777', 'Av. B, 456');

-- Tabela de Equipamentos
CREATE TABLE equipamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Inserção de alguns equipamentos como exemplo
INSERT INTO equipamento (id, nome, modelo, numero_serie, localizacao, data_aquisicao) VALUES
(1, 'Tomógrafo', 'TomoX-5000', 'SN123456', 'Sala 2', '2022-03-15'),
(2, 'Raio-X', 'RX-200', 'SN654321', 'Sala 5', '2021-10-10');

-- Tabela de Defeitos
CREATE TABLE defeito (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(1000) NOT NULL,
    id_equipamento INT NOT NULL
);

-- Inserção de defeitos como exemplo
INSERT INTO defeito (id, descricao, id_equipamento, data_ocorrencia, status) VALUES
(1, 'Falha no resfriamento', 1, '2024-02-15', 'Aberto'),
(2, 'Imagem borrada', 2, '2024-02-20', 'Em andamento');

-- Tabela de Causas
CREATE TABLE causa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(1000) NOT NULL,
    id_defeito INT NOT NULL
);

-- Inserção de causas como exemplo
INSERT INTO causa (id, descricao, id_defeito) VALUES
(1, 'Ventilação obstruída', 1),
(2, 'Falha no software', 2);

-- Tabela de Soluções
CREATE TABLE solucao (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descricao VARCHAR(1000) NOT NULL,
    id_causa INT NOT NULL
);

-- Inserção de soluções como exemplo
INSERT INTO solucao (id, descricao, id_causa, data_resolucao, responsavel) VALUES
(1, 'Limpou-se a saída de ar', 1, '2024-02-18', 'Técnico Carlos'),
(2, 'Atualização do software realizada', 2, '2024-02-22', 'Técnico Ana');