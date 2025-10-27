<?php
session_start();

// Conexão com o banco
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "psicia_db";

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

// Login anônimo
if (isset($_POST['login_anonimo'])) {
    $_SESSION['nome_usuario'] = "Anônimo";
    header("Location: html/index.html");
    exit();
}

// Recebe dados do formulário
$usuario_email = $_POST['usuario_email'] ?? '';
$senha = $_POST['senha_usuario'] ?? '';

// Busca usuário no banco (pode logar com nome ou email)
$sql = "SELECT * FROM tb_usuarios WHERE nome_usuario = ? OR email_usuario = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $usuario_email, $usuario_email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    // Verifica senha
    if (password_verify($senha, $user['senha_usuario'])) {
        // Login bem-sucedido
        $_SESSION['nome_usuario'] = $user['nome_usuario'];
        header("Location: html/index.html");
        exit();
    } else {
        echo "<script>alert('Senha incorreta!'); window.location.href='login.html';</script>";
        exit();
    }
} else {
    echo "<script>alert('Usuário ou email não encontrado!'); window.location.href='login.html';</script>";
    exit();
}

$stmt->close();
$conn->close();
?>
