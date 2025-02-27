<?php
require('../config.php');

$array = [];
header('Content-Type: application/json');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'post') {
    // Obtém os dados do corpo da requisição
    $input = json_decode(file_get_contents("php://input"), true);

    // Verifica se os dados necessários foram passados
    if (isset($input['descricao']) && isset($input['id_causa'])) {
        $descricao = $input['descricao'];
        $id_causa = intval($input['id_causa']);

        // Prepara e executa a query para inserir a nova solução
        $sql = $pdo->prepare("INSERT INTO solucao (descricao, id_causa) VALUES (:descricao, :id_causa)");
        $sql->bindValue(':descricao', $descricao, PDO::PARAM_STR);
        $sql->bindValue(':id_causa', $id_causa, PDO::PARAM_INT);

        if ($sql->execute()) {
            $idSolucao = $pdo->lastInsertId(); // Obtém o ID gerado
            $array['result'] = $idSolucao;
        } else {
            $array['error'] = 'Erro ao registrar a solução.';
        }
    } else {
        $array['error'] = 'Dados insuficientes para registrar a solução.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente POST]';
}

// Retorna a resposta em JSON
echo json_encode($array);
exit;