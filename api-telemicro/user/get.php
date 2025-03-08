<?php
require('../config.php');

$array = [];

// Pega o método da requisição
$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'get') { // Apenas requisições GET
    // Verifica se o parâmetro 'id' foi enviado pela URL
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']); // Converte o id para inteiro (segurança)

        // Prepara a consulta ao banco de dados
        $sql = $pdo->prepare("SELECT id, name, email FROM users WHERE id = :id");
        $sql->bindValue(':id', $id, PDO::PARAM_INT);
        $sql->execute();

        if ($sql->rowCount() > 0) {
            $data = $sql->fetch(PDO::FETCH_ASSOC); // Retorna o usuário encontrado
            foreach($data as $item) {
                $array['result'][] = [
                    'id' => $item['id'],
                    'name' => $item['name'],
                    'email' => $item['email']
                ];
        } else {
            $array['error'] = 'Usuário não encontrado.';
        }
    } else {
        $array['error'] = 'Nenhum ID foi fornecido.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente GET]';
}

echo json_encode($array, JSON_UNESCAPED_UNICODE);
exit;
