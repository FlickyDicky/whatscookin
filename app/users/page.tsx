import Link from "next/link";
import React from "react";

interface User {
    id: number;
    name: string;
}

const UsersPage = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users: User[] = await res.json();
    return (
        <>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            <Link href="/"><button className="btn btn-primary">Home</button></Link>
        </>
    );
};

export default UsersPage;
