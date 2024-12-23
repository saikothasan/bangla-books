import { NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";

// API function to fetch PDF links
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

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

    return NextResponse.json({ links });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json(
      { error: "Failed to fetch PDF links" },
      { status: 500 }
    );
  }
}
