import axios from "axios";
import * as cheerio from "cheerio";

const url: string = "https://bowl.com/news";
export interface ObjetoNoticiaBoliche {
  titulo: string | null;
  link: string | null;
  img: string | null;
}

export async function GetBolicheNews(): Promise<ObjetoNoticiaBoliche[]> {
  const resp = await axios.get(url);
  const $ = cheerio.load(resp.data);
  const retorno: ObjetoNoticiaBoliche[] = [];

  $(".col-xs-12.col-sm-pull-3.col-sm-9.main-content__body.pr-3")
    .find("article")
    .each((_, elem) => {
      console.log("ENTREI AQUI");
      const titulo = $(elem).find("a").find("section").find("h3").text();
      const link = url.slice(0, 16) + $(elem).find("a").attr("href") || null;
      const img = url.slice(0,16) + $(elem).find(".article__section--image.col-sm-12.col-md-6").find("img").attr("src") || null
      retorno.push({ titulo, link, img });
    });

  return retorno;
}

const x = await GetBolicheNews();
console.log(x);

