<?php
header("Content-Type: application/json");
require_once "config.php";


$nome = $_POST['nome'] ?? '';
$data = $_POST['data'] ?? '';
$horario = $_POST['hora'] ?? '';
$profissional = $_POST['profissional'] ?? '';
$servicos = $_POST['servicos'] ?? '';


if (empty($nome) || empty($data) || empty($horario) || empty($profissional)) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Preencha todos os campos antes de continuar."
    ]);
    exit;
}


$check = $conn->prepare("
    SELECT id 
    FROM agendamentos 
    WHERE data = ? AND horario = ? AND profissional = ?
");
$check->bind_param("sss", $data, $hora, $profissional);
$check->execute();
$resultado = $check->get_result();


if ($resultado->num_rows > 0) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Este horário já está reservado para outro cliente. 
                        Marque um horário posterior ou escolha outro profissional."
    ]);
    exit;
}


$stmt = $conn->prepare("
    INSERT INTO agendamentos (nome, data, horario, profissional, servicos)
    VALUES (?, ?, ?, ?, ?)
");

$stmt->bind_param("sssss", $nome, $data, $hora, $profissional, $servicos);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "ok",
        "mensagem" => "Agendamento realizado com sucesso!"
    ]);
} else {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Erro ao salvar o agendamento. Tente novamente."
    ]);
}
