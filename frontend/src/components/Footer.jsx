import {
  FaGithub,
  FaXTwitter,
  FaWhatsapp,
  FaLinkedin,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa6";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f8f8f8] text-gray-800 py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-6 mb-4 text-xl text-blue-600">
          <a
            href="https://github.com/SyedFaisal30"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-blue-800 transition-colors duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://x.com/SyedFaisal30"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="hover:text-blue-800 transition-colors duration-300"
          >
            <FaXTwitter />
          </a>
          <a
            href="https://wa.me/9892996342"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="hover:text-blue-800 transition-colors duration-300"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.linkedin.com/in/SyedFaisal30/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-blue-800 transition-colors duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:sfarz172320@gmail.com"
            aria-label="Email"
            className="hover:text-blue-800 transition-colors duration-300"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://syedfaisal30.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Portfolio"
            className="hover:text-blue-800 transition-colors duration-300"
          >
            <FaGlobe />
          </a>
        </div>

        <div className="text-sm text-center">
          © {currentYear} All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
