const SideBar = () => {
  return (
    <div className="w-[25%] bg-Indigolight text-white h-screen px-4 flex flex-col gap-5">
      <img
        src="/src/assets/images/logo.png"
        alt="Logo"
        className="w-24 sm:w-28 md:w-32 lg:w-40 relative -left-7"
      />
      <div className="flex flex-col gap-10">
        <ul className=" text-white  ml-3 flex flex-col gap-3">
          <li className= "flex items-center gap-4 "> <img src="/src/assets/images/Dashbord.svg" alt="" />  Dashboard</li>
          <li className="flex items-center gap-4"> <img src="/src/assets/images/Links.svg" alt="" /> Links</li>
          <li className="flex items-center gap-4"> <img src="/src/assets/images/Analitics.svg" alt="" /> Analytics</li>
          <li className="flex items-center gap-4"><img src="/src/assets/images/Globe.svg" alt="" /> Domains</li>
        </ul>

        <ul className=" text-white  ml-3 flex flex-col gap-3">
          <li className="flex items-center gap-4"> <img src="/src/assets/images/Support.svg" alt="" /> Support</li>
          <li className="flex items-center gap-4"> <img src="/src/assets/images/Setting.svg" alt="" /> Settings</li>
        </ul>
      </div>


    </div>
  );
};

export default SideBar;
