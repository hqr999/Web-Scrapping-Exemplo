import axios from "axios";
import * as cheerio from "cheerio";

const url: string = "https://www.golfdigest.com/golf-news"
export interface ObjetoNoticiaGolf {
  titulo: string | null;
  link: string | null;
  img: string | null;
}

export async function GetGolfNews(): Promise<ObjetoNoticiaGolf[]> {
  const resp = await axios.get(url);
  const $ = cheerio.load(resp.data);
  const retorno: ObjetoNoticiaGolf[] = [];
  $('.storyCard').each((_,elem) => {
    console.log("ENTREI AQUI!!")
    const titulo = $(elem).find('a').find('span').text()
    const link = $(elem).find('a').attr("href") || null 
    const img = $(elem).find('a').find('img').attr('src') || null 

    retorno.push({titulo,link,img})
  })
  return retorno
  }

const x = await GetGolfNews();
console.log(x);
