import axios from "axios";
import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';

import path from "path";

const jsonParser = bodyParser.json();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

let url =
  "https://newsapi.org/v2/everything?" +
  "q=twitter&" +
  "sortBy=publishedAt&" +
  "apiKey=ec456bddc67d4fb4aa05a42b63eab7df";

// Make the request with axios' get() function
axios.get(url).then(function (r1) {
  // At this point we will have some search results from the API. Take the first search result...
  let firstResult = r1.data.articles[0];

  // ...and download the HTML for it, again with axios
  axios.get(firstResult.url).then(function (r2) {
    // We now have the article HTML, but before we can use Readability to locate the article content we need jsdom to convert it into a DOM object
    let dom = new JSDOM(r2.data, {
      url: firstResult.url,
    });

    // now pass the DOM document into readability to parse
    let article = new Readability(dom.window.document).parse();

    // Done! The article content is in the textContent property
    console.log(article.textContent);
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
