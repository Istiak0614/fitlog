import Link from "next/link";

const NotFound = () => {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-[#0a0a0a] px-4 text-center text-white">
      <div>
        <h1 className="mt-4 text-8xl font-black text-[#d7ff00] sm:text-9xl">
          404
        </h1>
        <h2 className="mt-3 text-3xl font-black uppercase">
          Page Not Found
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/50">
          The page you are looking for does
          not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 bg-[#d7ff00] px-6 py-3 text-sm font-black uppercase text-black">
          Back to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;