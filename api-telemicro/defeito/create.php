<?php
require('../config.php');

$array = [];

// Pega o método da requisição
$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'post') {
    // Obtém os dados do corpo da requisição
    $input = json_decode(file_get_contents("php://input"), true);

    // Verifica se todos os dados necessários foram passados
    if (isset($input['descricao']) ) {
        $descricao = $input['descricao'];

        // Prepara e executa a query para inserir o novo equipamento
        $sql = $pdo->prepare("INSERT INTO equipamento (descricao) VALUES (:descricao)");
        $sql->bindValue(':descricao', $nome_cliente, PDO::PARAM_STR);

        if ($sql->execute()) {
            $idEquipamento = $pdo->lastInsertId(); // Obtém o ID gerado
            $array['result'] = $idEquipamento;
        } else {
            $array['error'] = 'Erro ao registrar o equipamento.';
        }
    } else {
        $array['error'] = 'Dados insuficientes para registrar o equipamento.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente POST]';
}

require('../return.php');
