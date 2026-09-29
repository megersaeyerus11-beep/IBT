<Route
  path="checkout"
  element={
    <RequireAuth>
      <Suspense fallback={<LoadingSkeleton />}>
        <Checkout />
      </Suspense>
    </RequireAuth>
  }
/>