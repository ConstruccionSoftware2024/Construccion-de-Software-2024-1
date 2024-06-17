import { GoogleGenerativeAI } from "@google/generative-ai";
import { exec } from 'child_process';
import { writeFile } from 'fs/promises';



// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI("AIzaSyBheR5f8PrwOnPRaY_CNlU8eZlccqSkre4");

export default async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  exec('tasklist', async (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing tasklist: ${error}`);
      return;
    }

    if (stderr) {

      console.error(`Error in stderr: ${stderr}`);
      return;
    }

    const prompt = `Dada las lista de procesos: ${stdout}\nPor favor, clasifica las aplicaciones del usuario (no sistema) según su conveniencia al momento de estudiar. Debes clasificar entre 'bueno', 'malo' e 'intermedio', y siempre debe ser alguna de estas opciones, agrupa las que son iguales.`;

    try {
      // If model.generateContent() expects a string:
      const result = await model.generateContent(prompt);
      const response = result.response;
      // Or if model.generateContent() expects an array:
      // const result = await model.generateContent([prompt]);

      const text = response.text(); // Adjust this based on the response structure

      await writeFile('response.md', text);
      console.log('File has been created');
    } catch (e) {
      console.error(`Error generating content: ${e}`);
    }
  });
}
run();

