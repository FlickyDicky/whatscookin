"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import getPb from "../pbinstance";

const CreateRecipie = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [newIngredient, setNewIngredient] = useState("");

    const addIngredient = () => {
        if (newIngredient.trim()) {
            setIngredients([...ingredients, newIngredient]);
            setNewIngredient("");
        }
    };

    const removeIngredient = (index: number) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    };

    const create = async (e: React.FormEvent) => {
        e.preventDefault();
        const pb = getPb();
        const authData = await pb.collection("users").authRefresh();

        const recipe = {
            name: name,
            description: description,
            ingredients: ingredients,
            user: pb.authStore.model?.id,
        };
        try {
            const res = await pb.collection("recipies").create(recipe);
            setName("");
            setDescription("");
            setIngredients([]);
            router.refresh();
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <h1>Create Recipe</h1>
            <form onSubmit={create}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        className="input input-bordered w-full max-w-xs"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="input input-bordered w-full max-w-xs"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="ingredients">Ingredients</label>
                    <div className="flex gap-2">
                        <input
                            id="ingredients"
                            className="input input-bordered w-full max-w-xs"
                            type="text"
                            value={newIngredient}
                            onChange={(e) => setNewIngredient(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={addIngredient}
                        >
                            Add Ingredient
                        </button>
                    </div>
                    <ul className="">
                        {ingredients.map((ingredient, index) => (
                            <li
                                key={index}
                                className="bg-base-200 max-w-xs p-2 flex justify-between items-center mt-2"
                            >
                                {ingredient}
                                <button
                                    type="button"
                                    className="btn btn-error btn-sm"
                                    onClick={() => removeIngredient(index)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button className="btn btn-primary" type="submit">
                    Create
                </button>
            </form>
        </div>
    );
};

export default CreateRecipie;
