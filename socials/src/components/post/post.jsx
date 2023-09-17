import './post.scss';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { MoreHorizOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Comments from '../comments/comments';
import { useContext, useState } from 'react';
import Share from '../shares/share';
import moment from 'moment';
import { useQuery, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { AuthContext } from '../../context/authContext';


const Post = ({ post }) => {

    const [commentOpen, setCommentOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const { currentUser } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery(["likes", post.id], () => 
        makeRequest.get("/likes?postid=" + post.id).then((res) => {
            return res.data;
        })
    )

    const isLikedByCurrentUser = data ? data.includes(currentUser.id) : false;
    const likesCount = data ? data.length : 0;

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (liked) => {
            if (liked) return makeRequest.delete("/likes?postid=" + post.id);
            return makeRequest.post("/likes", { postid : post.id });
        },  
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["likes"])
            },
        }
    );

    const deleteMutation = useMutation(
        (postid) => {
            return makeRequest.delete("/posts/" + postid);
        },
        {
            onSuccess : () => {
                queryClient.invalidateQueries(["posts"])
            }
        }
    )

    const handleLike = () => {
        mutation.mutate(data.includes(currentUser.id));
    };

    const handleDelete = () => {
        deleteMutation.mutate(post.id)
    }
    return (
        <div className="post">
            <div className="container">
                <div className="user">
                    <div className="userinfo">
                        <img src={post.profilepic} alt="" />
                        <div className="details">
                            <Link to={`/profile/${post.userid}`} style={{textDecoration: 'none', color: 'inherit'}}>
                                <span className='name'>{post.name} </span>
                            </Link>
                            <span className='date'>{moment(post.createdtime).fromNow()}</span>
                        </div>
                    </div>
                    <MoreHorizIcon onClick={()=>setMenuOpen(!menuOpen)}/>
                    { menuOpen && post.userid === currentUser.id && (<button onClick={handleDelete}>Delete</button> )}
                </div>
                <div className="content">
                    <p>{post.desc}</p>
                    <img src={"./upload/"+ post.image} alt=''/>
                </div>
                <div className="info">
                    <div className="item"> 
                        { isLoading ? "loading" : isLikedByCurrentUser ? (<FavoriteOutlinedIcon onClick={handleLike} />) : (<FavoriteBorderOutlinedIcon onClick={handleLike}/>)}
                        {likesCount} likes
                    </div>
                    <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
                        <TextsmsOutlinedIcon />
                        12 Comments
                    </div>
                    <div className="item">
                        <ShareOutlinedIcon/>
                        Share
                    </div> 
                </div>
                {commentOpen && <Comments postid={post.id}/>}

            </div>
        </div>
    )
};


export default Post