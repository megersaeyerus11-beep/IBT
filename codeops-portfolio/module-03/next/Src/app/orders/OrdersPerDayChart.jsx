
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OrdersPerDayChart({ data, rangeLabel }) {
  return (
    <section>
      <h2>
        Orders per day — {rangeLabel} (orders/day)
      </h2>

      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
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
              allowDecimals={false}
              width={45}
              label={{
                value: "Orders/day",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip
              formatter={(value) => [
                `${value} orders`,
                "Daily orders",
              ]}
            />

            <Line
              type="monotone"
              dataKey="orders"
              name="Orders"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}





"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OrdersPerDayChart({ data, rangeLabel }) {
  return (
    <section>
      <h2>
        Orders per day — {rangeLabel} (orders/day)
      </h2>

      {/* Line chart */}
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 16,
              right: 20,
              left: 12,
              bottom: 8,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" tick={{ fontSize: 12 }} />

            <YAxis
              allowDecimals={false}
              width={45}
              label={{
                value: "Orders/day",
                angle: -90,
                position: "insideLeft",
              }}
            />

            <Tooltip
              formatter={(value) => [
                `${value} orders`,
                "Daily orders",
              ]}
            />

            <Line
              type="monotone"
              dataKey="orders"
              name="Orders"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Accessible data table: same data as the chart */}
      <table>
        <caption>
          Daily order counts for {rangeLabel}. Unit: orders per day.
        </caption>

        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Orders (orders/day)</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.date}>
              <th scope="row">{item.date}</th>
              <td>{item.orders}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <th scope="row">Total orders in range</th>
            <td>
              {data.reduce((total, item) => total + item.orders, 0)}
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
  );
}
