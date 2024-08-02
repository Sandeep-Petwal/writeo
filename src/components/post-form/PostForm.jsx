/* eslint-disable react/prop-types */
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { statePosts } from "../../store/authSlice";
import LoadingImage from "../../../public/Loading.gif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostForm({ post }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const userData = useSelector((state) => state.auth.userData);
  // console.log("userData", userData);

  // toast
  const showErrorToast = (sms) => {
    toast.error(sms, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const reloadPostsState = () => {
    console.log("reloading the posts(edit, delete, create .)");
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        dispatch(statePosts(posts.documents));
        navigate(`/all-posts`);
      }
    });
  };

  const submit = async (data) => {
    if (isSubmitting) {
      return;
    }

    if (post) {
      // update the existing post (if post provided)
      console.log("Updating the current post .");

      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        reloadPostsState();
      }
    } else {
      // createing a new post
      console.log("Creating a new post .");

      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;

        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
          author: userData.name,
          authorEmail: userData.email,
        });

        if (dbPost && dbPost.error) {
          showErrorToast(dbPost.error);
        } else if (dbPost) {
          reloadPostsState();
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  // file preview
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <p className="text-center text-yellow-500 font-bold">
        {errors.title && errors.title.message }
      </p>
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-wrap justify-center  items-center font-bold text-white"
      >
        <ToastContainer />
        <Input
        maxLength="35"
          label="Title :"
          placeholder="Title"
          className="mb-1 w-72 text-white bg-slate-800 focus:bg-slate-950"
          {...register("title", {
            required: { value: true, message: "title is requirred" },
            maxLength: { value: 34, message: "maximum lenght of title is 35" },
          })}
        />

        <Input
          disable={post ? true : false}
          label="Slug :"
          placeholder="Slug"
          className="mb-1 w-72 text-white bg-slate-800 focus:bg-slate-950"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />

        <div className="m-5 px-2">
          {/* file preview  */}
          <div className=" flex justify-between my-4 items-center">
            <label className="inline-block mb-1 pl-1" htmlFor={"file"}>
              Featured Image :
            </label>
            <br />
            <input
              {...register("image", { required: !post })}
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className={` w-4/6 px-3 py-2 rounded-lg bg-gray-800 text-black outline-none focus:bg-gray-700 duration-200 borde text-white `}
              id={"file"}
            />
          </div>

          <div className="w-full flex justify-center">
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-60 ml-20" />
            )}
          </div>

          {/* old image if updating  */}
          {post && imagePreview == null && (
            <div className="flex justify-center mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}

          <Select
            options={["active", "inactive"]}
            label="Status"
            className="mt-3 w-4/6 bg-gray-800 text-white"
            {...register("status", { required: true })}
          />

          <Button
            type="submit"
            bgColor={post ? "bg-green-500" : undefined}
            className=" w-full my-10"
          >
            {post ? "Update" : "Submit"}
            {isSubmitting ? (
              <img
                src={LoadingImage}
                alt="Loading..."
                className="size-6 inline-block ml-2"
              />
            ) : (
              ""
            )}
          </Button>
        </div>
      </form>
    </>
  );
}
