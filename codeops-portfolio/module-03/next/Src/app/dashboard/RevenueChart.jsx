"use client";

function formatETB(value) {
  return `ETB ${new Intl.NumberFormat("en-ET", {
    maximumFractionDigits: 0,
  }).format(value)}`;
}

export default function RevenueChart({ revenueData, dailyData }) {
  const barWidth = 560;
  const barHeight = 260;
  const barPadding = 45;
  const maxRevenue = Math.max(1, ...revenueData.map((item) => item.amount));
  const chartWidth = barWidth - barPadding * 2;
  const chartHeight = barHeight - 55;
  const barSlot = chartWidth / Math.max(1, revenueData.length);
  const barSize = Math.min(45, barSlot * 0.6);

  const lineWidth = 560;
  const lineHeight = 250;
  const linePadding = 45;
  const maxCount = Math.max(1, ...dailyData.map((item) => item.count));
  const linePlotWidth = lineWidth - linePadding * 2;
  const linePlotHeight = lineHeight - linePadding * 2;

  const points = dailyData.map((item, index) => {
    const x =
      dailyData.length <= 1
        ? lineWidth / 2
        : linePadding + (index / (dailyData.length - 1)) * linePlotWidth;

    const y = lineHeight - linePadding - (item.count / maxCount) * linePlotHeight;

    return { ...item, x, y };
  });

  const path = points.map((point, index) =>
    `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
  ).join(" ");

  return (
    <div className="space-y-8">
      <section className="rounded-lg border p-4">
        <h3 className="mb-2 font-semibold">Revenue by neighbourhood (ETB)</h3>

        <div className="h-[260px] w-full overflow-x-auto">
          <svg
            role="img"
            aria-labelledby="revenue-title revenue-desc"
            viewBox={`0 0 ${barWidth} ${barHeight}`}
            className="h-full min-w-[500px] w-full"
          >
            <title id="revenue-title">Revenue by neighbourhood</title>
            <desc id="revenue-desc">
              Bar chart comparing total revenue in Ethiopian birr for each neighbourhood.
            </desc>

            {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
              const y = chartHeight * (1 - fraction) + 10;
              const value = maxRevenue * fraction;

              return (
                <g key={fraction}>
                  <line
                    x1={barPadding}
                    x2={barWidth - barPadding}
                    y1={y}
                    y2={y}
                    stroke="currentColor"
                    opacity="0.15"
                  />
                  <text x={barPadding - 5} y={y + 4} textAnchor="end" fontSize="10">
                    {Math.round(value).toLocaleString("en-ET")}
                  </text>
                </g>
              );
            })}

            {revenueData.map((item, index) => {
              const x = barPadding + index * barSlot + (barSlot - barSize) / 2;
              const height = (item.amount / maxRevenue) * chartHeight;
              const y = chartHeight + 10 - height;

              return (
                <g key={item.neighbourhood}>
                  <rect
                    x={x}
                    y={y}
                    width={barSize}
                    height={height}
                    rx="3"
                    fill="#0d9488"
                  >
                    <title>{`${item.neighbourhood}: ${formatETB(item.amount)}`}</title>
                  </rect>
                  <text
                    x={x + barSize / 2}
                    y={barHeight - 10}
                    textAnchor="middle"
                    fontSize="10"
                  >
                    {item.neighbourhood.slice(0, 10)}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <p className="mt-2 text-sm text-gray-600">
          Bars compare total revenue; amounts are in Ethiopian birr (ETB).
        </p>
      </section>

      <section className="rounded-lg border p-4">
        <h3 className="mb-2 font-semibold">
          Orders per day — {dailyData.length ? `${dailyData[0].day} to ${dailyData[dailyData.length - 1].day}` : "no dates"}
          {" "}(orders)
        </h3>

        <div className="h-[250px] w-full overflow-x-auto">
          <svg
            role="img"
            aria-labelledby="daily-title daily-desc"
            viewBox={`0 0 ${lineWidth} ${lineHeight}`}
            className="h-full min-w-[500px] w-full"
          >
            <title id="daily-title">Orders per day</title>
            <desc id="daily-desc">
              Line chart showing the number of orders received each day.
            </desc>

            {[0, 0.25, 0.5, 0.75, 1].map((fraction) => {
              const y = lineHeight - linePadding - fraction * linePlotHeight;

              return (
                <g key={fraction}>
                  <line
                    x1={linePadding}
                    x2={lineWidth - linePadding}
                    y1={y}
                    y2={y}
                    stroke="currentColor"
                    opacity="0.15"
                  />
                  <text x={linePadding - 8} y={y + 4} textAnchor="end" fontSize="11">
                    {Math.round(maxCount * fraction)}
                  </text>
                </g>
              );
            })}

            {points.length > 1 && (
              <path d={path} fill="none" stroke="#2563eb" strokeWidth="3" />
            )}

            {points.map((point) => (
              <g key={point.day}>
                <circle cx={point.x} cy={point.y} r="4" fill="#2563eb">
                  <title>{`${point.day}: ${point.count} orders`}</title>
                </circle>
                <text
                  x={point.x}
                  y={lineHeight - 8}
                  textAnchor="middle"
                  fontSize="10"
                >
                  {point.day.slice(5)}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <h4 className="mt-4 font-semibold">Daily order data</h4>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Orders per day, matching the line chart</caption>
            <thead>
              <tr className="border-b">
                <th scope="col" className="p-2">Date</th>
                <th scope="col" className="p-2">Orders</th>
              </tr>
            </thead>
            <tbody>
              {dailyData.map((item) => (
                <tr key={item.day} className="border-b">
                  <th scope="row" className="p-2 font-normal">{item.day}</th>
                  <td className="p-2">{item.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}