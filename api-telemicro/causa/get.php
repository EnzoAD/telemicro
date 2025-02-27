<?php
require('../config.php');

$array = [];
header('Content-Type: application/json');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'get') {
    if (isset($_GET['id'])) {
        $id = intval($_GET['id']);

        $sql = $pdo->prepare("SELECT id, descricao, id_defeito FROM causa WHERE id = :id");
        $sql->bindValue(':id', $id, PDO::PARAM_INT);
        $sql->execute();

        if ($sql->rowCount() > 0) {
            $array['result'] = $sql->fetch(PDO::FETCH_ASSOC);
        } else {
            $array['error'] = 'Causa não encontrada.';
        }
    } else {
        $array['error'] = 'Nenhum ID foi fornecido.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente GET]';
}

echo json_encode($array);
exit;