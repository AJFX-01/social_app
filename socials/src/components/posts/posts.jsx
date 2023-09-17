import { AuthContext } from '../../context/authContext';
import Photo from '../../assets/picc.jpeg'
import Post from '../post/post';
import './posts.scss';
import { useQuery } from '@tanstack/react-query'
import { makeRequest } from '../../axios';


const Posts = (userid) => {

    const { isLoading, error, data } = useQuery(["posts"], () => 
        makeRequest.get('/posts?userid=' + userid).then((res) => {
            return res.data;
        })
    );
    
    console.log(data)

    return(
        <div className="posts">
            {error ? "something wnet wrong": isLoading ? "loading" : data.map((post) => <Post post={post} key={post.id} />)}
        </div>
    )
}

export default Posts