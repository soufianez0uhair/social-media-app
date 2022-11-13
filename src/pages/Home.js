import AddNewPost from "../components/AddNewPost";
import Posts from "../components/Posts";

const Home = () => {
    return (
        <div className="home">
            <AddNewPost />
            <Posts />
        </div>
    )
}

export default Home;