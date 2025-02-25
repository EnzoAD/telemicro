<?php
require('../config.php');

$array = [];

// Pega o método da requisição
$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'put') { // Para o update, geralmente usamos PUT
    // Obtém os dados do corpo da requisição
    $input = json_decode(file_get_contents("php://input"), true);

    // Verifica se o ID foi passado junto com os dados a serem atualizados
    if (isset($input['id']) && isset($input['name']) && isset($input['email'])) {
        $id = intval($input['id']); // Converte o id para inteiro (mais seguro)
        $name = $input['name'];
        $email = $input['email'];
        $password = isset($input['password']) ? password_hash($input['password'], PASSWORD_DEFAULT) : null; // Se a senha não for enviada, mantém null

        // Verifica se o ID existe na base de dados
        $checkId = $pdo->prepare("SELECT * FROM users WHERE id = :id");
        $checkId->bindValue(':id', $id, PDO::PARAM_INT);
        $checkId->execute();

        if ($checkId->rowCount() > 0) {
            // Verifica se o email já está em uso por outro usuário
            $checkEmail = $pdo->prepare("SELECT * FROM users WHERE email = :email AND id != :id");
            $checkEmail->bindValue(':email', $email, PDO::PARAM_STR);
            $checkEmail->bindValue(':id', $id, PDO::PARAM_INT);
            $checkEmail->execute();

            if ($checkEmail->rowCount() > 0) {
                $array['error'] = 'Email já está em uso por outro usuário.';
            } else {
                // Monta a query de atualização
                $sql = "UPDATE users SET name = :name, email = :email";
                if ($password) { // Atualiza a senha somente se foi enviada
                    $sql .= ", password = :password";
                }
                $sql .= " WHERE id = :id";

                $update = $pdo->prepare($sql);
                $update->bindValue(':name', $name, PDO::PARAM_STR);
                $update->bindValue(':email', $email, PDO::PARAM_STR);
                if ($password) {
                    $update->bindValue(':password', $password, PDO::PARAM_STR);
                }
                $update->bindValue(':id', $id, PDO::PARAM_INT);

                if ($update->execute()) {
                    $array['result'] = 'Usuário atualizado com sucesso!';
                } else {
                    $array['error'] = 'Erro ao atualizar o usuário.';
                }
            }
        } else {
            $array['error'] = 'Usuário não encontrado.';
        }
    } else {
        $array['error'] = 'Dados insuficientes para atualizar o usuário. É necessário fornecer ID, nome e email.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente PUT]';
}

require('../return.php');
