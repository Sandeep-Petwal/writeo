import  {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';
import LoadingImage from "../../public/Loading.gif";


function EditPost() {
    const [post, setPosts] = useState(null)
    const [loading, setLoading] = useState(true);

    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                    setLoading(false);
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])


    if (loading) {
        return (
          <div className="text-white w-full flex justify-center items-center my-24 p-10">
            <img src={LoadingImage} alt="Loading ..." className="size-44" />
          </div>
        );
      }
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost