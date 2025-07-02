import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const INITIAL_DATA = [
  { name: "VOO", value: 20 },
  { name: "JEPI", value: 5 },
  { name: "O", value: 5 },
  { name: "HOOD", value: 20 },
  { name: "HIMS", value: 15 },
  { name: "SOFI", value: 15 },
  { name: "BTC", value: 7 },
  { name: "SOL", value: 1 },
  { name: "DOGE", value: 1 },
  { name: "XRP", value: 1 },
  { name: "QQQI", value: 5 },
  { name: "JEPQ", value: 5 },
];

const COLORS = [
  "#a855f7", // glowing purple
  "#9333ea",
  "#6b21a8",
  "#c084fc",
  "#8b5cf6",
  "#7e22ce",
  "#4c1d95",
  "#d8b4fe",
  "#0ea5e9",
  "#22c55e",
  "#f97316",
  "#dc2626",
];

export default function InvestmentPortfolioApp() {
  const [data, setData] = useState(INITIAL_DATA);

  const randomize = () => {
    // create random weights
    const rands = data.map(() => Math.random());
    const total = rands.reduce((a, b) => a + b, 0);
    const raw = data.map((d, i) => ({ ...d, value: Math.round((rands[i] / total) * 100) }));
    // adjust rounding to hit 100 exactly
    const diff = 100 - raw.reduce((a, b) => a + b.value, 0);
    raw[0].value += diff;
    setData(raw);
  };

  const glowText = {
    textShadow: "0 0 8px #a855f7, 0 0 16px #a855f7",
  };

  const glowBox = {
    boxShadow: "0 0 20px 3px #a855f7",
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-8 p-6">
      <motion.h1
        className="text-4xl font-bold"
        style={glowText}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Investment Portfolio
      </motion.h1>

      <Button onClick={randomize} className="bg-purple-700 hover:bg-purple-600" style={glowBox}>
        Randomize Allocations
      </Button>

      <Card className="bg-gray-900/80 backdrop-blur-lg rounded-2xl w-full max-w-7xl p-8" style={glowBox}>
        <CardContent className="grid md:grid-cols-2 gap-12">
          {/* Pie Chart */}
          <div className="w-full h-96">
            <ResponsiveContainer>
              <PieChart>
                <Pie dataKey="value" data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={120}>
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      className="transition-opacity hover:opacity-80"
                    />
                  ))}
                </Pie>
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="w-full h-96">
            <ResponsiveContainer>
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="#a855f7" tick={{ fill: "#d1d5db" }} />
                <YAxis tickFormatter={(v) => `${v}%`} stroke="#a855f7" tick={{ fill: "#d1d5db" }} />
                <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} />
                <Legend />
                <Bar dataKey="value" fill="#a855f7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
