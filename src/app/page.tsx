"use client";
import React, { useState } from "react";

export default function TipCalculator() {
  const [bill, setBill] = useState<number | "">("");
  const [tip, setTip] = useState<number | null>(null);
  const [people, setPeople] = useState<number | "">("");
  const [tipAmount, setTipAmount] = useState<string>("0.00");
  const [total, setTotal] = useState<string>("0.00");

  const handleTipClick = (percentage: number) => {
    setTip(percentage);
  };

  const handleReset = () => {
    setBill("");
    setTip(null);
    setPeople("");
    setTipAmount("0.00");
    setTotal("0.00");
  };

  return (
    <>
      <h1 className="text-center text-gray-500 mb-8 tracking-widest">
        SPLITTER
      </h1>
      <main className="flex justify-center items-center h-screen">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-3xl w-full flex gap-4">
          {/* Section de gauche - Entrées */}
          <div className="flex flex-col gap-4 w-2/3">
            <div className="mb-4">
              <label className="block text-gray-500 mb-1 text-xs font-bold">
                Bill
              </label>
              <input
                type="number"
                value={bill}
                onChange={(e) => setBill(parseFloat(e.target.value) || "")}
                placeholder="0"
                className="w-full p-2 border rounded-md text-right"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-500 mb-1 text-xs font-bold">
                Select Tip %
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[5, 10, 15, 25, 50].map((percentage) => (
                  <button
                    key={percentage}
                    onClick={() => handleTipClick(percentage)}
                    className={`p-2 rounded-md font-bold ${
                      tip === percentage
                        ? "bg-teal-500 text-green-950"
                        : "bg-teal-900 text-white"
                    }`}
                  >
                    {percentage}%
                  </button>
                ))}
                <input
                  type="number"
                  placeholder="Custom"
                  onChange={(e) => setTip(parseFloat(e.target.value))}
                  className="p-2 border rounded-md text-center"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-500 mb-1 text-xs font-bold">
                Number of People
              </label>
              <input
                type="number"
                value={people}
                onChange={(e) => setPeople(parseInt(e.target.value) || "")}
                placeholder="0"
                className="w-full p-2 border rounded-md text-right"
              />
            </div>

            {/* Optional: Button to calculate */}
            {/* <button
              onClick={handleCalculate}
              className="w-full bg-teal-500 text-green-950 p-2 rounded-md font-bold"
            >
              CALCULATE
            </button> */}
          </div>

          {/* Section de droite - Résultats */}
          <div className="bg-teal-900 pt-10 text-white w-[20rem] p-6 rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex justify-between mb-8">
                <span className="text-xs font-bold">
                  Tip Amount <br />
                  <small className="text-green-200">/ person</small>
                </span>
                <span className="text-2xl font-bold text-teal-500">
                  ${tipAmount}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-xs font-bold">
                  Total <br />
                  <small className="text-green-200">/ person</small>
                </span>
                <span className="text-2xl font-bold text-teal-500">
                  ${total}
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full bg-teal-500 text-green-950 p-2 rounded-md font-bold mt-auto"
            >
              RESET
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
