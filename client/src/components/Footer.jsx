import { FaFacebookF, FaTwitter, FaYoutube, FaTiktok, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Address */}
          <div>
            <h4 className="text-lg font-semibold mb-4">ठेगाना</h4>
            <address className="not-italic text-gray-300">
              <p>लेकसाइड, ६ पोखरा, नेपाल</p>
              <p>फोन: +९७७-९८५६०३५२८९</p>
              <p>इमेल: sevenlakemedia@gmail.com</p>
            </address>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">सम्पर्क </h4>
            <div className="text-gray-300 space-y-2">
              <p>फोन १: +९७७-९८५६०३५२८९</p>
              <p>फोन २: +९७७-९७४६४३५८४८</p>
              <p>फोन ३: +९७७-९८०६७३९०७२</p>
            </div>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">सामाजिक सञ्जाल</h4>
            <ul className="flex space-x-6">
              <li>
                <a
                  href="https://www.facebook.com/share/1MF8EMTpHm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white text-2xl"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/KishanT39511380?t=8YU45urmXn1HbnKuTBDwwQ&s=08"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white text-2xl"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/mero_podcast?igsh=MWJ2ZW56ZGV3NWNkYg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white text-2xl"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@meropodcast?_t=ZS-8yD3e4kZcuN&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white text-2xl"
                  aria-label="TikTok"
                >
                  <FaTiktok />
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@meropodcast-7?si=nogbfcMY0AVxvElW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white text-2xl"
                  aria-label="YouTube 1"
                >
                  <FaYoutube />
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@kishanthapa448?si=u6MBd4BuKo7-TOmF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white text-2xl"
                  aria-label="YouTube 2"
                >
                  <FaYoutube />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Optional blank column */}
          <div></div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
          <p>&copy; 2025 News Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
