import fs from "fs";
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyB7AwjEhXZ30da2yAMYDrNxL_3EADBpZJk");

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(request: Request) {
  const sourceCode = await request.json();

  const sourcePrompt = {
    sourceCode: sourceCode,
    description: `
        - reading source code
        - find need to generate files: files marked "#region -- generate with below requirements"
        - check each 'need to generate' files and generate code base on it requirement => response for each file will be
            {path: path that mark generate code, content: generated content here }
        - response format:[response1, response2, ...]
        - ex: [{path: src/components/atoms/button/button.tsx, content: generated content here}, {path: src/components/atoms/button/button.scss, content: generated content here}]
    `
  };

  const imageSpec = {
    inlineData: {
      data: Buffer.from(
        fs.readFileSync("./public/assets/atom-buttons.png")
      ).toString("base64"),
      mimeType: "image/png",
    },
  };

  const result = await model.generateContent([JSON.stringify(sourcePrompt), imageSpec]);

  const response = await result.response;

  const text = response.text();

  return Response.json({ data: text });
}

export async function GET() {
  const image = {
    inlineData: {
      data: Buffer.from(
        fs.readFileSync("./public/assets/atom-buttons.png")
      ).toString("base64"),
      mimeType: "image/png",
    },
  };

  return Response.json(image);
}
