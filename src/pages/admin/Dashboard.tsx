import { LuCircleUserRound } from "react-icons/lu";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import Logo from "../../components/logo/Logo";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const shouldOpenLogin = !(location.state as { fromLogin?: boolean } | null)?.fromLogin;

    useEffect(() => {
        if (!shouldOpenLogin) {
            return;
        }

        const loginTimer = window.setTimeout(() => {
            navigate("/login");
        }, 2500);

        return () => window.clearTimeout(loginTimer);
    }, [navigate, shouldOpenLogin]);

    return (
        <section
            className="relative min-h-screen w-full overflow-hidden bg-black text-white"
            style={{
                backgroundImage:
                    "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.68) 45%, rgba(0,0,0,0.34) 100%), url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1920&q=80')",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        >
            <header className="flex w-full items-center justify-between bg-black/45 px-5 py-3 shadow backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <Logo className="size-10" />
                    <h2 className="text-2xl font-semibold text-red-600 text-shadow-lg">NEPFLIX</h2>
                </div>

                <div className="flex items-center gap-3 text-white">
                    <LuCircleUserRound className="size-7" />
                    <span className="hidden font-semibold sm:inline">Chiranjibi Debkota</span>

                    <details className="relative">
                        <summary className="list-none rounded border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/20">
                            Genre
                        </summary>

                        <div
                            role="menu"
                            className="absolute right-0 top-12 z-10 w-56 overflow-hidden rounded border border-white/15 bg-black/85 shadow-lg backdrop-blur-md"
                        >
                            <a
                                href="#"
                                className="block px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                                role="menuitem"
                            >
                                Action & Adventure
                            </a>

                            <a
                                href="#"
                                className="block px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                                role="menuitem"
                            >
                                Comedy
                            </a>

                            <a
                                href="#"
                                className="block px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                                role="menuitem"
                            >
                                Drama
                            </a>

                            <a
                                href="#"
                                className="block px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                                role="menuitem"
                            >
                                Horror & Thriller
                            </a>

                            <a
                                href="#"
                                className="block px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                                role="menuitem"
                            >
                                Sci-Fi & Fantasy
                            </a>
                        </div>
                    </details>
                </div>
            </header>

            <main className="flex min-h-[calc(100vh-68px)] items-center px-6 py-12 sm:px-10 lg:px-16">
                <section className="max-w-2xl">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.32em] text-red-400">Movie dashboard</p>
                    <h1 className="mb-5 text-4xl font-bold leading-tight sm:text-6xl">Stream your favorite stories tonight.</h1>
                    <p className="max-w-xl text-base leading-7 text-gray-200 sm:text-lg">
                        Browse genres, manage your watchlist, and keep Nepflix ready for the next great movie night.
                    </p>
                </section>
            </main>
        </section>
    );
}
