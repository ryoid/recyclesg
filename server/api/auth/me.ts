// Return current user from cookie middleware
export default defineEventHandler(async (event) => {
  // @ts-ignore
  const user = event.req.user;

  return user ? user : "User is signed out";
});
