"use client";

import React, { useState, useEffect } from "react";
import { fetchRecipes } from "../pocketbase";
import Loading from "./loadingTemplate";

const RecipiesList = ({
    page,
    addMoreRecipes,
    setLoading,
}: {
    page: number;
    addMoreRecipes: (recipes: any[], hasMore: boolean) => void;
    setLoading: (isLoading: boolean) => void;
}) => {
    const [error, setError] = useState<string | null>(null);
    const itemsPerPage = 6;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const fetchData = async () => {
            setLoading(true);
            setIsLoading(true);
            try {
                const data = await fetchRecipes(page, itemsPerPage, {
                    signal: controller.signal,
                });
                if (isMounted) {
                    addMoreRecipes(data, data.length === itemsPerPage);
                }
            } catch (err: any) {
                if (isMounted && err.name !== "AbortError") {
                    setError("Failed to fetch data");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                    setIsLoading(false);
                }
            }
        };
        fetchData();
        return () => {
            isMounted = false;
            controller.abort();
        };
    }, [page]); // Only trigger when the page changes
    if (isLoading) {
        return (
            <div className="flex flex-wrap justify-center">
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                    <Loading key={index} />
                ))}
            </div>
        );
    } else if (error) {
        return <p>{error}</p>;
    }

    return null; // This component doesn't render directly. It uses the callback to add recipes to the parent.
};

export default RecipiesList;
