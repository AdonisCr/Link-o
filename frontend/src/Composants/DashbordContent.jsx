const DashboardContent = () => {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="bg-white shadow-md rounded-lg px-6 py-2">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            Derniers liens
          </h2>
        </div>
  
        <div className="bg-white shadow-md rounded-lg px-6 py-2">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
            Suivie et Analyse
          </h2>
        </div>
      </div>
    );
  };
  
  export default DashboardContent;