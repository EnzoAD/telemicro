<?php
    require('../config.php');

    $array = [];


    //Pega os usuários do banco de dados e colocar na array
    $method = strtolower($_SERVER['REQUEST_METHOD']);

    if($method === 'get'){

        $sql = $pdo->query("SELECT * FROM users");

        if($sql->rowCount() > 0){

            $data = $sql->fetchAll(PDO::FETCH_ASSOC);

            foreach($data as $item){
                $array['result'][] = [
                    'id' => $item['id'],
                    'name' => $item['name'],
                    'email' => $item['email'],
                    'password' => $item['password']
                ];
            }
        }

    }else{
        $array['error']  = 'Método não permitido. [Somente Get]';
    }
    
    
    require('../return.php');