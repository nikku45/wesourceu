import pdfParse from "pdf-parse";

export default async function extractPdf(buffer) {
  const data = await pdfParse(buffer);
  return data.text;
}
