import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaPaperPlane,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: "http://localhost:5000/api/tickets",
  withCredentials: true,
});

const Support = () => {
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [tickets, setTickets] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject || !message) return;

    try {
      const response = await API.post("/create-ticket", {
        subject,
        message,
      });

      // Ajoute le nouveau ticket à la liste
      setTickets((prev) => [response.data.ticket, ...prev]);

      setSubject("");
      setMessage("");

      toast.success("Message envoyé  avec success !");
    } catch (error) {
      toast.error("Erreur lors de l'envoi du ticket");
      console.error(
        "Erreur lors de l'envoi du ticket :",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await API.get("/");
        setTickets(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des tickets :",
          error.response?.data || error.message
        );
      }
    };

    fetchTickets();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full px-4 py-6 flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-black">Support</h2>

      {/* Formulaire de contact */}
      <form
        onSubmit={handleSubmit}
        className="w-full p-5 border rounded-md shadow-sm bg-white"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Contacter le support
        </h3>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Sujet"
            className="border px-3 py-2 rounded-md w-full"
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Votre message..."
            rows={4}
            className="border px-3 py-2 rounded-md w-full resize-none"
          />

          <button
            type="submit"
            className="flex items-center justify-center max-w-full lg:max-w-xs gap-2 bg-violet-600 text-white px-4 py-2 rounded-md hover:bg-violet-700 transition"
          >
            <FaPaperPlane /> Envoyer
          </button>
        </div>
      </form>

      {/* Liste des tickets */}
      <div className="w-full p-5 border rounded-md shadow-sm bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Vos tickets
        </h3>

        {tickets.length === 0 ? (
          <p className="text-sm text-gray-600">Aucun ticket pour le moment.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {tickets.map((ticket) => (
              <li
                key={ticket._id}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between border px-4 py-3 rounded-md bg-gray-50"
              >
                <div>
                  <p className="font-medium text-black">{ticket.subject}</p>

                  <p className="text-sm text-gray-600">
                    Créé le {formatDate(ticket.createdAt)}
                  </p>
                </div>

                <div className="mt-2 sm:mt-0 flex items-center gap-2 text-sm">
                  {ticket.status === "Résolu" && (
                    <span className="text-green-600 flex items-center gap-1">
                      <FaCheckCircle /> {ticket.status}
                    </span>
                  )}

                  {ticket.status === "Ouvert" && (
                    <span className="text-yellow-600 flex items-center gap-1">
                      <FaClock /> {ticket.status}
                    </span>
                  )}

                  {ticket.status === "En attente" && (
                    <span className="text-red-600 flex items-center gap-1">
                      <FaExclamationCircle /> {ticket.status}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Support;
