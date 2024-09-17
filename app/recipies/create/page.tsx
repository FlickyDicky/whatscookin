"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createRecipe } from "../../pocketbase";
import getPb from "../../../pbinstance";
import { motion } from "framer-motion";
import CountrySelector from "@/app/components/CountrySelector";
import { Clock, Plus } from "lucide-react";

const CreateRecipie = () => {
    const pb = getPb();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [liveImg, setliveImg] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [newIngredient, setNewIngredient] = useState("");
    const [instructions, setInstructions] = useState<string[]>([]);
    const [newInstruction, setNewInstruction] = useState("");
    const [timeMinutes, setTimeMinutes] = useState("");
    const [country, setCountry] = useState("");

    const handleCountrySelect = (countryCode: string) => {
        setCountry(countryCode);
    };

    const addIngredient = (e: any) => {
        e.preventDefault();
        if (newIngredient.trim()) {
            setIngredients([...ingredients, newIngredient]);
            setNewIngredient("");
        }
    };

    const addInstruction = (e: any) => {
        e.preventDefault();
        if (newInstruction.trim()) {
            setInstructions([...instructions, newInstruction]);
            setNewInstruction("");
        }
    };

    const removeIngredient = (index: number) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    };

    const removeInstruction = (index: number) => {
        const updatedInstructions = instructions.filter((_, i) => i !== index);
        setInstructions(updatedInstructions);
    };

    const onImageChange = (e: any) => {
        if (e.target.files && e.target.files[0]) {
            setImg(e.target.files[0]);
            setliveImg(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleDescription = (e: any) => {
        const value = e.target.value.slice(0, 200);
        setDescription(value);
    };

    const create = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const recipe = {
            name: name,
            img: img,
            description: description,
            ingredients: ingredients,
            user: pb.authStore.model?.id,
            instructions: instructions,
            time_minutes: timeMinutes,
            country: country,
        };
        await createRecipe(recipe)
            .then(() => {
                setName("");
                setDescription("");
                setImg("");
                setliveImg("");
                setIngredients([]);
                setInstructions([]);
                setTimeMinutes("0");
                setCountry("");
                router.refresh();
            })
            .catch((error: any) => {
                console.error(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="hero">
            <div className="hero-content flex-col-reverse lg:flex-row-reverse gap-5 p-0 w-full max-w-full">
                <motion.div
                    initial={{ opacity: 0, y: -100, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    className="text-center lg:text-left flex-grow self-start flex flex-col gap-5 z-10"
                >
                    <div className="shadow-lg rounded-3xl bg-base-200 h-[30rem]">
                        {img ? (
                            <img
                                src={liveImg}
                                alt=""
                                className="object-cover w-full rounded-3xl h-full"
                            />
                        ) : (
                            <div className="w-full grid place-content-center h-full text-center">
                                <h1 className="calistoga-regular text-5xl">
                                    whatscookin
                                </h1>
                                <p>Your recipe image goes here!</p>
                            </div>
                        )}
                    </div>
                    <div className="p-8 shadow-lg rounded-3xl bg-base-200">
                        <h2 className="mb-5 text-xl calistoga-regular">
                            Ingredients
                        </h2>
                        <ul className="flex-col hidden w-full gap-3 pb-8 md:inline-block list-disc list-inside lg:flex">
                            {ingredients.map((ingredient, index) => (
                                <li key={index}>
                                    <span className="mr-2">{ingredient}</span>
                                    <button
                                        onClick={() => removeIngredient(index)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-8 shadow-lg rounded-3xl bg-base-200">
                        <h2 className="mb-5 text-xl calistoga-regular">
                            Instructions
                        </h2>
                        <ul className="flex-col hidden w-full gap-3 pb-8 md:inline-block list-decimal list-inside lg:flex">
                            {instructions.map((instruction, index) => (
                                <li key={index}>
                                    <span className="mr-2">{instruction}</span>
                                    <button
                                        onClick={() => removeInstruction(index)}
                                        className="btn btn-xs btn-error"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-sm shadow-2xl card bg-base-100 shrink-0 self-start"
                >
                    <form className="card-body" onSubmit={create}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Recipe name</span>
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
                                <span className="label-text">Recipe image</span>
                            </label>
                            <input
                                type="file"
                                onChange={onImageChange}
                                className="file-input file-input-bordered w-full"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                                {description.length !== 200 ? (
                                    <span className="label-text opacity-75">
                                        {description.length}/200
                                    </span>
                                ) : (
                                    <span className="label-text text-error">
                                        {description.length}/200
                                    </span>
                                )}
                            </label>
                            <textarea
                                placeholder="description"
                                className="textarea textarea-bordered"
                                value={description}
                                required
                                onChange={handleDescription}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Total cooking time
                                </span>
                            </label>
                            <label className="input input-bordered flex items-center gap-2">
                                <input
                                    type="nuber"
                                    placeholder="time in minutes"
                                    className="grow"
                                    value={timeMinutes}
                                    required
                                    onChange={(e) => setTimeMinutes(e.target.value)}
                                />
                                <Clock className="opacity-50" />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Country</span>
                            </label>
                            <CountrySelector
                                onCountrySelect={handleCountrySelect}
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Add Ingredients
                                </span>
                            </label>
                            <label className="flex justify-between gap-2 input input-bordered">
                                <input
                                    type="text"
                                    placeholder="ingredient"
                                    value={newIngredient}
                                    onChange={(e) =>
                                        setNewIngredient(e.target.value)
                                    }
                                />
                                <button
                                    onClick={addIngredient}
                                    className="self-center btn btn-sm btn-circle btn-outline"
                                >
                                    <Plus />
                                </button>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Add Instructions
                                </span>
                            </label>
                            <div className="flex justify-between gap-3">
                                <textarea
                                    className="flex-grow textarea textarea-bordered"
                                    placeholder="instruction"
                                    value={newInstruction}
                                    onChange={(e) =>
                                        setNewInstruction(e.target.value)
                                    }
                                />
                                <button
                                    onClick={addInstruction}
                                    className="self-center btn btn-circle btn-sm btn-outline"
                                >
                                    <Plus />
                                </button>
                            </div>
                        </div>
                        <div className="mt-6 form-control">
                            {loading ? (
                                <button className="btn">
                                    <span className="loading loading-spinner"></span>
                                    Please wait
                                </button>
                            ) : (
                                <button className="btn btn-primary">
                                    Create Recipe
                                </button>
                            )}
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default CreateRecipie;
