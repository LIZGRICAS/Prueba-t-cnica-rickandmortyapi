import React from "react";

const Header = () => {
  return (
    <header className="bg-black bg-opacity-50 backdrop-blur-md border-b border-green-400 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-5xl font-bold text-center text-green-400 font-mono animate-pulse">
          RICK AND MORTY
        </h1>
        <p className="text-center text-gray-300 mt-2">
          Explora el multiverso de personajes
        </p>
      </div>
    </header>
  );
};

export default Header;
