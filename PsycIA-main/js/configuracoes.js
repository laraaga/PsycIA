// --- Carregar configurações salvas ao abrir a página ---
window.onload = function () {
  // Modo escuro
  const darkModeToggle = document.getElementById("darkModeToggle");
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.checked = true;
  }

  // Sons do chat
  const sonsChat = document.getElementById("sonsChat");
  if (sonsChat) sonsChat.checked = localStorage.getItem("sonsChat") === "true";

  // Notificações
  const notificacoes = document.getElementById("notificacoes");
  if (notificacoes) notificacoes.checked = localStorage.getItem("notificacoes") === "true";

  // Duração da meditação
  const duracaoSelect = document.getElementById("duracaoMeditacao");
  if (duracaoSelect) duracaoSelect.value = localStorage.getItem("duracaoMeditacao") || "5";

  // Apelido
  const apelidoInput = document.getElementById("apelido");
  if (apelidoInput) apelidoInput.value = localStorage.getItem("apelido") || "";

  // Email
  const emailInput = document.getElementById("email");
  if (emailInput) emailInput.value = localStorage.getItem("email") || "";

  // Idioma
  const idiomaSelect = document.getElementById("idioma");
  if (idiomaSelect) idiomaSelect.value = localStorage.getItem("idioma") || "pt";
};

// --- Listeners para salvar configurações individuais ---
document.getElementById("darkModeToggle").addEventListener("change", function () {
  document.body.classList.toggle("dark-mode", this.checked);
  localStorage.setItem("darkMode", this.checked);
});

document.getElementById("sonsChat").addEventListener("change", function () {
  localStorage.setItem("sonsChat", this.checked);
});

document.getElementById("notificacoes").addEventListener("change", function () {
  alert(this.checked ? "Notificações ativadas ✅" : "Notificações desativadas ❌");
  localStorage.setItem("notificacoes", this.checked);
});

document.getElementById("duracaoMeditacao").addEventListener("change", function () {
  localStorage.setItem("duracaoMeditacao", this.value);
});

document.getElementById("apelido").addEventListener("change", function () {
  localStorage.setItem("apelido", this.value.trim());
});

document.getElementById("email").addEventListener("change", function () {
  localStorage.setItem("email", this.value.trim());
});

document.getElementById("idioma").addEventListener("change", function () {
  localStorage.setItem("idioma", this.value);
});

// --- Salvando tudo ao enviar o formulário ---
document.getElementById("configForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Salva todos os campos de uma vez
  localStorage.setItem("apelido", document.getElementById("apelido").value.trim());
  localStorage.setItem("email", document.getElementById("email").value.trim());
  localStorage.setItem("idioma", document.getElementById("idioma").value);
  localStorage.setItem("notificacoes", document.getElementById("notificacoes").checked);
  localStorage.setItem("sonsChat", document.getElementById("sonsChat").checked);
  localStorage.setItem("duracaoMeditacao", document.getElementById("duracaoMeditacao").value);
  localStorage.setItem("darkMode", document.getElementById("darkModeToggle").checked);

  // Mensagem de sucesso
  const msg = document.getElementById("msgSucesso");
  msg.style.display = "block";
  setTimeout(() => {
    msg.style.display = "none";
    window.location.href = "../index.html";
  }, 1200);
});