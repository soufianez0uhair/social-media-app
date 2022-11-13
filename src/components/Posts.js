import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, getStatusPosts, getErrorPosts, fetchPosts } from "../redux/postsSlice";
import Loader from "./Loader";
import Post from "./Post";

const Posts = () => {
    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getStatusPosts);
    const postsError = useSelector(getErrorPosts);

    useEffect(() => {
        if(postsStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postsStatus, dispatch]);

    let postsEl = '';
    if(postsStatus === 'loading') {
        postsEl = <Loader />
    } else if(postsStatus === 'succeeded') {
        postsEl = posts.map(post => {
            return <Post post={post} />
        })
    }

    return (
        <div className="posts">
            {
                postsEl
            }
        </div>
    )
}

export default Posts;