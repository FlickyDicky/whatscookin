'use client';
import React from "react";
import getPb from "../../pbinstance";

const LoginUserPage = () => {
    const pb = getPb();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const record = await pb
                .collection("users")
                .authWithPassword(email, password);
            setEmail("");
            setPassword("");
            localStorage.setItem("authToken", record.token);
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={login}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        className="input input-bordered w-full max-w-xs"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        className="input input-bordered w-full max-w-xs"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};

export default LoginUserPage;
