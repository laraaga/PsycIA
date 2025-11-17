const texto = document.getElementById("diarioTexto");
const salvarBtn = document.getElementById("salvarBtn");
const voltarBtn = document.getElementById("voltarBtn");
const entradasDiv = document.getElementById("entradas");

let entradas = JSON.parse(localStorage.getItem("psicia_diario")) || [];

function renderEntradas(){
  entradasDiv.innerHTML = "";
  if (entradas.length === 0){
    const p = document.createElement("p");
    p.style.opacity = "0.7";
    p.style.textAlign = "center";
    p.textContent = "Ainda não há entradas. Escreva algo e clique em Salvar ✨";
    entradasDiv.appendChild(p);
    return;
  }

  entradas.forEach((item, idx) => {
    const card = document.createElement("div");
    card.className = "entrada";

    const data = document.createElement("small");
    data.textContent = item.data;
    const textoP = document.createElement("p");
    textoP.style.margin = "0";
    textoP.textContent = item.texto;

    // botão de apagar (à direita)
    const btns = document.createElement("div");
    btns.style.display = "flex";
    btns.style.justifyContent = "flex-end";
    btns.style.marginTop = "10px";
    btns.style.gap = "8px";

    const del = document.createElement("button");
    del.textContent = "Apagar";
    del.style.background = "transparent";
    del.style.color = "#ffc6c6";
    del.style.border = "none";
    del.style.cursor = "pointer";
    del.style.fontWeight = "600";
    del.onclick = () => {
      if (!confirm("Deletar essa entrada?")) return;
      entradas.splice(idx,1);
      localStorage.setItem("psicia_diario", JSON.stringify(entradas));
      renderEntradas();
    };

    // edição rápida
    const edit = document.createElement("button");
    edit.textContent = "Editar";
    edit.style.background = "transparent";
    edit.style.color = "#cfe0ff";
    edit.style.border = "none";
    edit.style.cursor = "pointer";
    edit.style.fontWeight = "600";
    edit.onclick = () => {
      texto.value = item.texto;
      // remove entrada antiga e foca no textarea para salvar nova versão
      entradas.splice(idx,1);
      localStorage.setItem("psicia_diario", JSON.stringify(entradas));
      renderEntradas();
      texto.focus();
    };

    btns.appendChild(edit);
    btns.appendChild(del);

    card.appendChild(data);
    card.appendChild(textoP);
    card.appendChild(btns);

    entradasDiv.appendChild(card);
  });
}

salvarBtn.addEventListener("click", () => {
  const value = texto.value.trim();
  if (value.length === 0) {
    texto.focus();
    return;
  }

  const nova = { texto: value, data: new Date().toLocaleString("pt-BR") };
  entradas.unshift(nova);
  localStorage.setItem("psicia_diario", JSON.stringify(entradas));
  texto.value = "";
  renderEntradas();
});

voltarBtn.addEventListener("click", () => {
  // ação simples: redireciona para a home (ajuste conforme seu projeto)
  window.location.href = "../index.html";
});

// inicializa
renderEntradas();
