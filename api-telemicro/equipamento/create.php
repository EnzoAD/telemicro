<?php
require('../config.php');

$array = [];

// Pega o método da requisição
$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'post') {
    // Obtém os dados do corpo da requisição
    $input = json_decode(file_get_contents("php://input"), true);

    // Verifica se todos os dados necessários foram passados
    if (isset($input['datar']) && isset($input['inicio']) && isset($input['fim']) && isset($input['localr']) && isset($input['assunto']) && isset($input['convite']) && isset($input['idcriador'])) {
        $datar = $input['datar'];
        $inicio = $input['inicio'];
        $fim = $input['fim'];
        $localr = $input['localr'];
        $assunto = $input['assunto'];
        $convite = $input['convite'];
        $idcriador = $input['idcriador'];

        // Verifica se já está registrado
        $check = $pdo->prepare("SELECT * FROM reunioes WHERE datar = :datar AND idcriador = :idcriador AND  NOT ( fim <= :inicio OR inicio >= :fim )");
        $check->bindValue(':datar', $datar, PDO::PARAM_STR);
        $check->bindValue(':idcriador', $idcriador, PDO::PARAM_INT);
        $check->bindValue(':inicio', $inicio, PDO::PARAM_STR);
        $check->bindValue(':fim', $fim, PDO::PARAM_STR);
        $check->execute();

        if ($check->rowCount() > 0) {
            $array['error'] = 'Horário já está em uso.';
        } else {
            // Prepara e executa a query para inserir o novo usuário
            $sql = $pdo->prepare("INSERT INTO reunioes (datar, inicio, fim, localr, assunto, convite, idcriador, situacao) VALUES (:datar, :inicio, :fim, :localr, :assunto, :convite, :idcriador, :situacao)");
            $sql->bindValue(':datar', $datar, PDO::PARAM_STR);
            $sql->bindValue(':inicio', $inicio, PDO::PARAM_STR);
            $sql->bindValue(':fim', $fim, PDO::PARAM_STR);
            $sql->bindValue(':localr', $localr, PDO::PARAM_STR);
            $sql->bindValue(':assunto', $assunto, PDO::PARAM_STR);
            $sql->bindValue(':convite', $convite, PDO::PARAM_STR);
            $sql->bindValue(':idcriador', $idcriador, PDO::PARAM_INT);
            $sql->bindValue(':situacao', "Em aberto", PDO::PARAM_STR);

            if ($sql->execute()) {
                $idReuniao = $pdo->lastInsertId(); // Obtém o ID gerado
                $array['result'] = $idReuniao;
            } else {
                $array['error'] = 'Erro ao registrar a reuniao.';
            }
        }
    } else {
        $array['error'] = 'Dados insuficientes para registrar a reuiniao.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente POST]';
}

require('../return.php');
