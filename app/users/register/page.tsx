"use client";
import React from "react";
import getPb from "../../pbinstance";

const RegisterUserPage = () => {
    const pb = getPb();
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");

    const register = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const user = {
                name,
                email,
                password,
                passwordConfirm,
            };
            const record = await pb.collection("users").create(user);
            console.log(record);
            setName("");
            setEmail("");
            setPassword("");
            setPasswordConfirm("");
        } catch (error: any) {
            console.log(error.message);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={register}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        className="input input-bordered w-full max-w-xs"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
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
                <div>
                    <label htmlFor="passwordConfirm">
                        Password Confirmation
                    </label>
                    <input
                        className="input input-bordered w-full max-w-xs"
                        type="password"
                        id="passwordConfirm"
                        value={passwordConfirm}
                        onChange={(e) =>
                            setPasswordConfirm(e.target.value)
                        }
                        required
                    />
                </div>
                <button className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default RegisterUserPage;
