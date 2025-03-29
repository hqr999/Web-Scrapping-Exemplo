import { ObjetoNoticia } from "./scrapper_hockey";
import { GetHockeyNews } from "./scrapper_hockey";

export function criaElemento(noticias: ObjetoNoticia[]): void {
  //Seleciona a âncora em nosso html
  const containerNoticias = document.querySelector("#noticias-container");

  //Itera sobre cada noticia e cria elementos HTML
  noticias.forEach((noticia) => {
    //Verificamos se todos os campos existem de fato
    if (!noticia.titulo || !noticia.link || !noticia.img) return;

    const cardNoticias = document.createElement("div");
    cardNoticias.className = "card-noticia";

    //Cria a imagem
    const imgElem = document.createElement("img");
    //Link da imagem fará com que ela apareca na tela
    imgElem.src = noticia.img;
    imgElem.alt = noticia.titulo || "imagem";
    //Cria o container de texto
    const textoContainer = document.createElement("div");

    //Cria o título como link
    const tituloLink = document.createElement("h3");
    const linkh3 = document.createElement("a");
    linkh3.href = noticia.link;
    linkh3.textContent = noticia.titulo;
    tituloLink.appendChild(linkh3);

    textoContainer.appendChild(tituloLink);

    cardNoticias.appendChild(textoContainer);
    cardNoticias.appendChild(imgElem);

    containerNoticias?.appendChild(cardNoticias);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const noticias = await GetHockeyNews();
    criaElemento(noticias);
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
  }
});
