import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost } from '../redux/postsSlice';
import {BsFillImageFill, BsCameraVideoFill} from 'react-icons/bs';
import axios from 'axios';

const AddNewPost = () => {
    const dispatch = useDispatch();

    const [post, setPost] = useState({
        text: '',
        img: {
            file: null,
            filePreview: null
        },
        video: {
            file: null,
            filePreview: null
        }
    });

    function handleChange(e) {
        const {name, value, files} = e.target;

        if(name === 'img') {
            setPost({
                ...post,
                [name]: {
                    file: files[0],
                    filePreview: URL.createObjectURL(files[0])
                },
                video: {
                    file: null,
                    filePreview: null
                }
            })
        } else if(name === 'video') {
            setPost({
                ...post,
                [name]: {
                    file: files[0],
                    filePreview: URL.createObjectURL(files[0])
                },
                img: {
                    file: null,
                    filePreview: null
                }
            })
        } else {
            setPost({
                ...post,
                [name]: value
            })
        }
    }

    const canSave = post.text || post.img.file || post.video.file;

    function handleSubmit(e) {
        e.preventDefault();

        if(canSave) {
            if(post.img.file) {
                const formData = new FormData();
                
                formData.append('text', post.text);
                formData.append('img', post.img.file);

                dispatch(addPost(formData))

            } else if(post.video.file) {
                const formData = new FormData();

                formData.append('text', post.text);
                formData.append('video', post.video.file);

                dispatch(addPost(formData));
            } else {
                dispatch(addPost({text: post.text}))
            }
        }
    }

    return (
       <form onSubmit={(e) => handleSubmit(e)} className="addNewPost">
            <textarea name="text" id="text" className="addNewPost__input" placeholder="Anything to share?" value={post.text} onChange={(e) => handleChange(e)} ></textarea>
            <div className="addNewPost__media">
                <label htmlFor="img" className="addNewPost__media__option">
                    <BsFillImageFill className="icon icon--media" />
                    {post.img.file && post.img.file.name}
                    <input type="file" name="img" id="img" files={[post.img.file]} onChange={(e) => handleChange(e)} />
                </label>
                <label htmlFor="video" className="addNewPost__media__option">
                    <BsCameraVideoFill className="icon icon--media" />
                    {post.video.file && post.video.file.name}
                    <input type="file" name="video" id="video" files={[post.video.file]} onChange={(e) => handleChange(e)} />
                </label>
            </div>
            <button className="btn btn--post">Post</button>
       </form>
    )
}

export default AddNewPost;