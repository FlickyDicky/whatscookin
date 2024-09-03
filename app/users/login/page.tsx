"use client";
import React from "react";
import Link  from "next/link";
import { login as logIn, logout as logOut } from "../../pocketbase";

const LoginUserPage = () => {
    const [loading, setLoading] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await logIn(email, password);
            setEmail("");
            setPassword("");
        } catch (error: any) {
            error.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        logOut();
    };

    return (
        <div className="hero bg-secondary min-h-[30em] rounded-lg shadow-lg shadow-gray-300 py-8 xl:px-[15em]">
            <div className="hero-content flex-col lg:flex-row-reverse gap-[2em] lg:gap-[4em]">
                <div className="text-center lg:text-left pointer-events-none">
                    <h1 className="text-5xl lg:text-7xl font-bold calistoga-regular text-secondary-content">
                        whatscookin
                    </h1>
                    <p className="py-6 text-secondary-content hidden md:inline-block">
                        <b>Discover, share, and explore</b> an <b>endless</b>{" "}
                        variety of <b>recipes</b> from food lovers around the
                        world. Whether you're here to <b>share</b> your latest
                        culinary masterpiece or find <b>inspiration</b> for your
                        next meal, we’re excited to have you back in the kitchen
                        with us.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={login}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                value={password}
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label className="label">
                                <span className="label-text-alt">
                                    Don't have an account?{" "}
                                    <Link
                                        href={"/users/register"}
                                        className="label-text-alt link link-hover"
                                    >
                                        Sign up
                                    </Link>
                                </span>
                            </label>
                            <label className="label">
                                <Link
                                    href={"#"}
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            {loading ? (
                                <button className="btn">
                                    <span className="loading loading-spinner"></span>
                                    Please wait
                                </button>
                            ) : (
                                <button className="btn btn-primary">
                                    Login
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginUserPage;
