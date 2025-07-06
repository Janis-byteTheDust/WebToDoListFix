import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // arahkan user ke halaman login
  },
});

export const config = {
  matcher: ["/", "/about", "/dashboard"], // sesuaikan dengan semua route yang ingin diproteksi
};
