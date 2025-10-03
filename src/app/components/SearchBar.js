import React from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  User,
  MapPin,
  Heart,
  Activity,
} from "lucide-react";

function SearchBar({
  searchTerm,
  handleSearch,
  handleGenderFilter,
  genderFilter,
  handleStatusFilter,
  statusFilter,
  characters,
  loading,
  currentPage,
  totalPages,
  goToPage,
  setSelectedCharacter,
  getStatusColor,
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar personajes..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 backdrop-blur-md border border-green-400 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-green-400 mb-2 font-semibold">
              Estado
            </label>
            <div className="flex flex-wrap gap-2 text-black">
              {["Alive", "Dead", "unknown"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    statusFilter === status
                      ? "bg-green-400 text-black scale-105"
                      : "bg-white bg-opacity-10 text-gray-100 hover:bg-opacity-20"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-green-400 mb-2 font-semibold">
              Género
            </label>
            <div className="flex flex-wrap gap-2">
              {["Male", "Female", "unknown"].map((gender) => (
                <button
                  key={gender}
                  onClick={() => handleGenderFilter(gender)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    genderFilter === gender
                      ? "bg-green-400 text-black scale-105"
                      : "bg-white bg-opacity-10 text-white hover:bg-opacity-20"
                  }`}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || statusFilter || genderFilter) && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-gray-300 text-sm">Filtros activos:</span>
            {searchTerm && (
              <span className="bg-green-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                Búsqueda: "{searchTerm}"
              </span>
            )}
            {statusFilter && (
              <span className="bg-green-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                Estado: {statusFilter}
              </span>
            )}
            {genderFilter && (
              <span className="bg-green-400 text-black px-3 py-1 rounded-full text-sm font-semibold">
                Género: {genderFilter}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-400"></div>
        </div>
      )}

      {/* Characters Grid */}
      {!loading && characters.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {characters.map((character) => (
              <div
                key={character.id}
                onClick={() => setSelectedCharacter(character)}
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl overflow-hidden border border-green-400 hover:border-green-300 transform hover:scale-105 transition-all duration-300 cursor-pointer group"
              >
                <div className="relative">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div
                    className={`absolute top-3 right-3 w-4 h-4 rounded-full ${getStatusColor(
                      character.status
                    )} animate-pulse`}
                  ></div>
                </div>

                <div className="p-4">
                  <h3 className="text-xl font-bold text-white mb-2 truncate">
                    {character.name}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Activity size={16} className="text-green-400" />
                      <span className="text-sm">
                        {character.status} - {character.species}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin size={16} className="text-green-400" />
                      <span className="text-sm truncate">
                        {character.location.name}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pb-8">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-green-400 text-black font-bold rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-green-300 transition-all flex items-center gap-2 w-full sm:w-auto"
            >
              <ChevronLeft size={20} />
              Anterior
            </button>

            <div className="flex items-center gap-2 flex-wrap justify-center">
              {/* First Page */}
              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => goToPage(1)}
                    className="w-10 h-10 bg-white bg-opacity-10 text-white rounded-lg hover:bg-opacity-20 transition-all font-semibold"
                  >
                    1
                  </button>
                  {currentPage > 4 && <span className="text-white">...</span>}
                </>
              )}

              {/* Pages around current */}
              {Array.from({ length: 5 }, (_, i) => currentPage - 2 + i)
                .filter((page) => page > 0 && page <= totalPages)
                .map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                      page === currentPage
                        ? "bg-green-400 text-black scale-110"
                        : "bg-white bg-opacity-10 text-white hover:bg-opacity-20"
                    }`}
                  >
                    {page}
                  </button>
                ))}

              {/* Last Page */}
              {currentPage < totalPages - 2 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <span className="text-white">...</span>
                  )}
                  <button
                    onClick={() => goToPage(totalPages)}
                    className="w-10 h-10 bg-white bg-opacity-10 text-white rounded-lg hover:bg-opacity-20 transition-all font-semibold"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-6 py-3 bg-green-400 text-black font-bold rounded-lg disabled:opacity-30 disabled:cursor-not-allowed hover:bg-green-300 transition-all flex items-center gap-2 w-full sm:w-auto"
            >
              Siguiente
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Page Info */}
          <div className="text-center text-gray-300 pb-4">
            Página {currentPage} de {totalPages}
          </div>
        </>
      )}

      {/* No Results */}
      {!loading && characters.length === 0 && (
        <div className="text-center py-20">
          <p className="text-2xl text-gray-400">No se encontraron personajes</p>
          <p className="text-gray-500 mt-2">Intenta con otros filtros</p>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
