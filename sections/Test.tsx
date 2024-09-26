import { PostsIds } from "site/loaders/postsIds.ts";

export interface Props {
    postsIds?: PostsIds
}


export default function GuestSearchSection(props : Props)  {
    
    const {postsIds} = props

    return (
        <div>
            {postsIds?.ids.map((id) => {
                <span>{id}</span>
            })}
        </div>
    )
}