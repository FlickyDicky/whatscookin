"use client";

import React, { useState, useCallback } from "react";
import { Heart } from "lucide-react";
import RecipiesList from "./RecipiesList";
import getPb from "../../pbinstance";
import Link from "next/link";

const RecipiesPage = () => {
    const pb = getPb();
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
            <div className="grid gap-8 mt-5 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
                {recipiesList.map((recipe, index: number) => (
                    <div
                        key={index}
                        className="w-full h-full shadow-lg card rounded-3xl bg-base-100"
                    >
                        <figure className="relative">
                            {recipe.img ? (
                                <img
                                    src={pb.getFileUrl(recipe, recipe.img)}
                                    alt={recipe.name}
                                    className="h-60 w-full object-cover"
                                />
                            ) : (
                                <img
                                    className="h-60 w-full object-cover"
                                    src="https://dummyimage.com/1920x1080/9c9c9c/000"
                                    alt="Random Food Photo"
                                />
                            )}
                            <div className="absolute flex justify-end inset-0 bg-gradient-to-b from-40% from-transparent to-black opacity-50 p-3">
                                <Heart className="self-end text-white" />
                            </div>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title calistoga-regular">
                                {recipe.name || "Recipe Name"}
                            </h2>
                            <p>
                                {recipe.description ||
                                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                            </p>
                            <Link href={"recipies/" + recipe.id}>
                                <button className="mt-8 shadow-lg shadow-base-300 btn btn-circle btn-block btn-secondary">
                                    See Recipie
                                </button>
                            </Link>
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
