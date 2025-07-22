import React from "react";
import "./App.css";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function DragonModal({
  modal,
  setModal,
  clickedDragon,
  setSelectedDragons,
}) {
  const storedDragons = JSON.parse(
    localStorage.getItem("storedDragons") || "[]"
  );

  function handleSelectDragon(drag) {
    if (storedDragons.length < 2) {
      // Add the new dragon
      storedDragons.push(drag);
      localStorage.setItem("storedDragons", JSON.stringify(storedDragons));
      setSelectedDragons([...storedDragons]);
    } else {
      toast.warn(
        "You can only select 2 dragons! Clear Selection or go fight!",
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        }
      );
      console.log(storedDragons);
    }
  }

  return (
    <>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          {/* Overlay */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setModal(false)}
          ></div>
          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-md mx-auto rounded-3xl shadow-2xl bg-gradient-to-br from-[#101624] via-[#1a2233] to-black bg-opacity-90 p-8 flex flex-col items-center border-2 border-blue-900/40 containerr">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold rounded-full bg-blue-900/80 hover:bg-blue-950 transition w-10 h-10 flex items-center justify-center shadow-lg focus:outline-none hover:ring-2 hover:ring-blue-400 group cursor-pointer"
              onClick={() => setModal(false)}
              aria-label="Close modal"
            >
              <span className="text-2xl absolute left-0 right-0 top-0 bottom-0 transition group-hover:-translate-y-1">
                &times;
              </span>
            </button>
            {/* Dragon Info */}
            <h2 className="text-3xl font-extrabold text-blue-100 mb-4 drop-shadow-lg text-center">
              {clickedDragon.name}
            </h2>
            <img
              src={clickedDragon.src}
              alt={clickedDragon.name}
              className="h-48 w-48 object-contain rounded-2xl border-4 border-blue-900 shadow-xl mb-4 bg-[#101624]"
            />
            <div className="flex flex-row items-center m-3 w-full text-center">
              <div className="text-lg text-blue-100 bg-blue-900/40 px-4 py-2 mr-4 rounded-xl shadow-inner w-full">
                <span className="font-semibold">Damage:</span>
                {` ${clickedDragon.damage}`}
              </div>
              <div className="text-lg text-blue-100 bg-blue-900/40 px-4 py-2 rounded-xl shadow-inner w-full">
                <span className="font-semibold">Health:</span>
                {` ${clickedDragon.health}`}
              </div>
            </div>
            {/* Select Dragon button */}
            <button
              className="mt-2 mb-4 px-6 py-2 text-lg font-semibold bg-gradient-to-r from-blue-800 to-slate-900 text-white rounded-2xl shadow-md hover:scale-105 transition cursor-pointer"
              id="selectbtn"
              onClick={() => {
                handleSelectDragon(clickedDragon);
                setModal(false);
              }}
            >
              Select this Dragon
            </button>
            {/* Weakness Text */}
            <div className="text-lg text-blue-100 bg-blue-900/40 px-4 py-2 w-full text-center rounded-xl shadow-inner">
              <span className="font-semibold">Weakness:</span>
              {` ${clickedDragon.weakness}`}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
