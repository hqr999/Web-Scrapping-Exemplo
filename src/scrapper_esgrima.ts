import axios from "axios";
import * as cheerio from "cheerio";

const url: string = "https://fie.org/articles";
export interface ObjetoNoticiaEsgrima {
  titulo: string | null;
  link: string | null;
  img: string | null;
}

function extraiLinkString(estilo: string | null): string | null {
  const regex = /url\(['"]?(.*?)['"]?\)/;
  const comb = estilo?.match(regex);
  if (comb && comb[1]) {
        return comb[1]
  }
  return null
}


export async function GetEsgrimaNews(): Promise<ObjetoNoticiaEsgrima[]> {
  const resp = await axios.get(url);
  const $ = cheerio.load(resp.data);
  const lista: ObjetoNoticiaEsgrima[] = [];

  $("div.col-xs-12.development--container")
    .find("a.ContentCard.development--card")
    .each((_, elem) => {
      console.log("ENTREI AQUI");
      const titulo = $(elem).find("div.ContentCard-content").find("h3").text();
      const link = url.slice(0,15) + $(elem).attr("href") || null;
      const im = $(elem).find("div.ContentCard-frame").find(".ContentCard-image").attr("style") || null;
      
      const img = extraiLinkString(im);
      lista.push({ titulo, link, img });
    });

  return lista;
}

const cv = await GetEsgrimaNews();
console.log(cv);
