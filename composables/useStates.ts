import { User } from "@firebase/auth";

export const useFirebaseUser = () =>
  useState<{
    user?: User & { role?: "admin" | "user" };
    loading?: boolean;
  }>("firebaseUser", () => ({
    loading: true,
  }));
