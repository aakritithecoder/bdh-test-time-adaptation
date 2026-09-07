import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function ComparisonChart({ optAccuracy, recAccuracy }) {
  const data = [
    { name: "Optimization route (gradient fit)", accuracy: optAccuracy },
    { name: "Recurrent-state route (no gradient)", accuracy: recAccuracy },
  ];
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis domain={[0, 1]} />
        <Tooltip />
        <Bar dataKey="accuracy" fill="#6c4fd6" />
      </BarChart>
    </ResponsiveContainer>
  );
}
