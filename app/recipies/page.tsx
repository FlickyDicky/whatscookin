"use client"; // Ensures this component runs on the client side
import CreateRecipie from "./CreateRecipie";
import React, { useEffect, useState } from "react";
import getPb from "../pbinstance"; // Ensure this provides the correct PocketBase instance
import Link from "next/link";
import Loading from "./loading";

const RecipiesPage = () => {
    const [recipies, setRecipies] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasNextPage, setHasNextPage] = useState(true);
    const pb = getPb();
    const scrollTop = () => {
        window.scrollTo(0, 0);
    }

    const pageSize = 6;

    const handlePageNext = () => {
        setPage(p => p + 1);
        scrollTop();
    };
    const handlePagePrev = () => {
        setPage(p => p - 1);
    };

    useEffect(() => {
        let isMounted = true; // Track component mount status

        const fetchRecipies = async () => {
            setLoading(true);
            try {
                const resultList = await pb
                    .collection("recipies")
                    .getList(page, pageSize);
                if (isMounted) {
                    setRecipies(resultList.items);
                    const nextPageResult = await pb.collection("recipies").getList(page + 1, pageSize);
                    setHasNextPage(nextPageResult.items.length > 0);
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
    }, [pb, page]); // Dependency array includes `pb` to ensure the instance is used

    if (loading) {
        return (
            <div className="flex justify-center flex-wrap">
                {Array.from({ length: pageSize }).map((_, index) => (
                    <Loading key={index} />
                ))}
            </div>
        );
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (!recipies.length && !loading) {
        return <p>No recipies found</p>;
    }

    return (
        <div>
            <div className="flex flex-wrap justify-center">
                {recipies.map((recipie: any) => (
                    <div
                        key={recipie.id}
                        className="card bg-neutral text-neutral-content w-96 my-3 mx-3"
                    >
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
            </div>
            <CreateRecipie />
            <div className="flex justify-center">
                <div className="join grid grid-cols-2 w-60">
                    <button
                        className="join-item btn btn-primary"
                        onClick={handlePagePrev}
                        disabled={page === 1}
                    >
                        Prev
                    </button>
                    <button
                        className="join-item btn btn-primary"
                        onClick={handlePageNext}
                        disabled={!hasNextPage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RecipiesPage;
