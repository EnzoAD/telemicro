<?php
require('../config.php');

$array = [];

// Pega o método da requisição
$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'put') {
    // Obtém os dados do corpo da requisição
    $input = json_decode(file_get_contents("php://input"), true);

    // Verifica se todos os dados necessários foram passados
    if (isset($input['id']) && isset($input['nome_cliente']) && isset($input['cpf']) && isset($input['id_equipamento']) && isset($input['marca']) && isset($input['modelo']) && isset($input['id_defeito']) && isset($input['data_entrada']) && isset($input['idcriador'])) {
        $id = $input['id'];
        $nome_cliente = $input['nome_cliente'];
        $cpf = $input['cpf'];
        $id_equipamento = $input['id_equipamento'];
        $marca = $input['marca'];
        $modelo = $input['modelo'];
        $id_defeito = $input['id_defeito'];
        $id_causa = $input['id_causa'] ?? null;
        $id_solucao = $input['id_solucao'] ?? null;
        $data_entrada = $input['data_entrada'];
        $idcriador = $input['idcriador'];

        // Prepara e executa a query para atualizar o paciente
        $sql = $pdo->prepare("UPDATE paciente SET nome_cliente = :nome_cliente, cpf = :cpf, id_equipamento = :id_equipamento, marca = :marca, modelo = :modelo, id_defeito = :id_defeito, id_causa = :id_causa, id_solucao = :id_solucao, data_entrada = :data_entrada, idcriador = :idcriador WHERE id = :id");
        $sql->bindValue(':id', $id, PDO::PARAM_INT);
        $sql->bindValue(':nome_cliente', $nome_cliente, PDO::PARAM_STR);
        $sql->bindValue(':cpf', $cpf, PDO::PARAM_STR);
        $sql->bindValue(':id_equipamento', $id_equipamento, PDO::PARAM_STR);
        $sql->bindValue(':marca', $marca, PDO::PARAM_STR);
        $sql->bindValue(':modelo', $modelo, PDO::PARAM_STR);
        $sql->bindValue(':id_defeito', $id_defeito, PDO::PARAM_STR);
        $sql->bindValue(':id_causa', $id_causa, PDO::PARAM_STR);
        $sql->bindValue(':id_solucao', $id_solucao, PDO::PARAM_STR);
        $sql->bindValue(':data_entrada', $data_entrada, PDO::PARAM_STR);
        $sql->bindValue(':idcriador', $idcriador, PDO::PARAM_STR);

        if ($sql->execute()) {
            $array['result'] = 'Paciente atualizado com sucesso';
        } else {
            $array['error'] = 'Erro ao atualizar o paciente.';
        }
    } else {
        $array['error'] = 'Dados insuficientes para atualizar o paciente.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente PUT]';
}

require('../return.php');