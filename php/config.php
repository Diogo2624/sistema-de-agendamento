<?php
$host = "localhost";
$usuario = "root";
$senha = "";
$banco = "barbearia";

$conn = new mysqli($host, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Erro na conexão com o banco de dados: " .$conn->connect_error);
}

echo "Conexão realizada com sucesso!";

?>