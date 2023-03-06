import Link from "next/link";

export default function Layout({ children }: any) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-fuchsia-100 mb-8 py-4">
                <div className="container mx-auto flex justify-center">
                    <Link href="/">
                        🏡
                    </Link>
                    <span className="mx-auto">Test Header</span>{" "}
                    <Link href="/admin/create-blog">
                        ➕
                    </Link>
                </div>
            </header>
            <main className="container mx-auto flex-1">{children}</main>
            <footer className="bg-fuchsia-100 mt-8 py-4">
                <div className="container mx-auto flex justify-center">&copy; 2022 Devr</div>
            </footer>
        </div>
    );
}
