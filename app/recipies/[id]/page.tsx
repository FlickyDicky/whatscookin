import Link from "next/link";
import React from "react";

const getRecipie = async (id: string) => {
    const res = await fetch(`https://whatscookin.pockethost.io/api/collections/recipies/records/${id}`);
    const recipie = await res.json();
    return recipie;
};

const RecipiePage = async ({ params }: any) => {
    const recipie = await getRecipie(params.id);

    return (
        <div>
            <h1>{recipie?.name}</h1>
            <p>{recipie?.description}</p>
            <ul>
                {recipie?.ingredients.map((ingredient: string) => (
                    <li key={ingredient}>{ingredient}</li>
                ))}
            </ul>
            <Link href="/recipies">
                <button className="btn btn-primary">Back</button>
            </Link>
        </div>
    );
};

export default RecipiePage;
