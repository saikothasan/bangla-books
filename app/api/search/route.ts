import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = "AIzaSyCuwzmVBBT060Pb6QJtW_wwCow_M-sctdw"; // Replace with your API key
const CX = "c711b8d7a556e47d6"; // Replace with your Search Engine ID

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1`,
      {
        params: {
          key: API_KEY,
          cx: CX,
          q: query,
          fileType: "pdf", // Optional: Restrict results to PDFs
          num: 10, // Number of results per request (max 10)
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching search results:", error);
    return NextResponse.json(
      { error: "Failed to fetch search results" },
      { status: 500 }
    );
  }
}
