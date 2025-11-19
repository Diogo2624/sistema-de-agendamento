<?php
header("Content-Type: application/json; charset=utf-8");
include 'config.php';

$conn->set_charset("utf8mb4");


$nome         = $_POST['nome']         ?? '';
$data         = $_POST['data']         ?? '';
$horario      = $_POST['hora']         ?? '';
$profissional = $_POST['profissional'] ?? '';
$servicos     = $_POST['servicos']     ?? '';

if (empty($nome) || empty($data) || empty($horario) || empty($profissional)) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Por favor, preencha todos os campos obrigatórios."
    ]);
    exit;
}


$dataAtual = date("Y-m-d");
$horaAtual = date("H:i");

if ($data < $dataAtual) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Você não pode agendar em uma data passada."
    ]);
    exit;
}

if ($data === $dataAtual && $horario <= $horaAtual) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Esse horário já passou. Escolha outro horário."
    ]);
    exit;
}


$stmt = $conn->prepare("
    SELECT 1 FROM agendamentos
    WHERE data = ? AND hora = ? AND profissional = ?
");
$stmt->bind_param("sss", $data, $horario, $profissional);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Esse horário já está reservado com esse profissional."
    ]);
    exit;
}
$stmt->close();


$stmt = $conn->prepare("
    INSERT INTO agendamentos (nome, data, hora, profissional, servicos)
    VALUES (?, ?, ?, ?, ?)
");
$stmt->bind_param("sssss", $nome, $data, $horario, $profissional, $servicos);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "sucesso",
        "mensagem" => "Seu agendamento foi realizado com sucesso!"
    ]);
} else {
    echo json_encode([
        "status" => "erro",
        "mensagem" => "Erro ao salvar no banco de dados."
    ]);
}

$stmt->close();
$conn->close();

?>
