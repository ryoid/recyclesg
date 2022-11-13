export default defineNuxtPlugin(() => {
  addRouteMiddleware("unauth", () => {
    const { $auth } = useNuxtApp();

    if ($auth?.currentUser) {
      return navigateTo("/");
    }
  });

  addRouteMiddleware("auth", async () => {
    const { $auth } = useNuxtApp();
    const user = useFirebaseUser();

    if (!user.value.loading && !$auth?.currentUser) {
      return navigateTo("/login");
    }
  });

  addRouteMiddleware("admin", async () => {
    const { $auth } = useNuxtApp();
    const user = useFirebaseUser();

    if (!user.value.loading && !$auth?.currentUser) {
      return navigateTo("/login");
    }
  });
});
