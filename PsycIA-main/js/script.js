window.onload = function () {
  const div = document.getElementById("boas-vindas");
  if (!div) return;

  // Tenta pegar o apelido, se não existir pega o nome
  const apelido = localStorage.getItem("apelido");
  const nome = localStorage.getItem("nomeUsuario");
  const genero = localStorage.getItem("generoUsuario");

  // Decide qual nome mostrar
  const nomeParaMostrar = apelido && apelido !== "" ? apelido : nome;

  if (nomeParaMostrar && nomeParaMostrar !== "anonimo") {
    let saudacao;
    if (genero === "masculino") saudacao = `Olá, ${nomeParaMostrar}! Seja bem-vindo 🧠✨`;
    else if (genero === "feminino") saudacao = `Olá, ${nomeParaMostrar}! Seja bem-vinda 🧠✨`;
    else saudacao = `Olá, ${nomeParaMostrar}! Seja bem-vinde 🧠✨`;
    div.innerText = saudacao;
  } else {
    div.innerText = `Olá! Você está no modo anônimo 🌙`;
  }
};

// --- Enviar mensagem ---
async function enviarMensagem(event) {
  event?.preventDefault();
  const input = document.getElementById("userInput");
  if (!input) return;
  const texto = input.value.trim();
  if (!texto) return;

  // --- verificação de risco ---
  const palavrasDeRisco = [
    "me matar",
    "acabar com minha vida",
    "não quero mais viver",
    "me suicidar",
    "quero morrer",
    "vida não vale a pena",
    "tirar minha vida"
  ];
  const textoMinusculo = texto.toLowerCase();
  const risco = palavrasDeRisco.some(palavra => textoMinusculo.includes(palavra));
  const chat = document.getElementById("chatBox");
  const chatContainer = document.querySelector(".chat-container");

  if (risco) {
    if (chat) {
      const alerta = document.createElement("div");
      alerta.className = "message bot alerta";
      alerta.innerHTML = `
        💛 Parece que você está passando por um momento muito difícil.<br>
        Você <strong>não está sozinho(a)</strong>.<br>
        Procure ajuda imediatamente:<br>
        <strong>CVV – 188</strong> (ligação gratuita e anônima)<br>
        ou acesse <a href="https://cvv.org.br" target="_blank">cvv.org.br</a> 💬
      `;
      chat.appendChild(alerta);
      chat.scrollTop = chat.scrollHeight;
    }
    input.value = "";
    return; // impede de continuar e enviar à API
  }

  if (chatContainer) chatContainer.style.display = "flex";
  if (chat) {
    // Mensagem do usuário
    const userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.textContent = texto;
    chat.appendChild(userMsg);

    // Mensagem "digitando"
    const typingMsg = document.createElement("div");
    typingMsg.className = "digitando";
    typingMsg.innerHTML = '💬 PsicIA está digitando <div class="typing-dots"><span></span><span></span><span></span></div>';
    chat.appendChild(typingMsg);
    chat.scrollTop = chat.scrollHeight;

    // Chave e chamada da API
    const chave = "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";
    let resposta = "Desculpe, não entendi.";
    try {
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${chave}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "Você é PsicIA, uma IA que conversa como um amigo legal. Use linguagem leve, curta (até 200 caracteres), direta e acolhedora. Seja empático e um pouco racional para ajudar, e use emojis para deixar a mensagem mais amigável. Evite respostas secas ou formais.",
              },
              { role: "user", content: texto },
            ],
          }),
        }
      );
      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message) {
        resposta = data.choices[0].message.content.slice(0, 200);
      } else {
        resposta = "Desculpe, não consegui entender.";
      }
    } catch (err) {
      console.error("Erro na chamada da API:", err);
      resposta = `Erro na API: ${err.message || err}`;
    }

    setTimeout(() => {
      typingMsg.remove();
      const botMsg = document.createElement("div");
      botMsg.className = "message bot";
      chat.appendChild(botMsg);
      let i = 0;
      function digitar() {
        if (i < resposta.length) {
          botMsg.textContent += resposta.charAt(i);
          i++;
          setTimeout(digitar, 60);
          chat.scrollTop = chat.scrollHeight;
        }
      }
      digitar();
    }, 1000);

    input.value = "";
  }
}

// --- Navegação rápida ---
function abrirRespiracao() {
  window.location.href = "html/respiracao.html";
}
function abrirMeditacao() {
  window.location.href = "html/meditacao.html";
}
function abrirGratidao() {
  window.location.href = "html/gratidao.html";
}
function acharPsicologos() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        window.open(
          `https://www.google.com/maps/search/psicólogos/@${lat},${lon},14z`,
          "_blank"
        );
      },
      () => alert("Não foi possível obter sua localização. Permita o acesso.")
    );
  } else {
    alert("Geolocalização não suportada pelo seu navegador.");
  }
}

// --- Dark mode ---
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// --- Perfil e conquistas ---
const modalPerfil = document.getElementById("modalPerfil");
const nomeUsuarioModal = document.getElementById("nomeUsuarioModal");
const conquistasPerfil = document.getElementById("conquistasPerfil");

function abrirPerfil() {
  if (!modalPerfil) return;
  modalPerfil.style.display = "flex";
  const nome = localStorage.getItem("nomeUsuario") || "Usuário";
  if (nomeUsuarioModal) nomeUsuarioModal.textContent = `Olá, ${nome}!`;
  atualizarConquistasPerfil();
}

const conteudoModal = document.querySelector("#modalPerfil .modal-content");
if (conteudoModal) {
  conteudoModal.addEventListener("click", (event) => {
    event.stopPropagation(); // impede o clique de fechar o modal
  });
}

function fecharPerfil() {
  if (modalPerfil) modalPerfil.style.display = "none";
}

function logout() {
  localStorage.removeItem("nomeUsuario");
  localStorage.removeItem("generoUsuario");
  window.location.href = "html/login.html";
}

function atualizarConquistasPerfil() {
  if (!conquistasPerfil) return;
  conquistasPerfil.innerHTML = "";
  document.querySelectorAll("#listaConquistas .conquista").forEach((c) => {
    const clone = c.cloneNode(true);
    conquistasPerfil.appendChild(clone);
  });
}

if (modalPerfil) {
  modalPerfil.addEventListener("click", (event) => {
    if (event.target === modalPerfil) fecharPerfil();
  });
}

// --- Registro de emoções ---
function registrarEmocao(emocao) {
  const hoje = new Date().toLocaleDateString("pt-BR");
  let historico = JSON.parse(localStorage.getItem("historicoEmocoes")) || [];
  historico.push({ data: hoje, emocao });
  localStorage.setItem("historicoEmocoes", JSON.stringify(historico));
  const mensagem = document.getElementById("mensagem-registrada");
  if (mensagem) {
    mensagem.textContent = `Sua emoção "${emocao}" foi registrada!`;
    mensagem.classList.add("show");
    setTimeout(() => mensagem.classList.remove("show"), 3000);
  }
}

const config = JSON.parse(localStorage.getItem('configuracoes')) || {};
// Agora você pode usar config.apelido, config.notificacoes, config.idioma, etc.