import axios from "axios";
import * as cheerio from "cheerio";
import { ObjetoNoticia } from "./scrapper_hockey";

const url: string = "https://thesquashsite.com/category/news";

export async function GetSquashNews(): Promise<ObjetoNoticia[]> {
  const resp = await axios.get(url);
  const $ = cheerio.load(resp.data);
  const retorno:ObjetoNoticia[] = [];

  $("article").each((_, elemento) => {
    const titulo = $(elemento).find("h2").find("a").text();
    const link = $(elemento).find("a").attr("href") || null;
    const resumo = $(elemento).find("div").find("p").text();
    const img = $(elemento).find("a").find("img").attr("src") || null;

    retorno.push({ titulo, resumo, link, img })
  })
  return retorno
}

const x = await GetSquashNews();
console.log(x);
