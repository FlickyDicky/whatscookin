import React from "react";

const loading = () => {
    return (
        <div className="px-3 py-3">
            <div className="flex flex-col gap-4 w-96">
                <div className="w-full h-32 skeleton"></div>
                <div className="h-4 skeleton w-28"></div>
                <div className="w-full h-4 skeleton"></div>
                <div className="w-full h-4 skeleton"></div>
            </div>
        </div>
    );
};

export default loading;
