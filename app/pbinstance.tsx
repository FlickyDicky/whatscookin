import PocketBase from "pocketbase";

let pb: PocketBase;

function getPb() {
    if (!pb) {
        pb = new PocketBase('https://whatscookin.pockethost.io/');
    }
    return pb;
}

export default getPb;
