<?php
// Conexão com o banco
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "psicia_db";

$conn = new mysqli($host, $user, $pass, $dbname);

// Verifica erro
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

// Recebe dados do formulário
$nome = $_POST['nome_usuario'];
$email = $_POST['email_usuario'];
$senha = $_POST['senha_usuario'];
$genero = $_POST['genero_usuario'];

// Criptografar a senha
$senha_hash = password_hash($senha, PASSWORD_DEFAULT);

// Verificar se o email já existe
$sql_check = "SELECT * FROM tb_usuarios WHERE email_usuario = ?";
$stmt_check = $conn->prepare($sql_check);
$stmt_check->bind_param("s", $email);
$stmt_check->execute();
$result = $stmt_check->get_result();

if ($result->num_rows > 0) {
    echo "<script>alert('Esse email já está cadastrado!'); window.location.href='cadastro.html';</script>";
    exit();
}

// Inserir no banco
$sql = "INSERT INTO tb_usuarios (nome_usuario, email_usuario, senha_usuario, genero_usuario) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $nome, $email, $senha_hash, $genero);

if ($stmt->execute()) {
    echo "<script>alert('Cadastro realizado com sucesso!'); window.location.href='login.html';</script>";
} else {
    echo "<script>alert('Erro ao cadastrar.'); window.location.href='cadastro.html';</script>";
}

$stmt->close();
$conn->close();
?>
