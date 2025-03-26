import axios from "axios";
import * as cheerio from "cheerio";

const url: string = "https://www.iihf.com/en/news";

export interface ObjetoNoticia {
    titulo:string | null;
    link:string | null;
    resumo:string | null;
}

async function GetHockeyNews(): Promise<ObjetoNoticia[]> {
  const resp = await axios.get(url);
  const $ = cheerio.load(resp.data);
  const retorno: ObjetoNoticia[] = [];

  //Pegamos o Link
  $("div.b-card").each((_, elemento) => {
    const link = url + $(elemento).find("a").attr("href") || null;
    const titulo = $(elemento).find("div.s-text-container").find("a").find("div.s-title").text();
    const resumo = $(elemento).find("div.s-text-container").find("a").find("div.s-text").text();
    retorno.push({titulo,link,resumo})
  });
  return retorno;
}

export {GetHockeyNews};

//rode com npx vite-node 
