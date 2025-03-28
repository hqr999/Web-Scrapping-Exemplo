import axios from "axios";
import * as cheerio from "cheerio";

const url: string = "https://www.iihf.com/en/news";

export interface ObjetoNoticia {
  titulo: string | null;
  resumo: string | null;
  link: string | null;
  img: string | null;
}

export async function GetHockeyNews(): Promise<ObjetoNoticia[]> {
  const resp = await axios.get(url);
  const $ = cheerio.load(resp.data);
  const retorno: ObjetoNoticia[] = [];

  //Pegamos o Link,Titulo e Imagem
  $("div.b-card").each((_, elemento) => {
    const link = url.slice(0, 20) + $(elemento).find("a").attr("href") || null;
    const titulo = $(elemento).find("div.s-text-container").find("a").find("div.s-title").text();
    const resumo = $(elemento).find("div.s-text-container").find("a").text();
    // Extrai a URL da imagem usando regex ou substring
    const styleAttr = $(elemento).find("a.s-image").attr("style") || '';
    // Usando regex para removermos o conteúdo que está ao redor do https://blob...
    const imgMatch = styleAttr.match(/url\(['"]?([^'"]+)['"]?\)/);
    const img = imgMatch ? imgMatch[1] : null;
    retorno.push({ titulo, resumo, link, img })
  });
  return retorno;
}

//rode com npx vite-node

const x = await GetHockeyNews()
console.log(x);
