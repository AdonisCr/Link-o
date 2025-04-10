const Modal = ({ title, message, onClose }) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-md shadow-lg max-w-md w-full p-6"
      >
        <h2 className="text-lg font-bold text-violet-700">{title}</h2>
        <p className="mt-2 text-gray-700">{message}</p>

        <button
          onClick={onClose}
          className="mt-4 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Modal;
