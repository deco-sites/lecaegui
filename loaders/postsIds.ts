export interface PostsIds {
    ids : number[]
}

export async function postsIds() {
    
    const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty");
    const postsIds: number[] = await response.json();

    return {ids : postsIds};
}