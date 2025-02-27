<?php
require('../config.php');

$array = [];
header('Content-Type: application/json');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'get') {
    if (isset($_GET['id_defeito'])) {
        $id_defeito = intval($_GET['id_defeito']);

        $sql = $pdo->prepare("SELECT id, descricao FROM causa WHERE id_defeito = :id_defeito");
        $sql->bindValue(':id_defeito', $id_defeito, PDO::PARAM_INT);
        $sql->execute();

        if ($sql->rowCount() > 0) {
            $array['result'] = $sql->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $array['error'] = 'Nenhuma causa encontrada para este defeito.';
        }
    } else {
        $array['error'] = 'Nenhum ID de defeito foi fornecido.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente GET]';
}

echo json_encode($array);
exit;