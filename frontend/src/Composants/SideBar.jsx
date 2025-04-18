import { FaQrcode } from "react-icons/fa";
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
                ? "bg-Whites text-Blacks "
                : "text-Whites hover:bg-Whites hover:text-Blacks active:bg-Whites"
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
            to="qrcodes"
            className={`flex items-center gap-4 hover:bg-Whites cursor-pointer rounded-lg py-2 md:px-1 px-0 ${
              activeTab === "qrcodes"
                ? "bg-Whites text-Blacks"
                : "text-Whites hover:bg-Whites hover:text-Blacks"
            }`}
          >
            <FaQrcode />
            <span className="hidden md:block">QR Codes</span>
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
              <path d="M12 2C6.486 2 2 6.486 2 12v4.143C2 17.167 2.897 18 4 18h1a1 1 0 0 0 1-1v-5.143a1 1 0 0 0-1-1h-.908C4.648 6.987 7.978 4 12 4s7.352 2.987 7.908 6.857H19a1 1 0 0 0-1 1V18c0 1.103-.897 2-2 2h-2v-1h-4v3h6c2.206 0 4-1.794 4-4 1.103 0 2-.833 2-1.857V12c0-5.514-4.486-10-10-10z"></path>
            </svg>
            <span className="hidden md:block">Support</span>
          </Link>

          <Link
            to="settings"
            className={`flex items-center gap-4 hover:bg-Whites hover:text-Blacks cursor-pointer rounded-lg py-2  md:pr-14 md:px-1 px-0 ${
              activeTab === "domains"
                ? "bg-Whites text-Blacks"
                : "text-Whites hover:bg-Whites hover:text-Blacks"
            }`}
            onClick={() => onTabChange("settings")}
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
              <path d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"></path>
              <path d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z"></path>
            </svg>{" "}
            <span className="hidden md:block">Settings</span>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
