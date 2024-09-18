import React from "react";
import Link from "next/link";

const NavbarPage = () => {
    return (
        <div className="mb-3 rounded-lg shadow-lg navbar bg-base-200 shadow-gray-300">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                        <li>
                            <Link href={"/recipies/create"}>Create Recipe</Link>
                        </li>
                        <li>
                            <Link href={"/users/login"}>Login/Sign Up</Link>
                        </li>
                    </ul>
                </div>
                <Link
                    href={"/recipies"}
                    className="text-2xl btn btn-ghost lg:text-3xl calistoga-regular"
                >
                    whatscookin
                </Link>
            </div>
            <div className="hidden navbar-center lg:flex">
                <ul className="px-1 menu menu-horizontal">
                    <li>
                        <a>Item 1</a>
                    </li>
                    <li>
                        <a>Item 2</a>
                    </li>
                    <li>
                        <Link href={"/recipies/create"}>Create Recipe</Link>
                    </li>
                </ul>
            </div>
            <div className="hidden navbar-end lg:flex">
                <Link className="btn btn-ghost" href={"/users/login"}>
                    Login/Sign Up
                </Link>
            </div>
        </div>
    );
};

export default NavbarPage;
