<?php
require('../config.php');

$array = [];
// Defina o cabeçalho para JSON
header('Content-Type: application/json');

// Pega o método da requisição
$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'get') { // Apenas requisições GET
    

    // Prepara a consulta ao banco de dados para buscar em todos os campos
    $sql = $pdo->prepare("SELECT * FROM paciente");
    
    $sql->execute();
    
    if ($sql->rowCount() > 0) {
        $data = $sql->fetchAll(PDO::FETCH_ASSOC);
        
        foreach($data as $item){
            $array['result'][] = [
                'id' => $item['id'],
                'nome_cliente' => $item['nome_cliente'],
                'cpf' => $item['cpf'],
                'id_equipamento' => $item['id_equipamento'],
                'marca' => $item['marca'],
                'modelo' => $item['modelo'],
                'id_defeito' => $item['id_defeito'],
                'id_causa' => $item['id_causa'],
                'id_solucao' => $item['id_solucao'],
                'data_entrada' => $item['data_entrada'],
                'idcriador' => $item['idcriador']
            ];
        } // Retorna os pacientes encontrados
    } else {
        $array['error'] = 'Nenhum paciente encontrado.';
    }
    
} else {
    $array['error'] = 'Método não permitido. [Somente GET]';
}

echo json_encode($array);
