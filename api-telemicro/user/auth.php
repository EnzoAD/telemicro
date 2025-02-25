<?php
require('../config.php');

$array = [];

// Pega o método da requisição
$method = strtolower($_SERVER['REQUEST_METHOD']);

if ($method === 'post') { // Apenas requisições POST
    // Obtém os dados do corpo da requisição
    $input = json_decode(file_get_contents("php://input"), true);

    // Verifica se o email e a senha foram enviados
    if (isset($input['email']) && isset($input['password'])) {
        $email = $input['email'];
        $password = $input['password'];

        // Consulta para verificar o email na base de dados
        $sql = $pdo->prepare("SELECT * FROM users WHERE email = :email");
        $sql->bindValue(':email', $email, PDO::PARAM_STR);
        $sql->execute();

        if ($sql->rowCount() > 0) {
            $user = $sql->fetch(PDO::FETCH_ASSOC);

            // Verifica se a senha fornecida corresponde ao hash armazenado
            if (password_verify($password, $user['password'])) {

                if($user["situacao"] != "ativo"){
                    $array['error'] = 'Usuário inativo.';
                    require('../return.php');
                    exit;
                }

                // Gerar um token simples (ou JWT, se preferir)
                $token = base64_encode(bin2hex(random_bytes(16)) . ':' . $user['id']); // Simples exemplo

                $array['result'] = [
                    'message' => 'Login realizado com sucesso!',
                    'token' => $token,
                    'user' => [
                        'id' => $user['id'],
                        'name' => $user['name'],
                        'email' => $user['email']
                    ]
                ];
            } else {
                $array['error'] = 'Senha incorreta.';
            }
        } else {
            $array['error'] = 'Usuário não encontrado.';
        }
    } else {
        $array['error'] = 'Email e senha são obrigatórios.';
    }
} else {
    $array['error'] = 'Método não permitido. [Somente POST]';
}

require('../return.php');
