import { Link, Navigate } from "react-router";
import "./App.css";
import { useState } from "react";
import "./App.css";

export function FightArena() {
  const storedDragons = JSON.parse(
    localStorage.getItem("storedDragons") || "[]"
  );

  if (storedDragons.length < 2) {
    return <Navigate to="/" />;
  }

  const healthValues = storedDragons.map(dragon => dragon.health);
  const [dragonsHealth, setDragonsHealth] = useState(healthValues);
  const [turn, setTurn] = useState(0);
  const [criticalDamageIndicator, setCriticalDamageIndicator] = useState(0);

  function handleAttack(e) {
    const buttonType = e.target.dataset.type;

    if ((buttonType === "attack-button1" && turn !== 0) || (buttonType === "attack-button2" && turn !== 1)) {
      return;
    }
    
    if (buttonType === "attack-button1") {
      const criticalChance = Math.random() < 0.25;
      if (criticalChance) {
        const criticalDamage = storedDragons[0].damage * 1.15;
        setCriticalDamageIndicator(criticalDamage.toFixed(0));
      } else {
        setCriticalDamageIndicator(0);
      }
      setDragonsHealth(prevHealth => {
        const newHealth = [...prevHealth];
        newHealth[1] = Math.max(0, newHealth[1] - storedDragons[0].damage);
        setTurn(1);
        return newHealth;
      });
    } else if (buttonType === "attack-button2") {
      const criticalChance = Math.random() < 0.25;
      if (criticalChance) {
        const criticalDamage = storedDragons[1].damage * 1.15;
        setCriticalDamageIndicator(criticalDamage.toFixed(0));
      } else {
        setCriticalDamageIndicator(0);
      }
      setDragonsHealth((prevHealth) => {
        const newHealth = [...prevHealth];
        newHealth[0] = Math.max(0, newHealth[0] - storedDragons[1].damage);
        setTurn(0);
        return newHealth;
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-5xl font-extrabold mb-10 text-cyan-300 drop-shadow-lg tracking-tight text-center uppercase">
        Fight Arena
      </h1>
      <div className="flex flex-row items-center justify-center gap-8 mb-12">
        {/* Left Dragon Card */}
        <div className="flex-1 flex flex-col items-center bg-[#101624] bg-opacity-90 rounded-3xl shadow-2xl border-4 border-cyan-700/60 p-8 mx-2 min-w-[320px] max-w-md relative">
          <h2 className="text-3xl font-extrabold mb-4 text-cyan-200 text-center drop-shadow">
            {storedDragons[0].name}
          </h2>
          <img
            className="h-56 w-56 object-contain rounded-2xl border-4 border-cyan-500 shadow-xl mb-6 bg-[#191127]"
            src={storedDragons[0].src}
            alt={storedDragons[0].name}
          />
          <div className="flex flex-row justify-center gap-4 mb-4 w-full">
            <div className="text-lg text-cyan-100 bg-cyan-900/40 px-4 py-2 rounded-xl shadow-inner font-semibold text-center min-w-[150px] min-h-[50px]">
              Health: {dragonsHealth[0]}
            </div>
            <div className="text-lg text-cyan-100 bg-cyan-900/40 px-4 py-2 rounded-xl shadow-inner font-semibold text-center min-w-[150px] min-h-[50px]">
              Damage: {storedDragons[0].damage}
            </div>
          </div>
          {turn === 0 ? (
            <button
              data-type="attack-button1"
              className="mt-2 px-8 py-3 text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-800 text-white rounded-2xl shadow-lg hover:scale-105 hover:bg-cyan-800 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer border-2 border-cyan-400/40"
              disabled={turn !== 0 || dragonsHealth[0] === 0 || dragonsHealth[1] === 0}
              onClick={(e) => {handleAttack(e);}}
            >
              Attack
            </button>
          ) : (
            <button
              data-type="attack-button1"
              className="mt-2 px-8 py-3 text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-800 text-white rounded-2xl shadow-lg hover:scale-105 hover:bg-cyan-800 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer border-2 border-cyan-400/40 opacity-50"
              disabled={turn !== 0 || dragonsHealth[0] === 0 || dragonsHealth[1] === 0}
              onClick={(e) => {handleAttack(e);}}
            >
              Attack
            </button>
          )}
        </div>
        {/* VS Divider */}
        {dragonsHealth[0] > 1 && dragonsHealth[1] > 1 && (
        <div className="flex flex-col items-center justify-center mx-4">
          <span className="text-6xl font-extrabold text-cyan-400 drop-shadow-glow animate-pulse">
            V
            <span className="text-6xl font-extrabold text-red-400 drop-shadow-glow animate-pulse">
              S
            </span>
          </span>
          {turn === 0 ? <span className="text-4xl font-extrabold text-cyan-400 drop-shadow-glow animate-pulse">Turn: {storedDragons[0].name}</span> : <span className="text-4xl font-extrabold text-pink-400 drop-shadow-glow animate-pulse">Turn: {storedDragons[1].name}</span>}
          {criticalDamageIndicator >= 1 && <span className="text-2xl font-extrabold text-cyan-400 drop-shadow-glow animate-pulse">Critical Damage: {criticalDamageIndicator}</span>}
        </div>
        )}
        {dragonsHealth[0] === 0 || dragonsHealth[1] === 0 && (
          <div className="flex flex-col items-center justify-center mx-4">
            <h1 className="text-4xl font-bold">Winner {dragonsHealth[0] === 0 ? storedDragons[1].name : storedDragons[0].name}</h1>
            <Link to="/">
              <button className="text-4xl font-bold text-cyan-400 drop-shadow-glow animate-pulse" onClick={() => {localStorage.removeItem("storedDragons");}}>
                Play Again
              </button>
            </Link>
          </div>
        )}
        {/* Right Dragon Card */}
        <div className="flex-1 flex flex-col items-center bg-[#101624] bg-opacity-90 rounded-3xl shadow-2xl border-4 border-pink-700/60 p-8 mx-2 min-w-[320px] max-w-md relative">
          <h2 className="text-3xl font-extrabold mb-4 text-pink-200 text-center drop-shadow">
            {storedDragons[1].name}
          </h2>
          <img
            className="h-56 w-56 object-contain rounded-2xl border-4 border-pink-400 shadow-xl mb-6 bg-[#191127]"
            src={storedDragons[1].src}
            alt={storedDragons[1].name}
          />
          <div className="flex flex-row justify-center gap-4 mb-4 w-full">
            <div className="text-lg text-pink-100 bg-pink-900/40 px-4 py-2 rounded-xl shadow-inner font-semibold text-center min-w-[150px] min-h-[50px]">
              Health: {dragonsHealth[1]}
            </div>
            <div className="text-lg text-pink-100 bg-pink-900/40 px-4 py-2 rounded-xl shadow-inner font-semibold text-center min-w-[150px] min-h-[50px]">
              Damage: {storedDragons[1].damage}
            </div>
          </div>
          {turn === 1 ? (
          <button
            data-type="attack-button2"
            className="attackbtn2 mt-2 px-8 py-3 text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-800 text-white rounded-2xl shadow-lg hover:scale-105 hover:bg-pink-800 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer border-2 border-pink-400/40"
            disabled={turn !== 1 || dragonsHealth[0] === 0 || dragonsHealth[1] === 0}
            onClick={(e) => {handleAttack(e);}}
          >
            Attack
          </button>
          ) : (
            <button
              data-type="attack-button2"
              className="attackbtn2 mt-2 px-8 py-3 text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-800 text-white rounded-2xl shadow-lg hover:scale-105 hover:bg-pink-800 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer border-2 border-pink-400/40 opacity-50"
              disabled={turn !== 1 || dragonsHealth[0] === 0 || dragonsHealth[1] === 0}
              onClick={(e) => {handleAttack(e);}}
            >
              Attack
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
