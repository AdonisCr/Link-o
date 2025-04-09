import { Link } from "react-router-dom";

const SideBar = ({ activeTab, onTabChange }) => {
  return (
    <div
      className="w-auto hidden sticky top-0 md:w-48 lg:w-[18%] bg-Blacks text-white h-screen px-4 lg:flex flex-col gap-5"
      style={{ fontFamily: "Winky Sans, sans-serif" }}
    >
      <img
        src="/src/assets/images/logo.png"
        alt="Logo"
        className="hidden md:block w-24 mt-2 sm:w-28 md:w-32 lg:w-40 relative -left-7"
      />

      <div className="flex flex-col gap-5 items-center md:items-start justify-center w-full">
        <ul className="text-white flex flex-col gap-2 font-semibold">
          <Link
            to="/dashboard"
            className={`flex items-center gap-4 cursor-pointer rounded-lg py-2 md:pr-10 md:px-1 px-0 ${
              activeTab === "dashboard"
                ? "bg-Whites text-Blacks"
                : "text-Whites hover:bg-Whites hover:text-Blacks"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{
                fill: "currentColor",
                transition: "fill 0.3s ease",
              }}
              className="pointer-events-none"
            >
              <path d="M5 22h14a2 2 0 0 0 2-2v-9a1 1 0 0 0-.29-.71l-8-8a1 1 0 0 0-1.41 0l-8 8A1 1 0 0 0 3 11v9a2 2 0 0 0 2 2zm5-2v-5h4v5zm-5-8.59 7-7 7 7V20h-3v-5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v5H5z" />
            </svg>
            <span className="hidden md:block">Dashboard</span>
          </Link>

          <Link
            to="links"
            className={`flex items-center gap-4 hover:bg-Whites hover:text-Blacks cursor-pointer rounded-lg py-2 md:px-1 px-0 ${
              activeTab === "links"
                ? "bg-Whites text-Blacks"
                : "text-Whites hover:bg-Whites hover:text-Blacks"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{
                fill: "currentColor",
                transition: "fill 0.3s ease",
              }}
              className="pointer-events-none"
            >
              <path d="M8.465 11.293c1.133-1.133 3.109-1.133 4.242 0l.707.707 1.414-1.414-.707-.707c-.943-.944-2.199-1.465-3.535-1.465s-2.592.521-3.535 1.465L4.929 12a5.008 5.008 0 0 0 0 7.071 4.983 4.983 0 0 0 3.535 1.462A4.982 4.982 0 0 0 12 19.071l.707-.707-1.414-1.414-.707.707a3.007 3.007 0 0 1-4.243 0 3.005 3.005 0 0 1 0-4.243l2.122-2.121z"></path>
              <path d="m12 4.929-.707.707 1.414 1.414.707-.707a3.007 3.007 0 0 1 4.243 0 3.005 3.005 0 0 1 0 4.243l-2.122 2.121c-1.133 1.133-3.109 1.133-4.242 0L10.586 12l-1.414 1.414.707.707c.943.944 2.199 1.465 3.535 1.465s2.592-.521 3.535-1.465L19.071 12a5.008 5.008 0 0 0 0-7.071 5.006 5.006 0 0 0-7.071 0z"></path>
            </svg>

            <span className="hidden md:block">Links</span>
          </Link>

          <Link
            to="domains"
            className={`flex items-center gap-4 hover:bg-Whites cursor-pointer rounded-lg py-2 md:px-1 px-0 ${
              activeTab === "domains"
                ? "bg-Whites text-Blacks"
                : "text-Whites hover:bg-Whites hover:text-Blacks"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{
                fill: "currentColor",
                transition: "fill 0.3s ease",
              }}
              className="pointer-events-none"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z"></path>
            </svg>

            {/* <img src="/src/assets/images/Globe.svg" alt="" /> */}
            <span className="hidden md:block">Domains</span>
          </Link>
        </ul>

        <ul className="text-white flex flex-col gap-2 font-semibold">
          <Link
            to="support"
            className={`flex items-center gap-4 hover:bg-Whites hover:text-Blacks cursor-pointer rounded-lg py-2 md:px-1 px-0 ${
              activeTab === "domains"
              ? "bg-Whites text-Blacks"
              : "text-Whites hover:bg-Whites hover:text-Blacks"
            }`}
          >
            <img src="/src/assets/images/Support.svg" alt="" />
            <span className="hidden md:block">Support</span>
          </Link>

          <Link
            to="settings"
            className={`flex items-center gap-4 hover:bg-Whites hover:text-Blacks cursor-pointer rounded-lg py-2 md:px-1 px-0 ${
              activeTab === "domains"
                ? "bg-Whites text-Blacks"
                : "text-Whites hover:bg-Whites hover:text-Blacks"
            }`}
            onClick={() => onTabChange("settings")}
          >
            <img src="/src/assets/images/Setting.svg" alt="" />
            <span className="hidden md:block">Settings</span>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
