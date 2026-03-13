const axios = require('axios');

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const callGeminiWithRetry = async (payload, retries = 4) => {
  const API_KEY = process.env.GEMINI_API_KEY;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${API_KEY}`,
        payload
      );
      return response;
    } catch (error) {
      const status = error.response?.status;
      const isLastAttempt = attempt === retries;

      if (status === 429) {
        if (isLastAttempt) {
          const err = new Error('Sistem sedang sibuk. Sila cuba lagi sebentar.');
          err.code = 'RATE_LIMITED';
          throw err;
        }
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Rate limited. Retrying in ${delay / 1000}s... (attempt ${attempt}/${retries})`);
        await wait(delay);
      } else {
        console.error('Gemini Error:', JSON.stringify(error.response?.data, null, 2));
        const err = new Error('Gagal menghubungi sistem AI. Sila cuba lagi.');
        err.code = 'GEMINI_ERROR';
        throw err;
      }
    }
  }
};

const analyzeAndAdvise = async (base64Image) => {
const prompt = `
Anda ialah pakar pertanian Malaysia.

Analisis gambar tanaman ini dan kembalikan keputusan dalam JSON SAHAJA.

Format wajib:

{
"disease": "string",
"confidence": number,
"treatment": ["string","string","string"],
"prevention": ["string","string","string","string"]
}

Peraturan:
- Bahasa Malaysia sahaja
- confidence antara 0 hingga 100
- maksimum 3 rawatan
- maksimum 4 pencegahan
- ayat pendek dan jelas
- jangan tulis apa-apa selain JSON
- jangan gunakan markdown
- jangan tambah penerangan
`;

  const payload = {
    contents: [
      {
        parts: [
          {
            inline_data: {
              mime_type: 'image/jpeg',
              data: base64Image,
            },
          },
          { text: prompt },
        ],
      },
    ],
  };

  const response = await callGeminiWithRetry(payload);
const raw = response.data.candidates?.[0]?.content?.parts
  ?.map(p => p.text || "")
  .join("") || "";


const match = raw.match(/\{[\s\S]*\}/);

if (!match) {
  throw new Error("AI did not return JSON");
}

return match[0];

module.exports = { analyzeAndAdvise };
}