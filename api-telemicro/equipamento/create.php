<?php
require('../config.php');

$array = [];

// Pega o método da requisição
$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'post') {
    // Obtém os dados do corpo da requisição
    $input = json_decode(file_get_contents("php://input"), true);

    // Verifica se todos os dados necessários foram passados
    if (isset($input['nome_cliente']) && isset($input['cpf']) && isset($input['nome_equipamento']) && isset($input['marca']) && isset($input['modelo']) && isset($input['defeito']) && isset($input['causa']) && isset($input['solucao'])) {
        $nome_cliente = $input['nome_cliente'];
        $cpf = $input['cpf'];
        $nome_equipamento = $input['nome_equipamento'];
        $marca = $input['marca'];
        $modelo = $input['modelo'];
        $defeito = $input['defeito'];
        $causa = $input['causa'];
        $solucao = $input['solucao'];

        // Prepara e executa a query para inserir o novo equipamento
        $sql = $pdo->prepare("INSERT INTO equipamento (nome_cliente, cpf, nome_equipamento, marca, modelo, defeito, causa, solucao) VALUES (:nome_cliente, :cpf, :nome_equipamento, :marca, :modelo, :defeito, :causa, :solucao)");
        $sql->bindValue(':nome_cliente', $nome_cliente, PDO::PARAM_STR);
        $sql->bindValue(':cpf', $cpf, PDO::PARAM_STR);
        $sql->bindValue(':nome_equipamento', $nome_equipamento, PDO::PARAM_STR);
        $sql->bindValue(':marca', $marca, PDO::PARAM_STR);
        $sql->bindValue(':modelo', $modelo, PDO::PARAM_STR);
        $sql->bindValue(':defeito', $defeito, PDO::PARAM_STR);
        $sql->bindValue(':causa', $causa, PDO::PARAM_STR);
        $sql->bindValue(':solucao', $solucao, PDO::PARAM_STR);

        if ($sql->execute()) {
            $idEquipamento = $pdo->lastInsertId(); // Obtém o ID gerado
            $array['result'] = $idEquipamento;
        } else {
            $array['error'] = 'Erro ao registrar o equipamento.';
        }
    } else {
        $array['error'] = 'Dados insuficientes para registrar o equipamento.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente POST]';
}

require('../return.php');
