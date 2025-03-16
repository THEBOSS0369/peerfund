// src/app/layout.js
import "../styles/globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>P2P Emergency Fund</title>
      </head>
      <body className="bg-gray-900 text-gray-200 font-sans antialiased">
        <div className="fixed inset-0 bg-gradient-radial from-blue-900/20 to-gray-900 z-[-1]"></div>
        <div className="fixed inset-0 bg-[url('/noise.png')] opacity-5 z-[-1]"></div>
        
        <header className="border-b border-gray-800 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-md">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                P2P Emergency Fund
              </h1>
            </div>
            <nav>
              <ul className="flex space-x-6">
                <li><a href="#" className="text-gray-300 hover:text-white transition">Home</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">Campaigns</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition">About</a></li>
              </ul>
            </nav>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">{children}</main>
        
        <footer className="border-t border-gray-800 bg-gray-900 bg-opacity-80 backdrop-blur-md mt-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    P2P Emergency Fund
                  </h2>
                </div>
                <p className="text-gray-400">Peer-to-peer financial support for emergencies</p>
              </div>
              <div className="flex flex-col items-center md:items-end">
                <p className="text-gray-400">© 2025 P2P Emergency Fund</p>
                <p className="text-gray-500 text-sm">Powered by Ethereum</p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}