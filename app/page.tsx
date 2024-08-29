'use client';
import Link from "next/link";
import getPb from "./pbinstance";


export default function Home() {
    const pb = getPb();
    const check = async () => {
        console.log(pb.authStore.isValid);
    }
    const logout = async () => {
        pb.authStore.clear();
        localStorage.removeItem("authToken");
    }
    return (
        <main>
            <Link href="/users">Users</Link>
            <button onClick={check} className="btn btn-secondary">Check login</button>
            <button onClick={logout} className="btn btn-secondary">Logout</button>
        </main>
    );
}
