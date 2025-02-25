<?php
require('../config.php');

$array = [];

// Pega o método da requisição
$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'post') {
    // Obtém os dados do corpo da requisição
    $input = json_decode(file_get_contents("php://input"), true);

    // Verifica se todos os dados necessários foram passados
    if (isset($input['name']) && isset($input['email']) && isset($input['password'])) {
        $name = $input['name'];
        $email = $input['email'];
        $password = password_hash($input['password'], PASSWORD_DEFAULT); // Hash para segurança

        // Verifica se o email já está registrado
        $checkEmail = $pdo->prepare("SELECT * FROM users WHERE email = :email");
        $checkEmail->bindValue(':email', $email, PDO::PARAM_STR);
        $checkEmail->execute();

        if ($checkEmail->rowCount() > 0) {
            $array['error'] = 'Email já está em uso.';
        } else {
            // Prepara e executa a query para inserir o novo usuário
            $sql = $pdo->prepare("INSERT INTO users (name, email, password, situacao) VALUES (:name, :email, :password, :situacao)");
            $sql->bindValue(':name', $name, PDO::PARAM_STR);
            $sql->bindValue(':email', $email, PDO::PARAM_STR);
            $sql->bindValue(':password', $password, PDO::PARAM_STR);
            $sql->bindValue(':situacao', "ativo", PDO::PARAM_STR);

            if ($sql->execute()) {
                $array['success'] = true;

                $array['result'] = 'Usuário criado com sucesso!';
            } else {
                $array['error'] = 'Erro ao criar o usuário.';
            }
        }
    } else {
        $array['error'] = 'Dados insuficientes para criar o usuário.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente POST]';
}

require('../return.php');
