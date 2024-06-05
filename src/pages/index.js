import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center gap-28">
      <h1 className="text-5xl font-bold	">Create collaborative tier lists</h1>
      <div className="w-full flex flex-col">
        <Link href="/login">
          <button className="block w-full font-bold bg-button-bg text-button-text text-2xl p-2.5 rounded-xl hover:bg-button-hover">
            Sign In
          </button>
        </Link>
        <p className="font-bold text-lg self-center">
          <small>or</small>
        </p>
        <Link href="/signup">
          <button className="block w-full font-bold bg-button-bg text-button-text text-2xl p-2.5 rounded-xl	hover:bg-button-hover">
            Create an Account
          </button>
        </Link>
      </div>
    </div>
  );
}
