'use client';

import React, { useEffect, useState } from 'react';
import { fetchRecipeById } from '../../pocketbase';
import Link from 'next/link';
import Loading from './loading';

const RecipiePage = ({ params }: any) => {
    const [recipie, setRecipie] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;  // Track component mount status
        const controller = new AbortController();  // Create an AbortController

        const fetchRecipieData = async () => {
            try {
                const data = await fetchRecipeById(params.id, { signal: controller.signal });
                if (isMounted) {
                    setRecipie(data);
                }
            } catch (err: any) {
                if (isMounted) {
                    if (err) {
                        setError('Failed to fetch data');
                    }
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchRecipieData();

        return () => {
            isMounted = false;
            controller.abort();  // Abort the request if the component unmounts
        };
    }, [params.id]);

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <p>{error}</p>;
    }
    if (!recipie) {
        return <p>No recipe found</p>;
    }

    return (
        <div>
            <h1>{recipie.name}</h1>
            <p>{recipie.description}</p>
            <ul>
                {recipie.ingredients.map((ingredient: string, index: number) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <Link href="/recipies">
                <button className="btn btn-primary">Back</button>
            </Link>
        </div>
    );
};

export default RecipiePage;
