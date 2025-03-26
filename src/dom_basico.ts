import { GetHockeyNews, ObjetoNoticia } from "./scrapper"; // Importa a função e a interface

async function criarElementosNoticia() {
    const noticias: ObjetoNoticia[] = await GetHockeyNews();
    const container = document.querySelector("#noticias-container");// Crie um elemento com id "noticias-container" no seu HTML

    console.log(noticias);
    if (container) {
        noticias.forEach((noticia) => {
            const noticiaDiv = document.createElement("div");
            noticiaDiv.classList.add("noticia"); // Adiciona uma classe para estilização (opcional)

            const tituloH2 = document.createElement("h2");
            tituloH2.textContent = noticia.titulo;

            const linkA = document.createElement("a");
            linkA.href = noticia.link || ""; // Evita erros se o link for null
            linkA.textContent = "Leia mais";

            const resumoP = document.createElement("p");
            resumoP.textContent = noticia.resumo;

            noticiaDiv.appendChild(tituloH2);
            noticiaDiv.appendChild(resumoP);
            noticiaDiv.appendChild(linkA);

            container.appendChild(noticiaDiv);
        });
    } else {
        console.error("Elemento com id 'noticias-container' não encontrado no HTML.");
    }
}

criarElementosNoticia();
