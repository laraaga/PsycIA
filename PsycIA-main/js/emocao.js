const botoes = document.querySelectorAll(".emocao-btn");

botoes.forEach(btn => {
  btn.addEventListener("click", () => {
    const emocao = btn.dataset.emocao;
    const data = new Date().toLocaleDateString("pt-BR");

    // Pega histórico existente
    let historico = JSON.parse(localStorage.getItem("historicoEmocoes")) || [];

    // Adiciona nova emoção
    historico.push({ data, emocao });

    // Salva novamente
    localStorage.setItem("historicoEmocoes", JSON.stringify(historico));

    // Mensagem de resposta personalizada
    let mensagem = "";
    switch (emocao) {
      case "Muito Ansioso":
        mensagem = "Tudo bem sentir-se assim 💛 Vamos respirar juntos?";
        break;
      case "Ansioso":
        mensagem = "Parece que o dia está pesado... quer fazer um exercício de relaxamento?";
        break;
      case "Neutro":
        mensagem = "Tudo bem estar no meio-termo 🌿 Que tal um momento de autocuidado?";
        break;
      case "Calmo":
        mensagem = "Que bom ouvir isso 🌸 Continue aproveitando essa paz!";
        break;
      case "Muito Calmo":
        mensagem = "Maravilhoso! 🌞 Vamos manter essa boa energia?";
        break;
    }

    // Exibe mensagem
    const texto = document.createElement("p");
    texto.textContent = mensagem;
    texto.style.marginTop = "20px";
    texto.style.fontWeight = "500";
    document.body.appendChild(texto);
  });
});
