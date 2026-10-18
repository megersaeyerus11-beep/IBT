export async function POST() {
  return Response.json(
    {
      error: "This demo uses the sign-in form to create sessions.",
    },
    { status: 410 }
  );
}