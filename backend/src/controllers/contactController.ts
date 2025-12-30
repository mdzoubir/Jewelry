import { Request, Response } from 'express';

export const sendContactMessage = async (req: Request, res: Response) => {
    try {
        const { nome, cognome, email, telefono, messaggio } = req.body;
        console.log(`[CONTACT FORM] Message from ${nome} ${cognome} (${email}, ${telefono}): ${messaggio}`);
        // Here you would integrate with an email service like SendGrid or Nodemailer
        res.json({ message: 'Messaggio inviato con successo' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Errore durante l\'invio del messaggio' });
    }
};
