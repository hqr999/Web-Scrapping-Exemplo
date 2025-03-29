import axios from "axios";
import * as cheerio from "cheerio";

const url: string = "https://www.golf.com/news";

export interface ObjetoNoticiaGolf {
  titulo: string | null;
  autor: string | null;
  link: string | null;
  img: string | null;
}

const r = await axios.get(url);
const $ = cheerio.load(r.data);
console.log($("div.latest-in-category__list").get());

/*
export async function GetGolfNews(): Promise<ObjetoNoticiaGolf[]> {
  const resp = await axios.get(url);
  const $ = cheerio.load(resp.data);
  const retorno:ObjetoNoticiaGolf[] = [];

  $('article.latest-in-category__article').each((_,elem) => {
     const titulo = $(elem).find('a').find('h3').text();
     const autor = $(elem).find('div.latest-in-category__by-line').find('a').text();

     const link = $(elem).find('a').attr('href') || null;
     const img = $(elem).find('a').find('div.latest-in-category__image-wrapper').find('img').attr('src') || null;

    retorno.push({titulo,autor,link,img})
  })

  return retorno;
}


const x = await GetGolfNews();
console.log(x);*/
