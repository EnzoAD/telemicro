<?php
require('../config.php');

$array = [];
header('Content-Type: application/json');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'post') {
    // Obtém os dados do corpo da requisição
    $input = json_decode(file_get_contents("php://input"), true);

    // Verifica se o campo 'nome' foi enviado
    if (isset($input['nome'])) {
        $nome = $input['nome'];

        // Prepara e executa a query para inserir o novo equipamento
        $sql = $pdo->prepare("INSERT INTO equipamento (nome) VALUES (:nome)");
        $sql->bindValue(':nome', $nome, PDO::PARAM_STR);

        if ($sql->execute()) {
            $idEquipamento = $pdo->lastInsertId(); // Obtém o ID gerado
            $array['result'] = $idEquipamento;
        } else {
            $array['error'] = 'Erro ao registrar o equipamento.';
        }
    } else {
        $array['error'] = 'Nome do equipamento não foi fornecido.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente POST]';
}

// Retorna a resposta em JSON
echo json_encode($array);
exit;