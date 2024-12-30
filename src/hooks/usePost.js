import useFireStore from "./useFireStore";
import { getDocumentById } from "../firebase/service";

import { useState, useEffect } from "react";

function usePost() {
    // const postOrigin = useFireStore("posts");
    const postShares = useFireStore("shares");

    useEffect(() => {
        const fetchData = async () => {
            const postShareWithOrigin = await Promise.all(
                postShares.map(async (postShare) => {
                    return new Promise((resolve) => {
                        getDocumentById("posts", postShare.post_id, ({user_id, imageURL, caption, createdAt}) => {
                            resolve({
                                user_post: user_id, 
                                image_posts: imageURL, 
                                caption_post: caption, 
                                createdAt_post: createdAt,
                                ...postShare
                            });
                        })
                    })
                })
            )
        }
        
    }, [])

    return (  );
}

export default usePost;