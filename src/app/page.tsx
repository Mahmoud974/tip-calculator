"use client";
import React, { useState, useEffect } from "react";
import { z } from "zod";

const billSchema = z.number().positive();
const peopleSchema = z.number().int().positive();

export default function TipCalculator() {
  const [bill, setBill] = useState<number | "">("");
  const [tip, setTip] = useState<number | null>(null);
  const [people, setPeople] = useState<number | "">("");
  const [tipAmount, setTipAmount] = useState<string>("0.00");
  const [total, setTotal] = useState<string>("0.00");

  useEffect(() => {
    const billValid = billSchema.safeParse(bill);
    const peopleValid = peopleSchema.safeParse(people);

    if (billValid.success && tip !== null && peopleValid.success) {
      const totalTip = (billValid.data * tip) / 100;
      const amountPerPerson = totalTip / peopleValid.data;
      const totalPerPerson = (billValid.data + totalTip) / peopleValid.data;
      setTipAmount(amountPerPerson.toFixed(2));
      setTotal(totalPerPerson.toFixed(2));
    } else {
      setTipAmount("0.00");
      setTotal("0.00");
    }
  }, [bill, tip, people]);

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
    <main className="flex flex-col justify-center items-center h-screen p-4">
      <h1 className="text-center mb-10 font-bold text-gray-500 tracking-widest text-xl">
        SPLITTER
      </h1>
      <div className="bg-white md:flex-row flex-col p-8 rounded-xl max-w-3xl w-full flex gap-4">
        <div className="flex flex-col gap-4 w-full md:w-2/3">
          <div className="mb-4">
            <label
              className="block text-gray-500 mb-1 text-xs font-bold"
              htmlFor="bill-input"
            >
              Bill
            </label>
            <input
              id="bill-input"
              type="number"
              value={bill}
              onChange={(e) => setBill(parseFloat(e.target.value) || "")}
              placeholder="0"
              min="0.01"
              className="w-full p-2 border rounded-md text-right focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-500 mb-1 text-xs font-bold"
              htmlFor="tip-selector"
            >
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
                id="tip-selector"
                type="number"
                placeholder="Custom"
                min="0"
                onChange={(e) => setTip(parseFloat(e.target.value) || null)}
                className="p-2 border rounded-md text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-500 mb-1 text-xs font-bold"
              htmlFor="people-input"
            >
              Number of People
            </label>
            <input
              id="people-input"
              type="number"
              value={people}
              onChange={(e) => setPeople(parseInt(e.target.value) || "")}
              placeholder="0"
              min="1"
              className="w-full p-2 border rounded-md text-right focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        <div className="bg-teal-900 pt-10 text-white w-full md:w-1/3 p-6 rounded-lg flex flex-col justify-between">
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
              <span className="text-2xl font-bold text-teal-500">${total}</span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full bg-teal-500 text-green-950 p-2 rounded-md font-bold mt-auto hover:bg-teal-600 transition duration-200"
          >
            RESET
          </button>
        </div>
      </div>
    </main>
  );
}
