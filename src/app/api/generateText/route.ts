import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { videoUrl } = req.body;
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/...",
        {
          videoUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
      res.status(200).json({ generatedText: response.data.generatedText });
    } catch (error) {
      console.error("Error generating text:", error);
      res.status(500).json({ error: "Error generating text" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
