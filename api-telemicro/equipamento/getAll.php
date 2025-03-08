<?php
require('../config.php');

header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Origin: *');

$array = [];
$method = strtoupper($_SERVER['REQUEST_METHOD']);

if ($method === 'GET') {

    // Consulta ao banco de dados com filtro
    $sql = $pdo->prepare("SELECT * FROM equipamento");
    $sql->execute();

    
    if ($sql->rowCount() > 0) {
        $data = $sql->fetchAll(PDO::FETCH_ASSOC);
        
        foreach ($data as $item) {
            $array['result'][] = [
                'id' => $item['id'],
                'nome' => $item['nome']
            ];
        }
    } else {
        $array['error'] = 'Nenhum equipamento encontrado.';
    }
    
} else {
    $array['error'] = 'Método não permitido. [Somente GET]';
}

echo json_encode($array);