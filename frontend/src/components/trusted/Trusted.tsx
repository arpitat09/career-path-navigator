export default function Trusted() {
  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Meta",
    "Netflix",
    "Adobe",
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">

        <p className="mb-10 text-center text-sm uppercase tracking-[0.3em] text-gray-400">
          Trusted by students preparing for careers at
        </p>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {companies.map((company) => (
            <div
              key={company}
              className="rounded-2xl border border-white/10 bg-white/5 py-6 text-center font-semibold text-gray-300 transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-white"
            >
              {company}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}