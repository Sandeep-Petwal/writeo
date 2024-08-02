/* eslint-disable react/prop-types */
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className=" h-96 w-full bg-[#691b43] hover:bg-[#9973a1]  text-white rounded-xl p-4 flex justify-center items-center gap-4 flex-col">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="rounded-xl w-80 h-64 object-cover transition duration-300 ease-in-out hover:scale-110"
        />
        <h2 className="text-xl  font-semibold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
