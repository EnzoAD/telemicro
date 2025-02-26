<?php
require('../config.php');

$array = [];
// Defina o cabeçalho para JSON
header('Content-Type: application/json');

// Pega o método da requisição
$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'get') { // Apenas requisições GET
    // Verifica se o parâmetro 'valor' foi enviado pela URL
    
    if (isset($_GET['valor'])) {
        $valor = $_GET['valor']; // Captura o valor da URL

        // Prepara a consulta ao banco de dados para buscar em todos os campos
        $sql = $pdo->prepare("SELECT * FROM equipamento WHERE id = :valor OR nome_cliente LIKE :likeValor OR cpf LIKE :likeValor OR nome_equipamento LIKE :likeValor OR marca LIKE :likeValor OR modelo LIKE :likeValor OR defeito LIKE :likeValor OR causa LIKE :likeValor OR solucao LIKE :likeValor");
        $sql->bindValue(':valor', $valor, PDO::PARAM_STR);
        $sql->bindValue(':likeValor', "%$valor%", PDO::PARAM_STR);
        $sql->execute();
        
        if ($sql->rowCount() > 0) {
            $data = $sql->fetchAll(PDO::FETCH_ASSOC);
            
            foreach($data as $item){
                $array['result'][] = [
                    'id' => $item['id'],
                    'nome_cliente' => $item['nome_cliente'],
                    'cpf' => $item['cpf'],
                    'nome_equipamento' => $item['nome_equipamento'],
                    'marca' => $item['marca'],
                    'modelo' => $item['modelo'],
                    'defeito' => $item['defeito'],
                    'causa' => $item['causa'],
                    'solucao' => $item['solucao']
                ];
            } // Retorna os equipamentos encontrados
        } else {
            $array['error'] = 'Nenhum equipamento encontrado.';
        }
    } else {
        $array['error'] = 'Nenhum valor foi fornecido.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente GET]';
}

echo json_encode($array);
?>