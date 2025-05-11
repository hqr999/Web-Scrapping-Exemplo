export interface ObjetoNoticiaAPI {
  titulo: string | null;
  resumo: string | null;
  link: string | null;
  img: string | null;
}

interface NewsAPIResponse {
  status: string;
  totalResults: number;
  articles: {
    source: {
      id: string | null;
      name: string;
    };
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
  }[];
}

const api_key: string = "2239c0f9f548411b8db6650c2c624844";

const link_api: string =
  "https://newsapi.org/v2/" +
  "top-headlines?country=us&category=sports&apiKey=" +
  api_key;

async function buscarNoticias(): Promise<ObjetoNoticiaAPI[]> {
  try {
    const resposta = await fetch(link_api);

    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.status}`);
    }

    const dados: NewsAPIResponse = await resposta.json();

    const noticias: ObjetoNoticiaAPI[] = dados.articles.map((artigo) => ({
      titulo: artigo.title,
      resumo: artigo.description,
      link: artigo.url,
      img: artigo.urlToImage,
    }));

    return noticias;
  } catch (error) {
    console.log("Erro ao buscar notícias:", error);
    return [];
  }
}


const x = await buscarNoticias();
console.log(x);
