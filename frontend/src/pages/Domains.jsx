import { useState } from "react";
import { FaTrash, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Domains = () => {
  const [domains, setDomains] = useState([
    { id: 1, name: "example.com", verified: true },
    { id: 2, name: "monlienperso.dev", verified: false },
  ]);

  const [newDomain, setNewDomain] = useState("");

  const handleAddDomain = () => {
    if (!newDomain) return;

    const newId = Date.now();
    setDomains((prev) => [
      ...prev,
      { id: newId, name: newDomain, verified: false },
    ]);
    setNewDomain("");
  };

  const handleDeleteDomain = (id) => {
    setDomains((prev) => prev.filter((domain) => domain.id !== id));
  };

  return (
    <div className="w-full px-4 py-6 flex flex-col gap-8">
      <h2 className="text-2xl font-bold text-black">Domaines personnalisés</h2>

      {/* Ajouter un domaine */}
      <div className="p-5 border rounded-md shadow-sm bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Ajouter un domaine
        </h3>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <input
            type="text"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            placeholder="ex. monsite.com"
            className="border px-3 py-2 rounded-md w-full sm:w-2/3"
          />

          <button
            onClick={handleAddDomain}
            className="bg-violet-600 hover:bg-violet-700 text-white py-2 px-4 rounded-md w-full sm:w-fit"
          >
            Ajouter
          </button>
        </div>
      </div>

      {/* Liste des domaines */}
      <div className="p-5 border rounded-md shadow-sm bg-white">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Vos domaines
        </h3>

        {domains.length === 0 ? (
          <p className="text-sm text-gray-600">Aucun domaine ajouté.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {domains.map((domain) => (
              <li
                key={domain.id}
                className="flex items-center justify-between border px-4 py-2 rounded-md"
              >
                <div className="flex items-center gap-3">
                  <p className="text-black font-medium">{domain.name}</p>

                  {domain.verified ? (
                    <span className="flex items-center gap-1 text-green-600 text-sm">
                      <FaCheckCircle />
                      Vérifié
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-600 text-sm">
                      <FaTimesCircle />
                      Non vérifié
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleDeleteDomain(domain.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Domains;
