"use client"; // Ensures this component runs on the client side
import CreateRecipie from "./CreateRecipie";
import React, { useEffect, useState } from "react";
import getPb from "../pbinstance"; // Ensure this provides the correct PocketBase instance
import Link from "next/link";

const RecipiesClient = () => {
    const [recipies, setRecipies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const pb = getPb();

    useEffect(() => {
        let isMounted = true; // Track component mount status

        const fetchRecipies = async () => {
            try {
                if (isMounted) {
                    const resultList = await pb
                        .collection("recipies")
                        .getList(1, 50);
                    setRecipies(resultList.items);
                }
            } catch (err: any) {
                if (isMounted) {
                    setError("Failed to fetch data");
                }
                console.error(err.message);
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        fetchRecipies();
        const handleSubscription = async () => {
            await fetchRecipies();
        };
        pb.collection("recipies").subscribe("*", handleSubscription);
        return () => {
            isMounted = false;
            // Unsubscribe from all subscriptions
            pb.collection("recipies").unsubscribe("*");
        };
    }, [pb]); // Dependency array includes `pb` to ensure the instance is used

    if (loading) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (!recipies.length && !loading) {
        return <p>No recipies found</p>;
    }

    return (
        <div>
            <h1>Recipies</h1>
            {recipies.map((recipie: any) => (
                <div key={recipie.id} className="card bg-neutral text-neutral-content w-96 my-3">
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{recipie.name}</h2>
                        <p>{recipie.description}</p>
                        <ul>
                            {recipie.ingredients.map(
                                (ingredient: string, index: number) => (
                                    <div
                                        key={index}
                                        className="badge badge-primary mx-1"
                                    >
                                        <li>{ingredient}</li>
                                    </div>
                                )
                            )}
                        </ul>
                        <div className="card-actions justify-end">
                            <Link
                                key={recipie.id}
                                href={`/recipies/${recipie.id}`}
                            >
                                <button className="btn btn-secondary">
                                    Check Recipie
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
            <CreateRecipie />
        </div>
    );
};

export default RecipiesClient;
