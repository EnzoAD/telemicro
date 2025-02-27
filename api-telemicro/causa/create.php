<?php
require('../config.php');

$array = [];

// Pega o método da requisição
$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'post') {
    // Obtém os dados do corpo da requisição
    $input = json_decode(file_get_contents("php://input"), true);

    // Verifica se os dados necessários foram passados
    if (isset($input['descricao']) && isset($input['id_defeito'])) {
        $descricao = $input['descricao'];
        $id_defeito = intval($input['id_defeito']);

        // Prepara e executa a query para inserir a nova causa
        $sql = $pdo->prepare("INSERT INTO causa (descricao, id_defeito) VALUES (:descricao, :id_defeito)");
        $sql->bindValue(':descricao', $descricao, PDO::PARAM_STR);
        $sql->bindValue(':id_defeito', $id_defeito, PDO::PARAM_INT);

        if ($sql->execute()) {
            $idCausa = $pdo->lastInsertId(); // Obtém o ID gerado
            $array['result'] = $idCausa;
        } else {
            $array['error'] = 'Erro ao registrar a causa.';
        }
    } else {
        $array['error'] = 'Dados insuficientes para registrar a causa.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente POST]';
}

// Retorna a resposta em JSON
echo json_encode($array);
exit;