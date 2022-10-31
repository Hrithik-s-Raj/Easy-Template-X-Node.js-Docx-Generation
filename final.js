import * as fs from "fs";
import { TemplateHandler, MimeType } from "easy-template-x";
import { get } from "https";
import axios from "axios";

let images = [];
let newObj;

const templateFile = fs.readFileSync("final_Template.docx");

(async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/v1/docData");

    const data2 = response.data;
    let Obj;
    data2.map((el) => {
      return (Obj = el), (images = el.images);
    });

    const mime = MimeType.Png;
    let image1;
    let data = [];
    for (var i = 0; i < images.length; i++) {
      const newObj4 = await urlToBuffer(images[i].url);

      let imge = [i + 1].toString();

      data[i] = {
        ["image" + imge]: {
          _type: "image",
          source: newObj4,
          format: MimeType.Png,
          width: images[i].width,
          height: images[i].height,
        },
      };
    }

    const finalObj1 = data;

    const docObject = {
      finalObj1,
    };

    const finalObj = { ...Obj, ...docObject };

    const handler = new TemplateHandler();
    const doc = await handler.process(templateFile, finalObj);

    // 3. save output
    fs.writeFileSync("result-output.docx", doc);
  } catch (error) {
    console.error(error);
  }
})();

function urlToBuffer(url) {
  return new Promise((resolve, reject) => {
    const data = [];
    console.log("url", url);
    get(url, (res) => {
      res
        .on("data", (chunk) => {
          data.push(chunk);
        })
        .on("end", () => {
          resolve(Buffer.concat(data));
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  });
}
