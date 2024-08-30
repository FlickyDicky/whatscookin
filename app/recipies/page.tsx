"use client"; // Ensures this component runs on the client side

import React, { useEffect, useState } from "react";
import { fetchRecipes } from "../pocketbase"; // Import the service
import Link from "next/link";
import Loading from "./loading";

const RecipiesPage = () => {
    const [recipies, setRecipies] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasNextPage, setHasNextPage] = useState(true); // To handle next button disable
    const itemsPerPage = 6;

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController(); // Controller to handle request cancellation

        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await fetchRecipes(page, itemsPerPage, { signal: controller.signal });
                if (isMounted) {
                    setRecipies(data);
                    // Determine if there's a next page
                    setHasNextPage(data.length === itemsPerPage);
                }
            } catch (err: any) {
                if (isMounted) {
                    if (err.name !== "AbortError") {
                        setError("Failed to fetch data");
                    }
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
            controller.abort(); // Cancel any ongoing request
        };
    }, [page]);

    const handlePagePrev = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handlePageNext = () => {
        if (hasNextPage) {
            setPage(page + 1);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center flex-wrap">
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                    <Loading key={index} />
                ))}
            </div>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!recipies.length) {
        return <p>No recipes found</p>;
    }

    return (
        <div>
            <div className="flex flex-wrap justify-center">
                {recipies.map((recipie: any) => (
                    <div key={recipie.id} className="card bg-neutral text-neutral-content w-96 my-3 mx-3">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{recipie.name}</h2>
                            <p>{recipie.description}</p>
                            <ul>
                                {recipie.ingredients.map((ingredient: string, index: number) => (
                                    <div key={index} className="badge badge-primary mx-1">
                                        <li>{ingredient}</li>
                                    </div>
                                ))}
                            </ul>
                            <div className="card-actions justify-end">
                                <Link href={`/recipies/${recipie.id}`}>
                                    <button className="btn btn-secondary">Check Recipe</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <button className="btn btn-primary" onClick={handlePagePrev} disabled={page === 1}>
                    Prev
                </button>
                <button className="btn btn-primary" onClick={handlePageNext} disabled={!hasNextPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default RecipiesPage;
