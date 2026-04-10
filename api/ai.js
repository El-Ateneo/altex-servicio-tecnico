export default async function handler(req, res) {
    try {
        const { prompt } = req.body;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + process.env.GROQ_API_KEY
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [
                    {
                        role: "system",
                        content: "Sos un técnico experto en reparación de celulares, PC y consolas. Respondé claro, breve y profesional."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();

        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
}
