import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
    "https://akashonline24hour-bazar-dor.vercel.app",
});

export const { signIn, signUp, useSession, signOut } = authClient;