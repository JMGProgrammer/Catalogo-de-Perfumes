"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import PerfumeFormDrawer from "@/components/admin/PerfumeFormDrawer";
import PerfumesTable from "@/components/admin/PerfumesTable";
import UsersTable from "@/components/admin/UsersTable";
import Link from "next/link";

type Tab = "perfumes" | "users";

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("perfumes");
  const [perfumes, setPerfumes] = useState<Record<string, unknown>[]>([]);
  const [users, setUsers] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (!profile?.is_admin) {
        router.push("/");
        return;
      }

      setAdminName(profile.name);
      await loadData();
      setLoading(false);
    };
    init();
  }, [router]);

  const loadData = async () => {
    const [{ data: perfs }, { data: usrs }] = await Promise.all([
      supabase
        .from("perfumes")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);
    if (perfs) setPerfumes(perfs);
    if (usrs) setUsers(usrs);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que querés eliminar este perfume?")) return;
    await supabase.from("perfumes").delete().eq("id", id);
    await loadData();
  };

  const handleToggle = async (
    id: string,
    field: "featured" | "trending",
    value: boolean,
  ) => {
    await supabase
      .from("perfumes")
      .update({ [field]: value })
      .eq("id", id);
    await loadData();
  };

  const handleEdit = (p: Record<string, unknown>) => {
    setEditing(p);
    setDrawerOpen(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setDrawerOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="font-display text-2xl font-light text-stone">
          Cargando...
        </p>
      </div>
    );
  }

  const stats = [
    { label: "Perfumes", value: perfumes.length },
    { label: "Usuarios", value: users.length },
    { label: "Destacados", value: perfumes.filter((p) => p.featured).length },
    { label: "Tendencia", value: perfumes.filter((p) => p.trending).length },
  ];

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-[220px] shrink-0 border-r border-mist flex flex-col">
        <div className="px-6 py-6 border-b border-mist">
          <Link
            href="/"
            className="font-display text-xl tracking-[0.15em] text-ink block mb-1"
          >
            SILLAGE
          </Link>
          <p className="text-[0.6rem] font-medium tracking-[0.15em] uppercase text-gold">
            Admin Panel
          </p>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {(
            [
              {
                id: "perfumes",
                label: "Perfumes",
                icon: "M19.428 15.428a2 2 0 0 0-1.022-.547l-2.387-.477a6 6 0 0 0-3.86.517l-.318.158a6 6 0 0 1-3.86.517L6.05 15.21a2 2 0 0 0-1.806.547M8 4h8l-1 1v5.172a2 2 0 0 0 .586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 0 0 9 10.172V5L8 4z",
              },
              {
                id: "users",
                label: "Usuarios",
                icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75M9 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0",
              },
            ] as { id: Tab; label: string; icon: string }[]
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`
                flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors duration-150 text-left
                ${tab === item.id ? "bg-ink text-white" : "text-stone hover:bg-mist hover:text-ink"}
              `}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d={item.icon} />
              </svg>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Admin info */}
        <div className="px-6 py-5 border-t border-mist">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center shrink-0">
              <span className="font-display text-sm text-white">
                {adminName.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-ink leading-tight">
                {adminName}
              </p>
              <p className="text-[0.6rem] tracking-widest uppercase text-gold">
                Admin
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="text-xs text-stone hover:text-ink transition-colors underline underline-offset-4"
          >
            ← Ir al sitio
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="px-8 py-5 border-b border-mist flex justify-between items-center shrink-0">
          <h1 className="font-display text-2xl font-normal text-ink">
            {tab === "perfumes"
              ? "Gestión de perfumes"
              : "Usuarios registrados"}
          </h1>
          {tab === "perfumes" && (
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-5 py-2.5 bg-ink text-white text-[0.65rem] font-medium tracking-[0.15em] uppercase font-body hover:bg-stone transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              Añadir perfume
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 border-b border-mist shrink-0">
          {stats.map((s) => (
            <div
              key={s.label}
              className="px-8 py-5 border-r border-mist last:border-r-0"
            >
              <p className="font-display text-3xl font-light text-ink mb-1">
                {s.value}
              </p>
              <p className="text-[0.62rem] font-medium tracking-[0.15em] uppercase text-stone">
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {tab === "perfumes" && (
            <PerfumesTable
              perfumes={
                perfumes as Parameters<typeof PerfumesTable>[0]["perfumes"]
              }
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggle={handleToggle}
            />
          )}
          {tab === "users" && (
            <UsersTable
              users={users as Parameters<typeof UsersTable>[0]["users"]}
            />
          )}
        </div>
      </main>

      {/* Drawer */}
      <PerfumeFormDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSaved={loadData}
        editing={editing}
      />
    </div>
  );
}
