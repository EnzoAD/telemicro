<?php
require('../config.php');

$array = [];
header('Content-Type: application/json');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'get') {
    if (isset($_GET['id_causa'])) {
        $id_causa = intval($_GET['id_causa']);

        $sql = $pdo->prepare("SELECT id, descricao FROM solucao WHERE id_causa = :id_causa");
        $sql->bindValue(':id_causa', $id_causa, PDO::PARAM_INT);
        $sql->execute();

        if ($sql->rowCount() > 0) {
            $array['result'] = $sql->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $array['error'] = 'Nenhuma solução encontrada para esta causa.';
        }
    } else {
        $array['error'] = 'Nenhum ID de causa foi fornecido.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente GET]';
}

echo json_encode($array);
exit;