import Link from "next/link";

const columns = [
  { key: "createdAt", label: "Date" },
  { key: "customerName", label: "Customer" },
  { key: "neighbourhood", label: "Neighbourhood" },
  { key: "total", label: "Total (ETB)" },
  { key: "status", label: "Status" },
];

export default function OrderTable({ orders, page, pageSize, total, sort, direction }) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  function sortHref(key) {
    const nextDirection =
      sort === key && direction === "asc" ? "desc" : "asc";

    return `/orders?sort=${encodeURIComponent(key)}&direction=${nextDirection}&page=1`;
  }

  function pageHref(nextPage) {
    return `/orders?sort=${encodeURIComponent(sort)}&direction=${direction}&page=${nextPage}`;
  }

  return (
    <section className="space-y-4">
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">Customer orders, sortable by column</caption>
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col" className="p-3">
                  <Link
                    href={sortHref(column.key)}
                    aria-label={`Sort orders by ${column.label}`}
                    className="underline underline-offset-4"
                  >
                    {column.label}
                    {sort === column.key ? (direction === "asc" ? " ↑" : " ↓") : ""}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString("en-ET")
                    : "—"}
                </td>
                <td className="p-3">{order.customerName ?? "—"}</td>
                <td className="p-3">
                  {order.neighbourhood ?? order.neighborhood ?? "—"}
                </td>
                <td className="p-3">
                  {Number(order.total ?? order.totalETB ?? 0).toLocaleString("en-ET")}
                </td>
                <td className="p-3">{order.status ?? "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav aria-label="Order table pagination" className="flex items-center justify-between">
        <p className="text-sm" aria-live="polite">
          Page {page} of {pageCount} · {total} orders
        </p>

        <div className="flex gap-3">
          {page > 1 ? (
            <Link className="underline" href={pageHref(page - 1)}>
              Previous
            </Link>
          ) : (
            <span className="text-gray-400">Previous</span>
          )}

          {page < pageCount ? (
            <Link className="underline" href={pageHref(page + 1)}>
              Next
            </Link>
          ) : (
            <span className="text-gray-400">Next</span>
          )}
        </div>
      </nav>
    </section>
  );
}