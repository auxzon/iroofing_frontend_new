// import men from "../../RatesDashboard/assets/icons/men.png";

// const Header = () => {
//   return (
//     <div className="bg-white h-24 flex justify-between items-center px-5 md:px-10 shadow-lg ">
//       <div>
//         <button className="text-white text-2xl md:hidden" onClick={""}>
//           ☰
//         </button>
//       </div>
//       {/* Hamburger menu for mobile */}

//       <div className="flex items-end">
//         <img src={men} alt="Profile" className="w-6 cursor-pointer" />
//       </div>
//     </div>
//   );
// };

// export default Header;

import { useState } from "react";
import men from "../assets/icons/men.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="bg-white flex justify-between items-center px-8 h-24   top-0 left-0 right-0 relative z-50 ">
      {/* Hamburger menu button */}
      <div>
        <button className="text-black text-5xl md:hidden" onClick={toggleMenu}>
          ☰
        </button>
      </div>

      {/* Links for mobile view */}
      {isMenuOpen && (
        <div className="absolute top-24 left-0 w-full bg-gray-100 flex flex-col items-center space-y-4 py-4 md:hidden shadow-lg">
          <a href="/materials" className="text-black text-lg">
            Dashboard
          </a>
          <a href="/thicknessrate" className="text-black text-lg">
            Thicknessrate
          </a>
          <a href="/transportation" className="text-black text-lg">
            Transportation
          </a>
          <a href="/ratesettings" className="text-black text-lg">
            Settings
          </a>
        </div>
      )}

      {/* Profile icon */}
      <div className="flex items-end">
        <img src={men} alt="Profile" className="w-6 cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
