import getPb from "./pbinstance";
// Initialize PocketBase instance
const pb = getPb();
// Function to fetch recipes with pagination
export const fetchRecipes = async (
    page: number,
    pageSize: number,
    options: any
) => {
    const resultList = await pb
        .collection("recipies")
        .getList(page, pageSize, options);
    return resultList.items;
};

// Example function to fetch a single recipe by ID
export async function fetchRecipeById(id: string, options?: any) {
    const recipe = await pb.collection("recipies").getOne(id, options);
    return recipe;
}

// Example function to handle authentication (login)
export const login = async (email: string, password: string) => {
    const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
    localStorage.setItem("pb_token", authData.token); // Store token in localStorage
    return authData;
};

// Example function to check if user is authenticated
export const isAuthenticated = () => {
    return pb.authStore.isValid;
};

// Example function to log out
export const logout = () => {
    pb.authStore.clear();
    localStorage.removeItem("pb_token");
};
