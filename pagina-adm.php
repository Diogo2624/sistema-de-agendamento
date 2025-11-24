<?php
include "conexao.php";

$sql = "Select * FROM agendamentos ORDER BY id DESC";
$result = $conn->query($sql);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Página-Administrador</title>
</head>
<body>
    <h1>Agendamentos Registrados</h1>
    <table border="1"  cellpadding="10">
        <tr>
            <th>ID</th>
            <th>NOME</th>
            <th>DATA</th>
            <th>HORA</th>
            <th>PROFISSIONAL</th>
            <th>SERVIÇOS</th>
        </tr>
<?php
    if($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "<tr>";
            echo "<td>".$row['id']."</td>";
            echo "<td>".$row['nome']."</td>";
            echo "<td>".$row['data']."</td>";
            echo "<td>".$row['hora']."</td>";
            echo "<td>".$row['profissional']."</td>";
            echo "<td>".$row['servicos']."</td>"; 
        }
    } else {
        echo"<tr><td colspan='4'>Nenhum agendamento encontrado.</td></tr>";
    }
?>
    </table>
</body>
</html>
