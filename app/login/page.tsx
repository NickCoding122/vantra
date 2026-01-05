import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center gap-6">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
          Your password is set
        </h1>
        <p className="text-sm md:text-base opacity-90 max-w-[32ch]">
          You can now sign in to the Vantra app using your email and password.
        </p>
        <p className="text-xs md:text-sm opacity-60 max-w-[34ch]">
          If you don’t have the app yet, download it from TestFlight.
        </p>
      </div>

      <Link
        href="/"
        className="border border-white px-6 py-3 text-xs tracking-[0.2em] uppercase transition-opacity hover:opacity-80"
      >
        Open the Vantra app
      </Link>

      <p className="text-xs opacity-50">You may close this page.</p>
    </div>
  );
}
