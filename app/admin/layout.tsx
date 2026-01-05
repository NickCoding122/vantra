import { auth } from "../../auth";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/api/auth/signin");
  }

  const isAdmin = Boolean(
    (session.user as { isAdmin?: boolean } | undefined)?.isAdmin,
  );

  if (!isAdmin) {
    redirect("/");
  }

  return <>{children}</>;
}
