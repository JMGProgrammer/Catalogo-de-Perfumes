import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-white flex">
      {/* Left: Image */}
      <div className="hidden lg:block w-[45%] relative overflow-hidden bg-mist">
        <img
          src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=1200&auto=format&fit=crop&q=80"
          alt="Perfume"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="font-display text-3xl font-light text-white leading-tight italic">
            "Cada perfume es una historia esperando ser contada."
          </p>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 relative">
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-[0.65rem] font-medium tracking-[0.15em] uppercase text-stone hover:text-ink transition-colors duration-200"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver
        </Link>
        <RegisterForm />
      </div>
    </main>
  );
}
