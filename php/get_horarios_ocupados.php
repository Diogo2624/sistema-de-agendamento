<?php
include 'config.php';

$data = $_GET['data'];
$profissional = $_GET['profissional'];

$sql = "SELECT horario_agendamento FROM agendamentos
        WHERE data_agendamento = '$data'
        AND profissional = '$profissional'";

$resultado = $conn->query($sql);

$ocupados = [];

while ($row = $resultado->fetch_assoc()) {
    $ocupados[] = $row['horario_agendamento'];
}

echo json_encode($ocupados);