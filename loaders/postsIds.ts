export interface PostsIds {
    ids : number[]
}

export default async function postsIds() :  Promise<PostsIds>{
    
    const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty");
    const postsIds: number[] = await response.json();
    
    return {ids : postsIds};
}