import { auth } from "@/auth";
import { UserPage } from "@/components/user-page";

export default async function User() {
  const session = await auth();

  return (
    <UserPage user={session?.user} />
  )
}