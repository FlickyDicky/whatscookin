"use client";

import React, { useState, useCallback } from "react";
import RecipiesList from "./RecipiesList";
import Link from "next/link";

const RecipiesPage = () => {
    const [recipiesList, setRecipiesList] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleLoadMore = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleLoadingState = (isLoading: boolean) => {
        setLoading(isLoading);
    };

    const addMoreRecipes = useCallback(
        (newRecipies: any[], hasMoreItems: boolean) => {
            setRecipiesList((r) => [...r, ...newRecipies]);
            setHasMore(hasMoreItems);
        },
        []
    );

    return (
        <>
            <div className="flex gap-8 flex-wrap justify-center mt-5">
                {recipiesList.map((recipe, index: number) => (
                    <div
                        key={index}
                        className="card bg-base-100 w-96 shadow-lg flex-grow"
                    >
                        <figure>
                            <img
                                src="https://dummyimage.com/1920x1080/999999/000"
                                alt="Random Food Photo"
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                {recipe.name || "Recipe Name"}
                            </h2>
                            <p>
                                {recipe.description ||
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                            </p>
                            <div className="card-actions justify-between">
                                <Link href={"recipies/" + recipe.id}>
                                    <button className="btn">See Recipie</button>
                                </Link>
                                <div className="flex gap-2 self-end">
                                    {recipe.ingredients &&
                                        Array.from(recipe.ingredients).map(
                                            (
                                                ingredient: any,
                                                index: number
                                            ) => (
                                                <div
                                                    key={index}
                                                    className="badge badge-primary"
                                                >
                                                    {ingredient}
                                                </div>
                                            )
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>{" "}
            {/* Render RecipiesList component and pass the addMoreRecipes callback */}
            <RecipiesList
                page={page}
                addMoreRecipes={addMoreRecipes}
                setLoading={handleLoadingState}
            />
            <div className="flex justify-center">
                <button
                    className="btn btn-outline mt-5 w-[100%]"
                    onClick={handleLoadMore}
                    disabled={!hasMore || loading}
                >
                    {loading ? "Loading..." : "Load More"}
                </button>
            </div>
        </>
    );
};

export default RecipiesPage;
