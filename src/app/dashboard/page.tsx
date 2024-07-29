import { getServerSession } from "next-auth";

import { authOptions } from "@/auth-options";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div>DashboardPage</div>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </>
  );
}
