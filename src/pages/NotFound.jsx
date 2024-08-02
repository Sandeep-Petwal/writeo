import { Link } from "react-router-dom";
function NotFound() {
  return (
    <div className="text-center my-52 text-white text-3xl font-bold flex justify-center items-center flex-col gap-10">
      <h1>
        <span className="font-extrabold text-7xl"> 
        404 ! 
        </span>
        <br />
        {`${" can't"}`} find the page you looking for !</h1>
      <Link to={"/"}>                  <button
                    type="button"
                    className="rounded-md border border-white px-3 py-2 text-2xl font-semibold text-white hover:bg-[#C63C51] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                  >
                    Home
                  </button>
</Link>
    </div>
  );
}

export default NotFound;
