import "dotenv/config";
import { fetchOGImage } from "./thumbnail-scraper.js";

async function main() {
  const url = "https://techcrunch.com";
  console.log(`Testing fetchOGImage with: ${url}\n`);

  const result = await fetchOGImage(url);

  if (result) {
    console.log(`og:image found: ${result}`);
  } else {
    console.log("No og:image found (returned null)");
  }
}

main();
