<?php
require('../config.php');

$array = [];
header('Content-Type: application/json');

$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'get') {
    if (isset($_GET['id_equipamento'])) {
        $id_equipamento = intval($_GET['id_equipamento']);

        $sql = $pdo->prepare("SELECT id, descricao FROM defeito WHERE id_equipamento = :id_equipamento");
        $sql->bindValue(':id_equipamento', $id_equipamento, PDO::PARAM_INT);
        $sql->execute();

        if ($sql->rowCount() > 0) {
            $array['result'] = $sql->fetchAll(PDO::FETCH_ASSOC);
        } else {
            $array['error'] = 'Nenhum defeito encontrado para este equipamento.';
        }
    } else {
        $array['error'] = 'Nenhum ID de equipamento foi fornecido.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente GET]';
}

echo json_encode($array);
exit;