import { useState, useEffect } from "react";
import "./App.css";
import { DragonModal } from "./DragonModal";
import { useNavigate } from "react-router";

export function SelectDragons() {
  const dragons = [
    {
      name: "Chaos",
      src: "chaos.webp",
      weakness: "Sea",
      damage: 30,
      health: 180,
    },
    {
      name: "Dark",
      src: "dark.webp",
      weakness: "Happy",
      damage: 20,
      health: 200,
    },
    {
      name: "Electric",
      src: "electric.webp",
      weakness: "Soul",
      damage: 25,
      health: 160,
    },
    {
      name: "Forest",
      src: "forest.webp",
      weakness: "Magic",
      damage: 22,
      health: 185,
    },
    {
      name: "Happy",
      src: "happy.webp",
      weakness: "Wind",
      damage: 21,
      health: 190,
    },
    {
      name: "Ice",
      src: "ice.webp",
      weakness: "Chaos",
      damage: 33,
      health: 170,
    },
    {
      name: "Magic",
      src: "magic.webp",
      weakness: "Dark",
      damage: 22,
      health: 165,
    },
    {
      name: "Sea",
      src: "sea.webp",
      weakness: "Ice",
      damage: 23,
      health: 240,
    },
    {
      name: "Soul",
      src: "soul.webp",
      weakness: "Forest",
      damage: 24,
      health: 230,
    },
    {
      name: "Wind",
      src: "wind.webp",
      weakness: "Electric",
      damage: 25,
      health: 215,
    },
  ];

  const [clickedDragon, setClickedDragon] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedDragons, setSelectedDragons] = useState([]);
  const [infoMessage, setInfoMessage] = useState(
    "Select 2 Dragons to start the game!"
  );

  const navigate = useNavigate();

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
    setSelectedDragons([]);
    setInfoMessage("Select 2 Dragons to start the game!");
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
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
            {/* Clear localstorage btn and weakness info message */}
            <div className="flex items-center justify-center flex-col">
              <p className="text-blue-100 text-center m-4 font-bold">
                Every Dragon has a weakness. They receive 20% more damage from
                their weakness dragon.
              </p>
              {selectedDragons.length >= 2 && (
                <div className="flex items-center justify-center">
                  <button
                    onClick={() => navigate("/fight")}
                    className="mt-2 mr-4 mb-4 btn-primary"
                  >
                    Go to Fight Arena
                  </button>
                  <button
                    onClick={clearLocalStorage}
                    className="mt-2 mb-4 btn-primary"
                  >
                    Clear Selection
                  </button>
                </div>
              )}
            </div>
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
