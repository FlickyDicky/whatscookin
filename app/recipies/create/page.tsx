"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { createRecipe } from "../../pocketbase";
import RecipeItem from "@/app/components/RecipeItem";
import getPb from "../../../pbinstance";
import { AnimatePresence, motion } from "framer-motion";
import CountrySelector from "@/app/components/CountrySelector";
import { Clock, SquarePlus, PencilRuler } from "lucide-react";

interface ListItem {
    id: number;
    content: string;
}

const CreateRecipie = () => {
    const pb = getPb();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [liveImg, setliveImg] = useState("");
    const [description, setDescription] = useState("");
    const [ingredients, setIngredients] = useState<ListItem[]>([]);
    const [newIngredient, setNewIngredient] = useState("");
    const [instructions, setInstructions] = useState<ListItem[]>([]);
    const [newInstruction, setNewInstruction] = useState("");
    const [timeMinutes, setTimeMinutes] = useState("");
    const [country, setCountry] = useState("");

    const handleCountrySelect = (countryName: string) => {
        setCountry(countryName);
    };

    const addIngredient = (e: any) => {
        e.preventDefault();
        if (newIngredient.trim()) {
            const newItem: ListItem = {
                id: ingredients.length,
                content: newIngredient,
            };
            setIngredients([...ingredients, newItem]);
            setNewIngredient("");
        }
    };

    const addInstruction = (e: any) => {
        e.preventDefault();
        if (newInstruction.trim()) {
            const newItem: ListItem = {
                id: ingredients.length,
                content: newIngredient,
            };
            setInstructions([...instructions, newItem]);
            setNewInstruction("");
        }
    };

    const removeIngredient = (index: number) => {
        setIngredients((pv) => pv.filter((_, i) => i !== index));
    };

    const removeInstruction = (index: number) => {
        setInstructions((pv) => pv.filter((_, i) => i !== index));
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
            <div className="hero-content lg:flex-row-reverse gap-5 p-0 w-full max-w-full drawer lg:drawer-open">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <motion.div
                    initial={{ opacity: 0, y: -100, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    className="text-left flex-grow self-start flex w-full flex-col gap-5 drawer-content"
                >
                    <div className="flex sticky lg:static justify-between lg:justify-center items-center w-full top-5 bg-base-100 shadow-lg rounded-3xl p-5 z-10">
                        <h3 className="text-sm md:text-md lg:text-2xl">
                            Create your recipe{" "}
                            <span className="opacity-50">step by step</span>
                        </h3>
                        <label
                            htmlFor="my-drawer-2"
                            className="btn btn-primary btn-sm md:btn-md lg:btn-lg drawer-button lg:hidden"
                        >
                            Toolbox
                            <PencilRuler />
                        </label>
                    </div>
                    <div className="shadow-lg rounded-3xl bg-base-200 w-full aspect-video">
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
                        <span className="flex justify-between mb-5">
                            <h1 className="text-2xl calistoga-regular">
                                {name ? name : "Recipe Name"}
                            </h1>
                            <div className="flex gap-2">
                                <span className="badge badge-outline opacity-60 self-center">
                                    {country ? country : "Country"}
                                </span>
                                <span className="badge badge-outline opacity-60 self-center">
                                    {timeMinutes ? timeMinutes : 0} mins
                                </span>
                            </div>
                        </span>
                        <p>
                            {description ? description : "Recipe description"}
                        </p>
                    </div>
                    <div className="p-8 shadow-lg rounded-3xl bg-base-200">
                        <h2 className="mb-5 text-xl calistoga-regular">
                            Ingredients
                        </h2>
                        <div className="flex-col flex w-full gap-3 pb-8">
                            <AnimatePresence>
                                {ingredients.map((item, index) => (
                                    <RecipeItem
                                        key={item.id}
                                        item={item.content}
                                        handleClick={() =>
                                            removeIngredient(index)
                                        }
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className="p-8 shadow-lg rounded-3xl bg-base-200">
                        <h2 className="mb-5 text-xl calistoga-regular">
                            Instructions
                        </h2>
                        <div className="flex-col w-full gap-3 pb-8 flex">
                            <AnimatePresence>
                                {instructions.map((item, index) => (
                                    <RecipeItem
                                        key={item.id}
                                        item={item.content}
                                        handleClick={() =>
                                            removeInstruction(index)
                                        }
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full lg:shadow-lg rounded-none lg:rounded-3xl card shrink-0 self-start drawer-side"
                >
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <form
                        className="card-body rounded-none bg-base-100 min-h-full w-3/4 lg:w-full"
                        onSubmit={create}
                    >
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
                                    onChange={(e) =>
                                        setTimeMinutes(e.target.value)
                                    }
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
                                    className="w-full"
                                    onChange={(e) =>
                                        setNewIngredient(e.target.value)
                                    }
                                />
                                <button
                                    onClick={addIngredient}
                                    className="self-center btn btn-sm btn-circle btn-ghost"
                                >
                                    <SquarePlus />
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
                                    className="self-center btn btn-circle btn-sm btn-ghost"
                                >
                                    <SquarePlus />
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
