// components/About/StatsChart.jsx
"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Perros abandonados", value: 70000 },
    { name: "Gatos abandonados", value: 40000 },
    { name: "Mascotas adoptadas", value: 2043 },
];

const COLORS = ["#FF6B6B", "#FFD93D", "#6BCB77"];

export const StatsChart = () => {
    return (
        <div className="w-full h-80 text-white text-center my-10">
            <h2 className="text-2xl font-bold mb-4">Estadísticas de abandono y adopción</h2>
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        outerRadius={110}
                        label={({ name, value }) => `${name}: ${value}`}
                    >
                        {data.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <p className="mt-4 text-sm max-w-xl mx-auto">
                Estas cifras reflejan la realidad del abandono animal en Barranquilla. Con PetMatch trabajamos día a día para aumentar las adopciones y darles una segunda oportunidad a miles de mascotas.
            </p>
        </div>
    );
};
