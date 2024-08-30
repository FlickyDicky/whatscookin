import getPb from "./pbinstance";
const pb = getPb();

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

export async function fetchRecipeById(id: string, options?: any) {
    const recipe = await pb.collection("recipies").getOne(id, options);
    return recipe;
}

export const login = async (email: string, password: string) => {
    const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
    localStorage.setItem("pb_token", authData.token);
    return authData;
};

export const isAuthenticated = () => {
    return pb.authStore.isValid;
};

export const logout = () => {
    pb.authStore.clear();
    localStorage.removeItem("pb_token");
};
