<?php
header("Content-Type: application/json; charset=UTF-8");


$servername = "localhost";
$username = "root";
$password = "";
$dbname = "barbearia";

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Erro ao conectar ao banco."
    ]);
    exit;
}


$nome = $_POST['nome'] ?? '';
$data = $_POST['data'] ?? '';
$hora = $_POST['hora'] ?? '';
$servicos = $_POST['servicos'] ?? '';
$profissional = $_POST['profissional'] ?? '';


$sql = $conn->prepare(
    "INSERT INTO agendamentos (nome, data, hora, servicos, profissional) 
     VALUES (?, ?, ?, ?, ?)"
);

$sql->bind_param("sssss", $nome, $data, $hora, $servicos, $profissional);


if ($sql->execute()) {
    echo json_encode([
        "status" => "sucesso",
        "mensagem" => "Seu agendamento foi realizado com sucesso!"
    ]);
} else {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Erro ao realizar agendamento: " . $conn->error
    ]);
}

$sql->close();
$conn->close();
?>
