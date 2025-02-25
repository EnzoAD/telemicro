<?php
require('../config.php');

$array = [];

// Pega o método da requisição
$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'put') { // Para o update, geralmente usamos PUT
    // Obtém os dados do corpo da requisição
    $input = json_decode(file_get_contents("php://input"), true);

    // Verifica se o ID foi passado junto com os dados a serem atualizados
    if (isset($input['id'])) {
        $id = intval($input['id']); // Converte o id para inteiro (mais seguro)
        $situacao = "desativado";

        
        // Monta a query de atualização
        $sql = "UPDATE users SET situacao = :situacao WHERE id = :id";

        $update = $pdo->prepare($sql);
        $update->bindValue(':situacao', $situacao , PDO::PARAM_STR);
        $update->bindValue(':id', $id, PDO::PARAM_INT);

        if ($update->execute()) {
            $array['result'] = 'Relatório atualizado com sucesso!';
        } else {
            $array['error'] = 'Erro ao atualizar o relatório.';
        }
            
        
    } else {
        $array['error'] = 'Dados insuficientes para atualizar o relatório.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente PUT]';
}

require('../return.php');
