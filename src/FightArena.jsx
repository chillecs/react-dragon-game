import { Link, Navigate } from 'react-router';
import "./App.css"
import { useEffect } from 'react';

export function FightArena() {
    const storedDragons = JSON.parse(localStorage.getItem('storedDragons') || '[]');
    console.log(storedDragons);
    if (storedDragons.length < 2) {
        return <Navigate to="/" />;
    }

    function handleGoBack() {
        localStorage.removeItem('storedDragons');
    }

    // Calculate weakness damage for each dragon
    const leftDrag = storedDragons[0].damage;
    const rightDrag = storedDragons[1].damage;
    const leftBonus = storedDragons[1].weakness === storedDragons[0].name ? (leftDrag * 1.2) : null;
    const rightBonus = storedDragons[0].weakness === storedDragons[1].name ? (rightDrag * 1.2) : null;

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0f1a] via-[#101624] to-[#1a2233] p-6">
            <h1 className="text-5xl font-extrabold mb-10 text-cyan-300 drop-shadow-lg tracking-tight text-center uppercase">Fight Arena</h1>
            <div className="flex flex-row items-center justify-center w-full max-w-5xl gap-8 mb-12">
                {/* Left Dragon Card */}
                <div className="flex-1 flex flex-col items-center bg-[#101624] bg-opacity-90 rounded-3xl shadow-2xl border-4 border-cyan-700/60 p-8 mx-2 min-w-[320px] max-w-md relative">
                    <h2 className="text-3xl font-extrabold mb-4 text-cyan-200 text-center drop-shadow">{storedDragons[0].name}</h2>
                    <img className="h-56 w-56 object-contain rounded-2xl border-4 border-cyan-500 shadow-xl mb-6 bg-[#191127]" src={storedDragons[0].src} alt={storedDragons[0].name} />
                    <div className="flex flex-row justify-center gap-4 mb-4 w-full">
                        <div className="text-lg text-cyan-100 bg-cyan-900/40 px-4 py-2 rounded-xl shadow-inner font-semibold text-center min-w-[100px]">Health: {storedDragons[0].health}</div>
                        <div className="text-lg text-cyan-100 bg-cyan-900/40 px-4 py-2 rounded-xl shadow-inner font-semibold text-center min-w-[100px]">
                          Damage:{` ${leftBonus ? leftBonus.toFixed(1) : leftDrag}`}
                        </div>
                    </div>
                    <button className="mt-2 px-8 py-3 text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-800 text-white rounded-2xl shadow-lg hover:scale-105 hover:bg-cyan-800 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer border-2 border-cyan-400/40" >Attack</button>
                </div>
                {/* VS Divider */}
                <div className="flex flex-col items-center justify-center mx-4">
                    <span className="text-6xl font-extrabold text-cyan-400 drop-shadow-glow animate-pulse">V<span className="text-6xl font-extrabold text-red-400 drop-shadow-glow animate-pulse">S</span></span>
                </div>
                {/* Right Dragon Card */}
                <div className="flex-1 flex flex-col items-center bg-[#101624] bg-opacity-90 rounded-3xl shadow-2xl border-4 border-pink-700/60 p-8 mx-2 min-w-[320px] max-w-md relative">
                    <h2 className="text-3xl font-extrabold mb-4 text-pink-200 text-center drop-shadow">{storedDragons[1].name}</h2>
                    <img className="h-56 w-56 object-contain rounded-2xl border-4 border-pink-400 shadow-xl mb-6 bg-[#191127]" src={storedDragons[1].src} alt={storedDragons[1].name} />
                    <div className="flex flex-row justify-center gap-4 mb-4 w-full">
                        <div className="text-lg text-pink-100 bg-pink-900/40 px-4 py-2 rounded-xl shadow-inner font-semibold text-center min-w-[100px]">Health: {storedDragons[1].health}</div>
                        <div className="text-lg text-pink-100 bg-pink-900/40 px-4 py-2 rounded-xl shadow-inner font-semibold text-center min-w-[100px]">
                          Damage: {` ${rightBonus ? rightBonus.toFixed(1) : rightDrag}`}
                        </div>
                    </div>
                    <button className="mt-2 px-8 py-3 text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-800 text-white rounded-2xl shadow-lg hover:scale-105 hover:bg-pink-800 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-pink-400 cursor-pointer border-2 border-pink-400/40">Attack</button>
                </div>
            </div>
            <Link to="/" className="mt-4 px-8 py-3 text-lg font-semibold bg-transparent border-2 border-cyan-400 text-cyan-200 rounded-2xl shadow-md hover:bg-cyan-900/30 hover:text-white transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-center" onClick={handleGoBack}>
                Go Back
            </Link>
        </div>
    );
}