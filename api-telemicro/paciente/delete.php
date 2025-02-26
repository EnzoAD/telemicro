<?php
require('../config.php'); // Conexão com o banco de dados

header("Content-Type: application/json");
$array = [];

// Verifica se o método da requisição é DELETE
$method = strtolower($_SERVER['REQUEST_METHOD']);
if ($method === 'delete') {
    // Lê os dados enviados no corpo da requisição
    $inputData = json_decode(file_get_contents('php://input'), true);
    $id = $inputData['id'] ?? null;

    // Valida o ID
    if ($id && is_numeric($id)) {
        $id = (int) $id;

        try {
            // Inicia uma transação para garantir consistência
            $pdo->beginTransaction();

            // Exclui o paciente
            $sql = $pdo->prepare("DELETE FROM paciente WHERE id = :id");
            $sql->bindValue(':id', $id, PDO::PARAM_INT);

            if ($sql->execute()) {
                // Confirma a transação
                $pdo->commit();
                $array['success'] = true;
                $array['message'] = 'Paciente excluído com sucesso.';
            } else {
                $pdo->rollBack(); // Desfaz a transação
                $array['error'] = 'Erro ao excluir o paciente.';
            }
        } catch (PDOException $e) {
            // Desfaz a transação em caso de erro
            $pdo->rollBack();
            error_log('Erro no banco de dados: ' . $e->getMessage());
            $array['error'] = 'Erro interno no servidor.';
        }
    } else {
        $array['error'] = 'ID do paciente inválido ou não fornecido.';
    }
} else {
    $array['error'] = 'Método não permitido. Apenas DELETE é aceito.';
}

// Retorna a resposta em JSON
echo json_encode($array);
exit;
