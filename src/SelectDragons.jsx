import { useState, useEffect } from "react";
import "./App.css";
import { DragonModal } from "./DragonModal";
import { useNavigate } from "react-router";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function SelectDragons() {
  const dragons = [
    {
      name: "Chaos",
      src: "chaos.webp",
      weakness: "Sea",
      damage: 30,
      health: 100,
    },
    {
      name: "Dark",
      src: "dark.webp",
      weakness: "Happy",
      damage: 20,
      health: 100,
    },
    {
      name: "Electric",
      src: "electric.webp",
      weakness: "Soul",
      damage: 25,
      health: 100,
    },
    {
      name: "Forest",
      src: "forest.webp",
      weakness: "Magic",
      damage: 22,
      health: 100,
    },
    {
      name: "Happy",
      src: "happy.webp",
      weakness: "Wind",
      damage: 21,
      health: 100,
    },
    {
      name: "Ice",
      src: "ice.webp",
      weakness: "Chaos",
      damage: 33,
      health: 100,
    },
    {
      name: "Magic",
      src: "magic.webp",
      weakness: "Dark",
      damage: 22,
      health: 100,
    },
    {
      name: "Sea",
      src: "sea.webp",
      weakness: "Ice",
      damage: 23,
      health: 100,
    },
    {
      name: "Soul",
      src: "soul.webp",
      weakness: "Forest",
      damage: 24,
      health: 100,
    },
    {
      name: "Wind",
      src: "wind.webp",
      weakness: "Electric",
      damage: 25,
      health: 100,
    },
  ];

  const [clickedDragon, setClickedDragon] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedDragons, setSelectedDragons] = useState([]);
  const [infoMessage, setInfoMessage] = useState(
    "Select 2 Dragons to start the game!"
  );

  const navigate = useNavigate();

  // On mount, load selectedDragons from localStorage if present
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("storedDragons") || "[]");
    if (stored.length > 0) {
      setSelectedDragons(stored);
    }
  }, []);

  const toggleModal = (drag) => {
    setClickedDragon(drag);
    setModal(!modal);
  };

  function clearLocalStorage() {
    localStorage.removeItem("storedDragons");
    console.log(localStorage.getItem("storedDragons"));
    setSelectedDragons([]);
    setInfoMessage("Select 2 Dragons to start the game!");
  }

  return (
    <>
      <div className="min-h-screen w-full bg-[#030712] flex flex-col items-center justify-center p-4">
        {/* Only show the main title if no dragons are selected */}
        {selectedDragons.length === 0 && (
          <h1 className="text-5xl font-extrabold text-center text-blue-100 drop-shadow-lg mb-10 mt-8 tracking-tight">
            {infoMessage}
          </h1>
        )}
        {selectedDragons.length > 0 && (
          <div className="text-blue-100 text-center font-bold mb-4 text-5xl">
            {`Selected Dragon(s): ${selectedDragons
              .map((d) => d.name)
              .join(" & ")}`}
          </div>
        )}
        <div className="flex justify-center items-center w-full">
          <div className="p-2 bg-gradient-to-br from-blue-900/60 via-slate-800/40 to-black/80 rounded-3xl shadow-2xl border-2 border-blue-900/30 w-full max-w-6xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 bg-[#101624]/80 rounded-2xl p-8">
              {dragons.map((drag) => (
                <div key={drag.name} className="flex flex-col items-center">
                  <img
                    src={drag.src}
                    alt={drag.alt}
                    data-dragon={drag.name}
                    className="h-44 w-44 sm:h-48 sm:w-48 p-2 cursor-pointer rounded-3xl transition-transform duration-200 hover:-translate-y-3 hover:scale-105 bg-gradient-to-br from-blue-900/30 via-slate-800/10 to-black/20 shadow-lg border-2 border-blue-900/30"
                    onClick={() => toggleModal(drag)}
                  />
                  <span className="mt-2 text-lg font-semibold text-blue-100 drop-shadow-sm">
                    {drag.name}
                  </span>
                </div>
              ))}
            </div>
            {/* Clear selection btn and weakness info message */}
            <div className="flex items-center justify-center flex-col">
              <p className="text-blue-100 text-center m-4 font-bold">
                Every Dragon has a weakness. They receive 20% more damage from
                their weakness dragon.
              </p>
              {selectedDragons.length >= 2 && (
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => navigate("/fight")}
                    className="mt-2 mb-4 px-6 py-2 text-lg font-semibold bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-2xl shadow-md hover:scale-105 hover:bg-blue-800 transition-all duration-150 focus:outline-none hover:ring-2 hover:ring-blue-400 cursor-pointer"
                  >
                    Go to Fight Arena
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={clearLocalStorage}
              className="absolute left-1/2 -translate-x-1/2 mt-6 px-6 py-2 text-lg font-semibold bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-2xl shadow-md hover:scale-105 hover:bg-blue-800 transition-all duration-150 focus:outline-none hover:ring-2 hover:ring-blue-400 cursor-pointer"
            >
              Clear Selection
            </button>
          </div>
        </div>
        <DragonModal
          modal={modal}
          setModal={setModal}
          clickedDragon={clickedDragon}
          setSelectedDragons={setSelectedDragons}
        />
      </div>
    </>
  );
}
