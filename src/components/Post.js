import {AiFillLike, AiFillHeart} from 'react-icons/ai';
import HahaEmoji from '../assets/emoji-haha.png';
import WowEmoji from '../assets/emoji-wow.png';

const Post = ({post}) => {
    const {text, img, video, likes, comments, shares, userId} = post;

    console.log(img, video);
    return (
        <div className="post">
            <div className="post__owner">

            </div>
            {text && <h3 style={{fontSize: text.length < 20 ? '1.8rem' : '1.3rem'}} className="post__text">{text}</h3>}
            {img && <img src={img} alt="post image" className="post__img" /> }
            {video && <video controls width="100%" >
                <source src={video} type={`video/${video.split('.')[1]}`} />
            </video> }
            <div className="post__actions">
                <div className="post__actions__option post__actions__option--react">
                    <span className="post__actions__option__name">like</span>
                    <div className="post__actions__option--react__reactions">
                        <AiFillLike className="icon icon--reaction" />
                        <AiFillHeart className="icon icon--reaction" />
                        <img src={HahaEmoji} alt="reaction" className="post__actions__option--react__reactions__img" />
                        <img src={WowEmoji} alt="reaction" className="post__actions__option--react__reactions__img" />
                    </div>
                </div>
                <div className="post__actions__option post__actions__option--comment">
                    <span className="post__actions__option__name">Comment</span>
                </div>
                <div className="post__actions__option post__actions__option--share">
                    <span className="post__actions__option__name">Share</span>
                </div>
            </div>
        </div>
    )
}

export default Post;