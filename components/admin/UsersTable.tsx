"use client";

interface UserRow {
  id: string;
  name: string;
  username: string;
  is_admin: boolean;
  created_at: string;
}

export default function UsersTable({ users }: { users: UserRow[] }) {
  if (users.length === 0) {
    return (
      <div className="text-center py-20 border border-dashed border-mist">
        <p className="font-display text-2xl font-light text-stone">
          Sin usuarios todavía
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-mist">
            {["Usuario", "Nombre", "Rol", "Registrado"].map((h) => (
              <th
                key={h}
                className="text-left text-[0.62rem] font-medium tracking-[0.15em] uppercase text-stone py-3 px-4 first:pl-0"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-mist">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-mist/30 transition-colors">
              <td className="py-4 px-4 pl-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-ink rounded-full flex items-center justify-center shrink-0">
                    <span className="font-display text-sm text-white">
                      {u.name?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-stone text-sm">@{u.username}</span>
                </div>
              </td>
              <td className="py-4 px-4 text-ink">{u.name}</td>
              <td className="py-4 px-4">
                <span
                  className={`px-2 py-0.5 border text-[0.6rem] font-medium tracking-[0.1em] uppercase
                  ${u.is_admin ? "border-gold/40 text-gold bg-gold/5" : "border-mist text-stone"}`}
                >
                  {u.is_admin ? "Admin" : "Usuario"}
                </span>
              </td>
              <td className="py-4 px-4 text-stone text-xs">
                {new Date(u.created_at).toLocaleDateString("es-AR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
