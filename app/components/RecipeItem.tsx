import { motion } from "framer-motion";

const RecipeItem = ({
    item,
    handleClick,
}: {
    item: string;
    handleClick: any;
}) => {
    return (
        <motion.div
            className="flex justify-between bg-base-300 p-3 rounded-xl gap-5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            layout
        >
            <span className="mr-2">{item}</span>
            <button
                onClick={handleClick}
                className="btn btn-xs btn-error self-center"
            >
                Remove
            </button>
        </motion.div>
    );
};

export default RecipeItem;
