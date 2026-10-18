import SignInForm from "./SignInForm";

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const nextPath =
    typeof params?.next === "string" ? params.next : "/";

  return (
    <main>
      <h1 className="p-6 text-2xl font-bold">Sign in to Addis Eats</h1>
      <SignInForm nextPath={nextPath} />
    </main>
  );
}