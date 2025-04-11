const Ticket = require("../models/ticketModel");
const transporter = require("../utils/mailer");

exports.createTicket = async (req, res) => {
  try {
    const { subject, message } = req.body;

    const ticket = await Ticket.create({
      user: req.user.id,
      subject,
      message,
    });

    // Envoi de mail à l'admin
    await transporter.sendMail({
      from: "support@geryguedegbe.com",
      to: "fabienguedegbe@gmail.com",
      subject: `🎫 Nouveau ticket - ${subject}`,
      html: `
        <h2>Nouveau message de support</h2>
        <p><strong>Sujet:</strong> ${subject}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p>Utilisateur ID: ${req.user.id}</p>
      `,
    });

    res.status(201).json({ message: "Ticket créé", ticket });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la création du ticket" });
  }
};

exports.getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des tickets" });
  }
};
