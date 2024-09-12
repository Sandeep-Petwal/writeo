/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import heroImage from "../../public/hero.jpeg";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingImage from "../../public/Loading.gif";
import { statePosts } from "../store/authSlice";

function Home() {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const status = useSelector((state) => state.auth.status);
  // console.log("status home: ", status);

  const state_posts = useSelector((state) => state.auth.posts);
  // console.log("state posts - ", state_posts);

  // pagination
  const [postsOnPage, setPostsOnPage] = useState(6);
  const [pageNo, setPageNo] = useState(1);
  const startIndex = (pageNo - 1) * postsOnPage;
  const endIndex = startIndex + postsOnPage;

  const nextPage = () => {
    if (posts.length / postsOnPage == pageNo) {
      return;
    }
    setPageNo(pageNo + 1);
  };
  const previusPage = () => {
    if (pageNo == 1) {
      return;
    }
    setPageNo(pageNo - 1);
  };

  useEffect(() => {
    // 1.loading posts from state
    if (status) {
      // setting the posts first time
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
        setLoading(false);
      }

      // 2.loading posts from getPosts
      // appwriteService.getPosts().then((posts) => {
      //   if (posts) {
      //     setPosts(posts.documents);
      //     setLoading(false);
      //     // console.log("posts are : ", posts.documents);
      //     // setting posts to state
      //     // dispatch(statePosts(posts));
      //   }
      //   if (!posts.ok) {
      //     setLoading(false);
      //   }
      // });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="text-white w-full flex justify-center items-center my-24 p-10">
        <img src={LoadingImage} alt="Loading ..." className="size-44" />
      </div>
    );
  }

  if (posts.length === 0 && status == true) {
    return (
      <Container>
        <div className=" flex justify-center items-center flex-col text-white">
          <h1 className="font-bold text-4xl text-center">
            There are no posts yet !
          </h1>{" "}
          <br />
          <Link to="/add-post">
            <button
              type="button"
              className="rounded-md border border-white px-3 py-2 text-2xl font-semibold text-white hover:bg-[#522258] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Create first post +
            </button>
          </Link>
        </div>
      </Container>
    );
  }

  if (status == false) {
    return (
      <Container>
        <div className="relative w-full bg-[#8C3061] text-white ">
          <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
            <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
              <h1 className=" text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-6xl">
                Discover, express, connect: the power of writing
              </h1>
              <p className="mt-8 text-lg text-white">
                Welcome to Writeo, a blogging platform where writers and
                thinkers share their ideas, experiences, and perspectives. Our
                community is dedicated to fostering creativity, sparking
                conversation, and inspiring new perspectives. Browse our latest
                articles, join the discussion, and become a part of our vibrant
                community of writers and readers{" "}
              </p>
              <div className="button_areas flex flex-col lg:flex-row justify-center gap-10 mt-5 ">
                <Link to={"/login"}>
                  <button
                    type="button"
                    className="w-full rounded-md border border-white px-3 py-2 text-2xl font-semibold text-white hover:bg-[#522258] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Login
                  </button>
                </Link>
                <Link to={"/signup"}>
                  <button
                    type="button"
                    className="w-full rounded-md border border-white px-3 py-2 text-2xl font-semibold text-white hover:bg-[#522258] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Create account
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
              <img
                className="aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[700px] xl:aspect-[16/9]"
                src={heroImage}
                alt="hero_image"
              />
            </div>
          </div>
        </div>
      </Container>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap justify-center">
          {posts.slice(startIndex, endIndex).map((post) => (
            <div key={post.$id} className="p-2 w-96 ">
              <PostCard {...post} />
            </div>
          ))}
        </div>

        <div className="flex justify-center text-white mt-8 items-center gap-8">
          <button
            disabled=""
            className={`${
              pageNo == 1 && "hidden" 
            } rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg  hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="button"
            onClick={previusPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <p className="text-white">
            Page <strong className="text-white">{pageNo}</strong> of&nbsp;
            <strong className="text-white">{Math.ceil(posts.length / postsOnPage)}</strong>
          </p>
          <button
            className={` ${posts.length / postsOnPage == pageNo && "hidden"} rounded-md border border-slate-300 p-2.5 text-center text-sm transition-all shadow-sm hover:shadow-lg text-white hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="button"
            onClick={nextPage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </Container>
    </div>
  );
}

export default Home;
