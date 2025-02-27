<?php
require('../config.php');

$array = [];

// Pega o método da requisição
$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'post') {
    // Obtém os dados do corpo da requisição
    $input = json_decode(file_get_contents("php://input"), true);

    // Verifica se os dados necessários foram passados
    if (isset($input['descricao']) && isset($input['id_equipamento'])) {
        $descricao = $input['descricao'];
        $id_equipamento = $input['id_equipamento'];

        // Prepara e executa a query para inserir o novo defeito
        $sql = $pdo->prepare("INSERT INTO defeito (descricao, id_equipamento) VALUES (:descricao, :id_equipamento)");
        $sql->bindValue(':descricao', $descricao, PDO::PARAM_STR);
        $sql->bindValue(':id_equipamento', $id_equipamento, PDO::PARAM_INT);

        if ($sql->execute()) {
            $idDefeito = $pdo->lastInsertId(); // Obtém o ID gerado
            $array['result'] = $idDefeito;
        } else {
            $array['error'] = 'Erro ao registrar o defeito.';
        }
    } else {
        $array['error'] = 'Dados insuficientes para registrar o defeito.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente POST]';
}

// Retorna a resposta em JSON
echo json_encode($array);
exit;
