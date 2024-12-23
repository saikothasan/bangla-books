import axios from "axios";
import cheerio from "cheerio";

export async function fetchBooks(query: string): Promise<string[]> {
  const dork = `${query} filetype:pdf`;
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(dork)}`;

  try {
    const { data } = await axios.get(searchUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36",
      },
    });

    const $ = cheerio.load(data);
    const links: string[] = [];

    $("a").each((_, element) => {
      const href = $(element).attr("href");
      if (href && href.includes("http") && href.includes(".pdf")) {
        links.push(href.split("&")[0].replace("/url?q=", ""));
      }
    });

    return links;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
}
