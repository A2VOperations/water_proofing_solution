import { getYoutubeShortsAction } from "./app/actions/admin.js";

async function test() {
    const res = await getYoutubeShortsAction();
    console.log("Result:", res);
}

test();
