"use client";
import React, { useState, useEffect } from "react";
import Header from "./layouts/header";
import SearchBar from "./components/SearchBar";
import Character from "./components/Character";

const RickAndMortyApp = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", currentPage);
    if (searchTerm) params.set("search", searchTerm);
    if (statusFilter) params.set("status", statusFilter);
    if (genderFilter) params.set("gender", genderFilter);

    const newUrl = `${window.location.pathname}${
      params.toString() ? "?" + params.toString() : ""
    }`;
    window.history.pushState({}, "", newUrl);
  }, [currentPage, searchTerm, statusFilter, genderFilter]);

  // Load from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get("page") || "1");
    const search = params.get("search") || "";
    const status = params.get("status") || "";
    const gender = params.get("gender") || "";

    setCurrentPage(page);
    setSearchTerm(search);
    setStatusFilter(status);
    setGenderFilter(gender);
  }, []);

  useEffect(() => {
    fetchCharacters();
  }, [currentPage, searchTerm, statusFilter, genderFilter]);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      let url = `https://rickandmortyapi.com/api/character/?page=${currentPage}`;

      if (searchTerm) url += `&name=${searchTerm}`;
      if (statusFilter) url += `&status=${statusFilter}`;
      if (genderFilter) url += `&gender=${genderFilter}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.results) {
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } else {
        setCharacters([]);
      }
    } catch (error) {
      console.error("Error fetching characters:", error);
      setCharacters([]);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status === statusFilter ? "" : status);
    setCurrentPage(1);
  };

  const handleGenderFilter = (gender) => {
    setGenderFilter(gender === genderFilter ? "" : gender);
    setCurrentPage(1);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "bg-green-500";
      case "dead":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}

      <Header />
      <SearchBar
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        handleGenderFilter={handleGenderFilter}
        statusFilter={statusFilter}
        genderFilter={genderFilter}
        handleStatusFilter={handleStatusFilter}
        characters={characters}
        loading={loading}
        currentPage={currentPage}
        totalPages={totalPages}
        goToPage={goToPage}
        setSelectedCharacter={setSelectedCharacter}
        getStatusColor ={getStatusColor}
      />

      
      <Character selectedCharacter={selectedCharacter} setSelectedCharacter={setSelectedCharacter}/>
      {/* Character Detail Modal */}
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

      <style jsx>{`
        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RickAndMortyApp;
