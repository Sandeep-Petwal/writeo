// post .jsx
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import LoadingImage from "../../public/Loading.gif";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  let userData = useSelector((state) => state.auth.userData);
  userData = userData.name ? userData : userData.userData;
  console.log("userdata , ", userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
        console.log("post, ", post);
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="flex justify-between px-4 mx-auto max-w-screen-xl ">
      <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
        <header className="mb-4 lg:mb-6 not-format">
          {/* author detail  */}
          {/* <address className="flex items-center mb-6 not-italic">
            <div className="inline-flex items-center mr-3 text-sm text-white dark:text-white">
              <img
                className="mr-4 w-16 h-16 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                alt="Jese Leos"
              />

              <div className="p-2 w-10 h-10 flex justify-center  rounded-full font-bold m-3 bg-slate-700">
                <p>{userData.name.charAt(0)}</p>
              </div>
              
              <div>
                <a
                  href="#"
                  rel="author"
                  className="text-xl font-bold text-white dark:text-white"
                >
                  {userData.name}
                </a>
                <p className="text-base text-white">
                 {userData.email}
                </p>
              </div>
            </div>
          </address> */}

          <figure className="flex justify-center">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="min-w-96"
            />
            <figcaption></figcaption>
          </figure>

          {/* delete and update if author  */}
          {isAuthor}
          {
            <div className="m-5 flex justify-center">
              <Link to={`/edit-post/${post.$id}`}>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Edit
                </button>
              </Link>
              <button
                type="button"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={(e) => {
                  if (
                    confirm(
                      "Are you sure you want to remove the post forever ?"
                    )
                  ) {
                    deletePost();
                  }
                }}
              >
                Delete
              </button>
            </div>
          }

          <h1 className="mb-4 text-3xl font-extrabold leading-tight text-white lg:mb-6 lg:text-4x">
            {post.title}
          </h1>
        </header>
        <div className="text-white">{parse(post.content)}</div>
      </article>
    </div>
  ) : (
    <div className="text-white w-full flex justify-center items-center my-24 p-10">
      <img src={LoadingImage} alt="Loading ..." className="size-44" />
    </div>
  );
}

// return post ? (
//     <div className="py-8">
//         <Container>
//             <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
//                 <img
//                     src={appwriteService.getFilePreview(post.featuredImage)}
//                     alt={post.title}
//                     className="rounded-xl"
//                 />

//                 {isAuthor && (
//                     <div className="absolute right-6 top-6">
//                         <Link to={`/edit-post/${post.$id}`}>
//                             <Button bgColor="bg-green-500" className="mr-3">
//                                 Edit
//                             </Button>
//                         </Link>
//                         <Button bgColor="bg-red-500" onClick={deletePost}>
//                             Delete
//                         </Button>
//                     </div>
//                 )}
//             </div>
//             <div className="w-full mb-6">
//                 <h1 className="text-2xl font-bold">{post.title}</h1>
//             </div>
//             <div className="browser-css">
//                 {parse(post.content)}
//                 </div>
//         </Container>
//     </div>
// ) : null;
