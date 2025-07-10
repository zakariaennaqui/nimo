import { CiFacebook } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";


const Footer = () => {
  return (
    <footer className="relative bg-gray-800">
      {/* Footer content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 text-white p-8 relative z-10">
        <div className="text-left px-2 py-2">
          <h1 className="mb-4 capitalize text-2xl font-bold">RENTERCARS</h1>
          <p>Rabat, Morocco</p>
          <p>+212662255458</p>
          <p>example@gmail.com</p>
        </div>
        <div className="text-left px-2 py-2">
          <h1 className="mb-4 capitalize text-2xl font-bold">our products</h1>
          <ul>
            <li>Career</li>
            <li>Car</li>
            <li>packages</li>
            <li>Features</li>
            <li>Priceline</li>
          </ul>
        </div>
        <div className="text-left px-2 py-2 capitalize">
          <h1 className="mb-4 text-2xl font-bold">resources</h1>
          <ul>
            <li>download</li>
            <li>help center</li>
            <li>Guides</li>
            <li>partner network</li>
            <li>Cruises</li>
            <li>developer</li>
          </ul>
        </div>
        <div className="text-left px-2 py-2 capitalize">
          <h1 className="mb-4 capitalize text-2xl font-bold">about Rentercars</h1>
          <ul>
            <li>why chose us</li>
            <li>our story</li>
            <li>Guides</li>
            <li>investor relations</li>
            <li>press center</li>
            <li>advertise</li>
          </ul>
        </div>
        <div className="text-left px-2 py-2 capitalize">
          <h1 className="mb-4 text-2xl font-bold">Follow us</h1>
          <ul className="flex gap-4 text-2xl">
            <li><CiFacebook /></li>
            <li><IoLogoInstagram /></li>
            <li><FaLinkedinIn /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;