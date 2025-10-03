import React from "react";

const Character = ({selectedCharacter, setSelectedCharacter }) => {
  return (
    <>
      {selectedCharacter && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
          onClick={() => setSelectedCharacter(null)}
        >
          <div
            className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl max-w-2xl w-full border-2 border-green-400 overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                className="w-full h-80 object-cover"
              />
              <button
                onClick={() => setSelectedCharacter(null)}
                className="absolute top-4 right-4 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <h2 className="text-4xl font-bold text-green-400">
                {selectedCharacter.name}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Estado</p>
                  <p className="text-white font-semibold text-lg flex items-center gap-2">
                    <span
                      className={`w-3 h-3 rounded-full ${getStatusColor(
                        selectedCharacter.status
                      )}`}
                    ></span>
                    {selectedCharacter.status}
                  </p>
                </div>

                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Especie</p>
                  <p className="text-white font-semibold text-lg">
                    {selectedCharacter.species}
                  </p>
                </div>

                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Género</p>
                  <p className="text-white font-semibold text-lg">
                    {selectedCharacter.gender}
                  </p>
                </div>

                <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Tipo</p>
                  <p className="text-white font-semibold text-lg">
                    {selectedCharacter.type || "N/A"}
                  </p>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Origen</p>
                <p className="text-white font-semibold">
                  {selectedCharacter.origin.name}
                </p>
              </div>

              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">
                  Última ubicación conocida
                </p>
                <p className="text-white font-semibold">
                  {selectedCharacter.location.name}
                </p>
              </div>

              <div className="bg-white bg-opacity-10 p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Episodios</p>
                <p className="text-white font-semibold">
                  {selectedCharacter.episode.length} apariciones
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Character;
