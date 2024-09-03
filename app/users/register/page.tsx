"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { register, login } from "../../pocketbase";

const RegisterUserPage = () => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [username, setUserName] = React.useState("");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [passwordConfirm, setPasswordConfirm] = React.useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await register(username, name, email, password, passwordConfirm)
            .then(async () => {
                await login(email, password);
            })
            .then(() => {
                setUserName("");
                setName("");
                setEmail("");
                setPassword("");
                setPasswordConfirm("");
                router.push("/recipies");
            })
            .catch((error: any) => {
                error.log(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="hero bg-secondary min-h-[30em] rounded-lg shadow-lg shadow-gray-300 py-8 md:px-8 xl:px-[15em]">
            <div className="hero-content flex-col lg:flex-row-reverse gap-[2em] lg:gap-[4em]">
                <motion.div
                    initial={{ opacity: 0, y: -100, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    className="text-center lg:text-left pointer-events-none"
                >
                    <h1 className="text-5xl lg:text-6xl font-bold calistoga-regular text-secondary-content pb-10">
                        whatscookin
                    </h1>
                    <h2 className="text-2xl font-bold text-secondary-content pb-2">
                        Join whatscookin Today!
                    </h2>
                    <p className="text-secondary-content hidden md:inline-block pb-8">
                        Become part of our vibrant community of food lovers and{" "}
                        <b>start sharing</b> your culinary creations with the
                        world. Whether you're a seasoned chef or just love to
                        experiment,{" "}
                        <b className="calistoga-regular">whatscookin</b> is the
                        perfect place for you.
                    </p>
                    <h2 className="text-2xl font-bold text-secondary-content pb-2 hidden md:inline-block">
                        Why Join Us?
                    </h2>
                    <ul className="list-none w-full text-secondary-content hidden md:inline-block pb-8 lg:list-disc lg:flex gap-5 flex-col">
                        <li>
                            <b>Discover Recipes:</b> Find new and exciting
                            recipes shared by food enthusiasts like you.
                        </li>
                        <li>
                            <b>Share Your Creations:</b> Post your own recipes
                            and get feedback from the community.
                        </li>
                        <li>
                            <b>Connect with Others:</b> Follow your favorite
                            cooks and build your network.
                        </li>
                    </ul>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl"
                >
                    <form className="card-body" onSubmit={handleRegister}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                placeholder="username"
                                className="input input-bordered"
                                value={username}
                                required
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="name"
                                className="input input-bordered"
                                value={name}
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
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
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Confirm Password
                                </span>
                            </label>
                            <input
                                type="password"
                                placeholder="confirm password"
                                className="input input-bordered"
                                value={passwordConfirm}
                                required
                                onChange={(e) =>
                                    setPasswordConfirm(e.target.value)
                                }
                            />
                            <label className="label">
                                <span className="label-text-alt">
                                    Already have an Account?{" "}
                                    <Link
                                        href={"/users/login"}
                                        className="label-text-alt link link-hover"
                                    >
                                        Log in
                                    </Link>
                                </span>
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
                                    Sign Up
                                </button>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default RegisterUserPage;
