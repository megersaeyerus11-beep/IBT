
"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatETB = (value) =>
  `${new Intl.NumberFormat("en-ET", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)} ETB`;

const formatFullETB = (value) =>
  `${new Intl.NumberFormat("en-ET", {
    maximumFractionDigits: 2,
  }).format(value)} ETB`;

export default function RevenueChart({ data }) {
  return (
    <section>
      <h2>Revenue</h2>

      {/* Fixed-height parent is required for ResponsiveContainer */}
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 16,
              right: 20,
              left: 12,
              bottom: 8,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              tickFormatter={formatETB}
              width={90}
            />

            <Tooltip
              formatter={(value) => [
                formatFullETB(Number(value)),
                "Revenue",
              ]}
            />

            <Bar
              dataKey="revenue"
              name="Revenue"
              fill="#0d9488"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
