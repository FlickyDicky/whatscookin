import getPb from "../pbinstance";
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

export const fetchRecipieImage = async (recipe: any) => {
    const image = pb.files.getUrl(recipe, recipe.img);
    return image;
}

export async function fetchRecipeById(id: string, options?: any) {
    const recipe = await pb.collection("recipies").getOne(id, options);
    return recipe;
}

export const createRecipe = async (recipe: any) => {
    const res = await pb.collection("recipies").create(recipe);
    return res;
};

export const register = async (username: string, name: string, email: string, password: string, passwordConfirm: string) => {
    const user = {
        username: username,
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
    }
    const authData = await pb
        .collection("users")
        .create(user);
    return authData;
}

export const login = async (email: string, password: string) => {
    const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
    return authData;
};

export const isAuthenticated = () => {
    return pb.authStore.isValid;
};

export const logout = () => {
    pb.authStore.clear();
    localStorage.removeItem("pb_token");
};
