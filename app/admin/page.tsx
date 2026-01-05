import { auth } from "../../auth";
import Link from "next/link";

export default async function AdminPage() {
  const session = await auth();
  const email = session?.user?.email ?? "Admin";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-semibold">
          Admin Dashboard — Welcome, {email}
        </h1>
        <p className="text-sm opacity-75">
          Manage submissions and upcoming features from this dashboard.
        </p>
      </div>

      <div>
        <Link
          href="https://docs.google.com/spreadsheets/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-white px-4 py-2 text-xs tracking-[0.2em] uppercase hover:opacity-80 transition-opacity"
        >
          Open Submissions
        </Link>
      </div>

      <div className="overflow-hidden rounded-sm border border-white/20">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 uppercase tracking-[0.15em] text-xs">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-white/10">
              <td className="px-4 py-3 opacity-80">(future)</td>
              <td className="px-4 py-3 opacity-80">(future)</td>
              <td className="px-4 py-3 opacity-80">(future)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
