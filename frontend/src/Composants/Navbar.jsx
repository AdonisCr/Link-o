const NavBar = () => {
  return (
    <div className="w-full bg-Blacks py-4 text-white border-l-2 px-2 flex items-center justify-between">

      <div className="flex bg-white px-2 py-1 rounded-md items-center gap-1">
        <img src="/src/assets/images/Search.svg" alt="Rechercher" />
        <input
          type="text"
          name="search"
          className="rounded-md outline-none text-gray-500 text-[10px] md:text-sm w-20 sm:w-24 md:w-32 lg:w-48 transition-all duration-300 focus:w-24 sm:focus:w-32 md:focus:w-48"
          placeholder="Recherche un lien"
        />
      </div>

      <div className="flex gap-2 items-center">
        <button className="flex items-center bg-linac rounded-md px-2 py-1">
          <img src="/src/assets/images/Plus.svg" alt="Créer" />
          <span className="hidden sm:inline ml-1">Créer un lien</span>
        </button>

        <div className="flex gap-3 sm:px-5 items-center">
          <img
            src="/src/assets/images/Notificatio.svg"
            alt="Notifications"
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
          <div className="flex px-2 py-1 rounded-md items-center gap-1 cursor-pointer">
            <img
              src="/src/assets/images/Profil.svg"
              alt="Profil"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
            <span className="font-semibold hidden sm:block">My account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
