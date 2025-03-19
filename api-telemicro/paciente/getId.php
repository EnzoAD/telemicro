<?php
require('../config.php');

header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Origin: *');

$array = [];
$method = strtoupper($_SERVER['REQUEST_METHOD']);

if ($method === 'GET') {
    if (isset($_GET['valor'])) {
        $valor = trim($_GET['valor']);

        // Prepara a consulta ao banco de dados para buscar em todos os campos
        $sql = $pdo->prepare("SELECT p.*, 
                                      e.nome AS nome_equipamento, 
                                      d.descricao AS nome_defeito, 
                                      c.descricao AS nome_causa, 
                                      s.descricao AS nome_solucao,
                                      u.name AS nome_responsavel
                               FROM paciente p
                               LEFT JOIN equipamento e ON p.id_equipamento = e.id
                               LEFT JOIN defeito d ON p.id_defeito = d.id
                               LEFT JOIN causa c ON p.id_causa = c.id
                               LEFT JOIN solucao s ON p.id_solucao = s.id
                               LEFT JOIN users u ON p.idcriador = u.id
                               WHERE p.id = :valorExact");

        // Verifica se é um número para buscar por ID exato
        if (is_numeric($valor)) {
            $sql->bindValue(':valorExact', $valor, PDO::PARAM_INT);
        } else {
            $sql->bindValue(':valorExact', 0, PDO::PARAM_INT);
        }
        $sql->execute();

        // Se encontrou registros, os armazena
        $array['result'] = [];
        if ($sql->rowCount() > 0) {
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            foreach($data as $item) {
                $array['result'][] = [
                    'id' => $item['id'],
                    'nome_cliente' => $item['nome_cliente'],
                    'os' => $item['os'],
                    'id_equipamento' => $item['id_equipamento'],
                    'nome_equipamento' => $item['nome_equipamento'],
                    'marca' => $item['marca'],
                    'modelo' => $item['modelo'],
                    'id_defeito' => $item['id_defeito'],
                    'nome_defeito' => $item['nome_defeito'],
                    'id_causa' => $item['id_causa'] ?? null,
                    'nome_causa' => $item['nome_causa'] ?? null,
                    'id_solucao' => $item['id_solucao'] ?? null,
                    'nome_solucao' => $item['nome_solucao'] ?? null,
                    'data_entrada' => $item['data_entrada'] ?? null,
                    'idcriador' => $item['idcriador'] ?? null,
                    'nome_responsavel' => $item['nome_responsavel'] ?? null
                ];
            }
        }
    } else {
        $array['error'] = 'Nenhum valor foi fornecido.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente GET]';
}

echo json_encode($array, JSON_UNESCAPED_UNICODE);
exit;
?>