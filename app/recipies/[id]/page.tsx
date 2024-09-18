"use client";

import React, { useEffect, useState } from "react";
import { fetchRecipeById } from "../../pocketbase";
import Link from "next/link";
import Loading from "./loading";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";

const RecipiePage = ({ params }: any) => {
    const [recipie, setRecipie] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [liked, setLiked] = useState(false);
    const [copySuccess, setCopySuccess] = useState("");

    const handleTooltip = () => {
        setCopySuccess("");
    };

    const copyToClipboard = async () => {
        const textToCopy = recipie.ingredients.join("\n");

        if (!navigator.clipboard) {
            console.error("Clipboard API not available");
            return;
        }

        try {
            await navigator.clipboard.writeText(textToCopy);
            setCopySuccess("Text copied to clipboard!");
        } catch (err) {
            setCopySuccess("Failed to copy text.");
            console.error("Error copying text to clipboard: ", err);
        }
    };

    const handleHeart = () => {
        setLiked(!liked);
    };

    useEffect(() => {
        let isMounted = true; // Track component mount status
        const controller = new AbortController(); // Create an AbortController

        const fetchRecipieData = async () => {
            try {
                const data = await fetchRecipeById(params.id, {
                    signal: controller.signal,
                });
                if (isMounted) {
                    setRecipie(data);
                }
            } catch (err: any) {
                if (isMounted) {
                    if (err) {
                        setError("Failed to fetch data");
                    }
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchRecipieData();

        return () => {
            isMounted = false;
            controller.abort(); // Abort the request if the component unmounts
        };
    }, [params.id]);

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (!recipie) {
        return <p>No recipe found</p>;
    }

    return (
        <div className="flex flex-col grid-cols-12 gap-5 md:grid">
            <motion.figure
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="col-span-8 shadow-lg rounded-3xl shadow-base-300"
            >
                <img
                    className="w-full rounded-3xl object-cover h-[25em]"
                    src={"../images/food.jpg"}
                    alt="Random Food Photo"
                />
            </motion.figure>
            <div className="flex flex-col col-span-4 gap-5">
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    className="flex-grow p-8 shadow-lg bg-secondary rounded-3xl shadow-base-300 text-secondary-content"
                >
                    <h1 className="mb-3 text-2xl font-bold md:text-4xl calistoga-regular">
                        {recipie.name}
                    </h1>
                    <p>{recipie.description}</p>
                </motion.div>
                <div className="flex gap-5">
                    <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                        className="flex-1 col-span-2 shadow-lg btn btn-base-200 btn-circle shadow-base-300"
                        onClick={handleHeart}
                    >
                        34.5k
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill={
                                liked ? "oklch(71.76% .221 22.18 /1)" : "none"
                            }
                            viewBox="0 0 24 24"
                            stroke={
                                liked
                                    ? "oklch(71.76% .221 22.18 /1)"
                                    : "currentColor"
                            }
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </motion.button>
                    <Link href="/recipies" className="flex-1 col-span-2">
                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            viewport={{ once: true }}
                            className="w-full shadow-lg btn btn-outline btn-circle shadow-base-300"
                        >
                            Back
                        </motion.button>
                    </Link>
                </div>
            </div>
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
                className="flex col-span-4 p-10 shadow-lg place-content-center bg-secondary rounded-3xl shadow-base-300 lg:min-h-96"
            >
                <ul
                    onClick={copyToClipboard}
                    onMouseEnter={handleTooltip}
                    data-tip={copySuccess ? copySuccess : "Copy"}
                    className="bg-[#eae672] text-[#412b16] -rotate-2 tooltip text-left flex-1 shadow-2xl hover:shadow-xl hover:rotate-1 p-8 hover:scale-105 transition-all duration-200 hover:cursor-pointer"
                >
                    <li>
                        <h3 className="mb-3 text-lg font-bold lg:text-2xl calistoga-regular">
                            Ingredients
                        </h3>
                    </li>
                    <div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2">
                        {recipie.ingredients.map(
                            (ingredient: string, index: number) => (
                                <li key={index}>{ingredient}</li>
                            )
                        )}
                    </div>
                </ul>
            </motion.div>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
                className="col-span-8 shadow-lg bg-base-200 rounded-3xl shadow-base-300 overflow-y-scroll"
            >
                <h1 className="flex gap-2 p-8 text-2xl calistoga-regular md:text-4xl">
                    Preparation{" "}
                    <span className="flex self-center gap-1 font-sans opacity-75 badge badge-outline text-md md:text-lg h-fit w-fit">
                        {recipie.time_minutes + "min"}{" "}
                        <Clock size={"16"} className="self-center inline" />
                    </span>
                </h1>
                <ul className="pl-8 list-decimal list-inside">
                    {recipie.instructions && recipie.instructions.map(
                        (step: string, index: number) => (
                            <li key={index} className="">
                                {step}
                            </li>
                        )
                    )}
                </ul>
            </motion.div>
        </div>
    );
};

export default RecipiePage;
