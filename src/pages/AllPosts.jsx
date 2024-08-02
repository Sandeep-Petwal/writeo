import { useState, useEffect } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import { Link, useNavigate } from "react-router-dom";
import LoadingImage from "../../public/Loading.gif";
import { useSelector, useDispatch } from "react-redux";
import { statePosts } from "../store/authSlice";


function AllPosts() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const status = useSelector((state) => state.auth.status);
  const state_posts = useSelector((state) => state.auth.posts);

  useEffect(() => {
    if (status) {
      // setting the posts first time (not availble)
      if (state_posts == null) {
        appwriteService.getPosts().then((posts) => {
          if (posts) {
            setPosts(posts.documents);
            setLoading(false);
            dispatch(statePosts(posts.documents));
          }
          if (!posts.ok) {
            setLoading(false);
          }
        });
      } else {
        // if posts from state is availble
        setPosts(state_posts);
        // console.log("posts :: " , state_posts);
        setLoading(false);
      }

      //2. getting posts from getPosts
      //   appwriteService.getPosts([]).then((posts) => {
      //     if (posts) {
      //       console.log("All posts are : ", posts);
      //       setPosts(posts.documents);
      //       setLoading(false)
      //     }
      //   });
      // }else{
      //   setLoading(false);
      //   navigate("/");
      // }
    } else {
      setLoading(false);
      navigate("/");
    }
  }, []);

  if (loading) {
    return (
      <div className="text-white w-full flex justify-center items-center my-24 p-10">
        <img src={LoadingImage} alt="Loading ..." className="size-44" />
      </div>
    );
  }
  if (posts.length == 0) {
    return (
      <Container>
        <div className=" flex justify-center items-center flex-col text-white">
          <h1 className="font-bold text-4xl text-center">
            Nothing to see here 😶
          </h1>{" "}
          <br />
          <Link to="/">
            <button
              type="button"
              className="rounded-md border border-white px-3 py-2 text-2xl font-semibold text-white hover:bg-[#522258] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Home
            </button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap justify-center">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-96">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
