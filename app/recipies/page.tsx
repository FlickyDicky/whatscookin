import React from "react";
import RecipiesClient from "./RecipiesClient"; // Import the client-side component

const RecipiesPage = () => {
    return (
        <div>
            <h1>Welcome to the Recipe Page</h1>
            <RecipiesClient /> {/* Include the client-side component here */}
        </div>
    );
};

export default RecipiesPage;
