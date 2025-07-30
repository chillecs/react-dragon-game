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
      abilities: [
        {
          name: "Chaos Storm",
          description: "Deals 1.5x damage but has 30% chance to miss",
          damageMultiplier: 1.5,
          missChance: 0.3,
        },
        {
          name: "Reality Warp",
          description: "Reduces opponent's damage by 25% for next 2 turns",
          effect: "reduceOpponentDamage",
          value: 0.25,
          duration: 2,
        },
      ],
    },
    {
      name: "Dark",
      src: "dark.webp",
      weakness: "Happy",
      damage: 20,
      health: 200,
      abilities: [
        {
          name: "Shadow Mark",
          description:
            "Deals 1.3x damage and has 35% chance to inflict Shadow Mark (takes 15% more damage for 2 turns)",
          damageMultiplier: 1.3,
          shadowMarkChance: 0.35,
        },
        {
          name: "Void Shield",
          description: "Absorbs 50% of incoming damage for 1 turn",
          effect: "absorbDamage",
          value: 0.5,
          duration: 1,
        },
      ],
    },
    {
      name: "Electric",
      src: "electric.webp",
      weakness: "Soul",
      damage: 25,
      health: 160,
      abilities: [
        {
          name: "Lightning Bolt",
          description: "Deals 1.4x damage and has 15% to attack again",
          damageMultiplier: 1.4,
          attackAgainChance: 0.15,
        },
        {
          name: "Static Field",
          description: "Reflects 15% of damage back to attacker for 1 turn",
          effect: "reflectDamage",
          value: 0.15,
          duration: 1,
        },
      ],
    },
    {
      name: "Forest",
      src: "forest.webp",
      weakness: "Magic",
      damage: 22,
      health: 185,
      abilities: [
        {
          name: "Nature's Wrath",
          description:
            "Deals 1.2x damage and heals self for 15% of damage dealt",
          damageMultiplier: 1.2,
          healPercent: 0.15,
        },
        {
          name: "Entangle",
          description:
            "Reduces opponent's damage by 20% and has 35% chance to attack again",
          effect: "reduceOpponentDamage",
          value: 0.2,
          attackAgainChance: 0.35,
        },
      ],
    },
    {
      name: "Happy",
      src: "happy.webp",
      weakness: "Wind",
      damage: 21,
      health: 190,
      abilities: [
        {
          name: "Joy Burst",
          description:
            "Deals 1.3x damage and increases own damage by 15% for next turn",
          damageMultiplier: 1.3,
          selfDamageBoost: 0.15,
          duration: 1,
        },
        {
          name: "Positive Aura",
          description:
            "Heals self for 20% of max health and removes negative effects",
          healPercent: 0.2,
          effect: "removeNegativeEffects",
        },
      ],
    },
    {
      name: "Ice",
      src: "ice.webp",
      weakness: "Chaos",
      damage: 33,
      health: 170,
      abilities: [
        {
          name: "Frost Nova",
          description: "Deals 1.4x damage and has 40% chance to freeze",
          damageMultiplier: 1.4,
          freezeChance: 0.4,
        },
        {
          name: "Ice Armor",
          description: "Reduces incoming damage by 40% for 2 turns",
          effect: "reduceIncomingDamage",
          value: 0.4,
          duration: 2,
        },
      ],
    },
    {
      name: "Magic",
      src: "magic.webp",
      weakness: "Dark",
      damage: 22,
      health: 165,
      abilities: [
        {
          name: "Arcane Blast",
          description: "Deals 1.5x damage and has 30% chance to silence",
          damageMultiplier: 1.5,
          silenceChance: 0.3,
        },
        {
          name: "Mana Shield",
          description: "Converts 60% of incoming damage to health for 1 turn",
          effect: "convertDamageToHealth",
          value: 0.6,
          duration: 1,
        },
      ],
    },
    {
      name: "Sea",
      src: "sea.webp",
      weakness: "Ice",
      damage: 23,
      health: 240,
      abilities: [
        {
          name: "Tsunami Wave",
          description: "Deals 1.3x damage and has 25% chance to knockback",
          damageMultiplier: 1.3,
          knockbackChance: 0.25,
        },
        {
          name: "Ocean's Blessing",
          description:
            "Heals self for 25% of max health and increases damage by 20% for 2 turns",
          healPercent: 0.25,
          selfDamageBoost: 0.2,
          duration: 2,
        },
      ],
    },
    {
      name: "Soul",
      src: "soul.webp",
      weakness: "Forest",
      damage: 24,
      health: 230,
      abilities: [
        {
          name: "Soul Drain",
          description: "Deals 1.2x damage and steals 20% of opponent's health",
          damageMultiplier: 1.2,
          stealHealthPercent: 0.2,
        },
        {
          name: "Spirit Link",
          description: "Shares damage with opponent for 2 turns",
          effect: "shareDamage",
          duration: 2,
        },
      ],
    },
    {
      name: "Wind",
      src: "wind.webp",
      weakness: "Electric",
      damage: 25,
      health: 215,
      abilities: [
        {
          name: "Gale Force",
          description:
            "Deals 1.4x damage and has 35% chance to dodge next attack",
          damageMultiplier: 1.4,
          dodgeChance: 0.35,
        },
        {
          name: "Wind Barrier",
          description:
            "Completely blocks next attack and reflects 50% of damage back",
          effect: "blockNextAttack",
          reflectPercent: 0.5,
        },
      ],
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
