<?php
include 'config.php';

//receber dados via POST
$nome = $_POST['nome'];
$data = $_POST['data'];
$horario = $_POST['hora'];
$profissional = $_POST['profissional'];
$servicos = $_POST['servicos'];

//Erro caso algum campo fique vazio
if (empty($nome) || empty($data) || empty($horario) || empty($profissional)) {
    die("Por favor, preencha todos os campos obrigatórios.");
}

//Pegar data e a hora ATUAL do sistema
$dataAtual = date("Y-m-d");
$horaAtual = date("H:i");

// Verificar se o cliente está tentando agendar um horário que já passou
if ($data < $dataAtual) {
    die("Você não pode agendar em uma data que já passou.");
}

if ($data === $dataAtual && $horario <= $horaAtual) {
    die("Esse horário já passou. Escolha outro horário.");
}

// Verificar se o horario já está agendado para o Barbeiro
$sql = "SELECT * FROM agendamentos
        WHERE data_agendamento = '$data'
        AND horario_agendamento = '$horario'
        AND profissional = '$profissional'";

$resultado  = $conn->query($sql);

if ($resultado->num_rows > 0) {
    die("Esse horário já está reservado com esse barbeiro, Escolha outro horário.");
}

// Inserir no banco de dados
$sqlInserir = "INSERT INTO agendamentos
(nome_cliente, data_agendamento, horario_agendamento, profissional, servicos)
VALUES ('$nome', '$data', '$horario', '$profissional', '$servicos')";

if ($conn->query($sqlInserir) === TRUE) {
    echo "Agendamento realizado com sucesso!";
} else {
    echo "Erro ao criar agendamento: " . $conn->error;
}

$conn->close();

?>
