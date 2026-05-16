import { auth } from "@/src/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  const isProtectedAdminRoute = pathname.startsWith("/admin/");
  
  const isProtectedEditorRoute = pathname.startsWith("/editor/");

  const isTryingToAccessProtectedArea = isProtectedAdminRoute || isProtectedEditorRoute;

  if (isTryingToAccessProtectedArea && !isLoggedIn) {
    return Response.redirect(new URL("/admin", req.nextUrl));
  }

  if (pathname === "/admin" && isLoggedIn) {
    return Response.redirect(new URL("/admin/panel", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};