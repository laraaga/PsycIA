const ctx = document.getElementById("graficoEmocoes").getContext("2d");
const containerGrafico = document.getElementById("containerGrafico");
const mensagemVazia = document.getElementById("mensagemVazia");

// Lê histórico salvo no navegador
let historico = JSON.parse(localStorage.getItem("historicoEmocoes")) || [];

// Mapeia emoções para valores numéricos
const emocaoParaValor = {
  "Muito Ansioso": 1,
  "Ansioso": 2,
  "Neutro": 3,
  "Calmo": 4,
  "Muito Calmo": 5
};

// Atualiza gráfico e visibilidade
function atualizarGrafico() {
  if(historico.length === 0) {
    containerGrafico.style.display = "none";
    mensagemVazia.style.display = "block";
    return;
  }

  containerGrafico.style.display = "block";
  mensagemVazia.style.display = "none";

  const datas = historico.map(item => item.data);
  const emocoes = historico.map(item => emocaoParaValor[item.emocao]);

  if(window.grafico) {
    window.grafico.data.labels = datas;
    window.grafico.data.datasets[0].data = emocoes;
    window.grafico.update();
  } else {
    window.grafico = new Chart(ctx, {
      type: "line",
      data: {
        labels: datas,
        datasets: [{
          label: "Nível de Calma 🧘‍♀️",
          data: emocoes,
          borderWidth: 2,
          borderColor: "#4ea8de",
          backgroundColor: "rgba(78,168,222,0.25)",
          pointBackgroundColor: "#4ea8de",
          pointRadius: 5,
          tension: 0.3,
          fill: true
        }]
      },
      options: {
        scales: {
          y: {
            min: 1,
            max: 5,
            ticks: {
              stepSize: 1,
              callback: function(value) {
                return ["", "Muito Ansioso", "Ansioso", "Neutro", "Calmo", "Muito Calmo"][value];
              }
            }
          }
        }
      }
    });
  }
}

// Registrar nova emoção (chamar na outra página)
function registrarEmocao(emocao) {
  const hoje = new Date().toLocaleDateString("pt-BR");
  historico.push({ data: hoje, emocao });
  localStorage.setItem("historicoEmocoes", JSON.stringify(historico));
  atualizarGrafico();
}

// Limpar histórico
function limparHistorico() {
  if(confirm("Tem certeza que deseja apagar seu histórico emocional? 🧹")) {
    historico = [];
    localStorage.removeItem("historicoEmocoes");
    atualizarGrafico();
  }
}

// Inicializa
atualizarGrafico();

// Modo escuro
function toggleDarkMode() { document.body.classList.toggle("dark-mode"); }



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