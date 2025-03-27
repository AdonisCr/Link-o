const NavBar = () => {
  return (
    <div className=" w-full bg-Indigolight  py-4 text-white border-l-2 px-2 flex items-center justify-between">
      <h2 className="font-semibold text-xl"> Bienvenue </h2>
      <div className="flex gap-2">
        <button className=" flex  items-center bg-linac rounded-md px-2 py-1 ">
          {" "}
          <img src="/src/assets/images/Plus.svg" alt="" /> Creé un lien{" "}
        </button>
        <div className="flex bg-white px-2 py-1 rounded-md items-center gap-1 ">
          <img src="/src/assets/images/Search.svg" alt="" />
          <input
            type="text"
            name=""
            className="rounded-md outline-none text-gray-500 text-sm "
            placeholder="Recherche un lien"
            id=""
          />
        </div>
        <div className="flex gap-3 px-5">
          <img src="/src/assets/images/Notificatio.svg" alt="" />

          <img src="/src/assets/images/Profil.svg" alt="" />
        </div>
      </div>
    </div>
  );
};
export default NavBar;
