export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-28">
      <h1 className="text-5xl font-bold	">Create collaborative tier lists</h1>
      <div className="w-full flex flex-col items-center">
        <button className="border block w-full font-bold">Sign In</button>
        <p className="font-bold">
          <small>or</small>
        </p>
        <button className="border block w-full font-bold">
          Create an Account
        </button>
      </div>
    </div>
  );
}
