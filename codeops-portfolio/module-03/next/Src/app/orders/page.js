
import Link from "next/link";
import { getSession } from "@/lib/session";
import { getOrdersForUser } from "@/lib/db";

const PAGE_SIZE = 10;

const SORT_FIELDS = {
  createdAt: "createdAt",
  total: "total",
  status: "status",
};

function makeOrdersUrl({ sort, dir, page }) {
  const params = new URLSearchParams({
    sort,
    dir,
    page: String(page),
  });

  return `/orders?${params.toString()}`;
}

function SortLink({ label, field, sort, dir }) {
  const nextDir =
    sort === field && dir === "asc" ? "desc" : "asc";

  const arrow =
    sort === field ? (dir === "asc" ? " ↑" : " ↓") : "";

  return (
    <Link
      href={makeOrdersUrl({
        sort: field,
        dir: nextDir,
        page: 1,
      })}
    >
      {label}
      {arrow}
    </Link>
  );
}

export default async function OrdersPage({ searchParams }) {
  const session = await getSession();

  if (!session) {
    return <p>Please sign in to view your orders.</p>;
  }

  // Next.js 16: searchParams is a Promise
  const params = await searchParams;

  const requestedSort = params?.sort;
  const sort = SORT_FIELDS[requestedSort]
    ? requestedSort
    : "createdAt";

  const dir = params?.dir === "asc" ? "asc" : "desc";

  const parsedPage = Number.parseInt(params?.page ?? "1", 10);
  const page = Number.isInteger(parsedPage)
    ? Math.max(1, parsedPage)
    : 1;

  // Fetch only this authenticated user's orders
  const orders = await getOrdersForUser(session.id);

  // Sort on the server using a safe allowlist
  const sortedOrders = [...orders].sort((a, b) => {
    let comparison;

    if (sort === "total") {
      comparison = Number(a.total) - Number(b.total);
    } else if (sort === "status") {
      comparison = String(a.status).localeCompare(String(b.status));
    } else {
      comparison =
        new Date(a.createdAt).getTime() -
        new Date(b.createdAt).getTime();
    }

    return dir === "asc" ? comparison : -comparison;
  });

  const totalOrders = sortedOrders.length;
  const totalPages = Math.max(
    1,
    Math.ceil(totalOrders / PAGE_SIZE)
  );

  // Clamp an out-of-range page
  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageOrders = sortedOrders.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const dateFormatter = new Intl.DateTimeFormat("en-ET", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const moneyFormatter = new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 2,
  });

  return (
    <main>
      <h1>Your orders</h1>

      <p>
        Showing {totalOrders === 0 ? 0 : startIndex + 1}–
        {Math.min(startIndex + pageOrders.length, totalOrders)}
        {" "}of {totalOrders} orders
      </p>

      <table>
        <caption>
          Your orders. Select a column heading to sort.
        </caption>

        <thead>
          <tr>
            <th scope="col">Order ID</th>

            <th scope="col">
              <SortLink
                label="Date"
                field="createdAt"
                sort={sort}
                dir={dir}
              />
            </th>

            <th scope="col">
              <SortLink
                label="Total (ETB)"
                field="total"
                sort={sort}
                dir={dir}
              />
            </th>

            <th scope="col">
              <SortLink
                label="Status"
                field="status"
                sort={sort}
                dir={dir}
              />
            </th>

            <th scope="col">Details</th>
          </tr>
        </thead>

        <tbody>
          {pageOrders.length === 0 ? (
            <tr>
              <td colSpan={5}>No orders found.</td>
            </tr>
          ) : (
            pageOrders.map((order) => (
              <tr key={order.id}>
                <th scope="row">{order.id}</th>

                <td>
                  {dateFormatter.format(
                    new Date(order.createdAt)
                  )}
                </td>

                <td>{moneyFormatter.format(Number(order.total))}</td>

                <td>{order.status}</td>

                <td>
                  <Link href={`/orders/${encodeURIComponent(order.id)}`}>
                    View order
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <nav aria-label="Orders pagination">
        {currentPage > 1 ? (
          <Link
            href={makeOrdersUrl({
              sort,
              dir,
              page: currentPage - 1,
            })}
            rel="prev"
          >
            Previous
          </Link>
        ) : (
          <span aria-disabled="true">Previous</span>
        )}

        {" | "}

        <span>
          Page {currentPage} of {totalPages}
        </span>

        {" | "}

        {currentPage < totalPages ? (
          <Link
            href={makeOrdersUrl({
              sort,
              dir,
              page: currentPage + 1,
            })}
            rel="next"
          >
            Next
          </Link>
        ) : (
          <span aria-disabled="true">Next</span>
        )}
      </nav>
    </main>
  );
}
