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

$nome = $_POST["nome"] ?? "";
$data = $_POST["data"] ?? "";
$hora = $_POST["hora"] ?? "";
$profissional = $_POST["profissional"] ?? "";
$servicos = $_POST["servicos"] ?? "";


if (empty($nome) || empty($data) || empty($hora) || empty($profissional)) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Preencha todos os campos antes de continuar."
    ]);
    exit;
}


$sql = $conn->prepare("SELECT id FROM agendamentos WHERE data = ? AND hora = ? AND profissional = ?");
$sql->bind_param("sss", $data, $hora, $profissional);
$sql->execute();
$result = $sql->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Este horário já está reservado. Escolha outro horário ou outro profissional."
    ]);
    exit;
}


$stmt = $conn->prepare("INSERT INTO agendamentos (nome, data, hora, profissional, servicos)
                        VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $nome, $data, $hora, $profissional, $servicos);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "sucesso",
        "mensagem" => "Seu agendamento foi realizado com sucesso!"
    ]);
} else {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Erro ao realizar agendamento."
    ]);
}

$stmt->close();
$conn->close();
?>
