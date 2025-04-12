import { signOutAction } from "@/app/actions";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";

export default async function AuthButton() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={"default"}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              variant={"outline"}
              disabled
              className="opacity-75 cursor-none pointer-events-none"
            >
              <Link href="/login">Sign in</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={"default"}
              disabled
              className="opacity-75 cursor-none pointer-events-none bg-red-600 hover:bg-red-700"
            >
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  if (!user || !user.email) {
    return (
      <>
        <div className="flex gap-4 items-center">
          Signed in as guest!
          <div className="flex gap-2">
            <Button asChild size="sm" variant={"outline"} className="bg-white text-black hover:bg-gray-400">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="sm" variant={"default"} className="bg-red-600 hover:bg-red-700 text-white">
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        </div>
      </>
    );
  }
  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"} className="bg-white text-black hover:bg-gray-400">
        <Link href="/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"} className="bg-red-600 hover:bg-red-700 text-white">
        <Link href="/signup">Sign up</Link>
      </Button>
    </div>
  );
}