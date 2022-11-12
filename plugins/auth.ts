export default defineNuxtPlugin(() => {
  addRouteMiddleware("unauth", () => {
    const { $auth } = useNuxtApp();

    if ($auth?.currentUser) {
      return navigateTo("/");
    }
  });

  addRouteMiddleware("auth", async () => {
    const { $auth } = useNuxtApp();

    if (!$auth?.currentUser) {
      return navigateTo("/login");
    }
  });

  addRouteMiddleware("admin", () => {
    const { $auth } = useNuxtApp();
    const user = useFirebaseUser();

    if (!$auth?.currentUser) {
      return navigateTo("/login");
    }
  });
});
