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
        $sql = $pdo->prepare("SELECT p.*, 
                                      e.nome AS nome_equipamento, 
                                      d.nome AS nome_defeito, 
                                      c.nome AS nome_causa, 
                                      s.nome AS nome_solucao 
                               FROM paciente p
                               LEFT JOIN equipamento e ON p.id_equipamento = e.id
                               LEFT JOIN defeito d ON p.id_defeito = d.id
                               LEFT JOIN causa c ON p.id_causa = c.id
                               LEFT JOIN solucao s ON p.id_solução = s.id
                               WHERE p.id = :valor 
                                  OR p.nome_cliente LIKE :likeValor 
                                  OR p.cpf LIKE :likeValor 
                                  OR e.nome LIKE :likeValor 
                                  OR p.marca LIKE :likeValor 
                                  OR p.modelo LIKE :likeValor 
                                  OR d.nome LIKE :likeValor 
                                  OR c.nome LIKE :likeValor 
                                  OR s.nome LIKE :likeValor");
        
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
                    'id_equipamento' => $item['id_equipamento'],
                    'nome_equipamento' => $item['nome_equipamento'],
                    'marca' => $item['marca'],
                    'modelo' => $item['modelo'],
                    'id_defeito' => $item['id_defeito'],
                    'nome_defeito' => $item['nome_defeito'],
                    'id_causa' => $item['id_causa'] ?? null,
                    'nome_causa' => $item['nome_causa'] ?? null,
                    'id_solucao' => $item['id_solução'] ?? null,
                    'nome_solucao' => $item['nome_solucao'] ?? null
                ];
            } // Retorna os pacientes encontrados
        } else {
            $array['error'] = 'Nenhum paciente encontrado.';
        }
    } else {
        $array['error'] = 'Nenhum valor foi fornecido.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente GET]';
}

echo json_encode($array);
exit;
