
export default function OrdersLoading() {
  return (
    <main aria-label="Loading orders">
      <h1>Orders</h1>

      <p>Loading your order history…</p>

      <div aria-hidden="true" className="orders-skeleton">
        <div className="skeleton skeleton-heading" />

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Total</th>
              <th>Status</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 5 }, (_, i) => (
              <tr key={i}>
                {Array.from({ length: 5 }, (_, j) => (
                  <td key={j}>
                    <div className="skeleton skeleton-cell" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
