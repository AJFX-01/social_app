import "./profile.scss";
import Photo from '../../assets/helena.jpeg';
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/posts";
import { makeRequest } from "../../axios";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useContext, useState } from 'react'; 
import Update from "../../components/update/update";


const Profile = () => {
    const [ openUpdate, setOpenUpdate ] = useState(false) 
    const { currentUser } = useContext(AuthContext);

    const userid = parseInt(useLocation().pathname.split("/")[2]);

    const { isLoading, error, data } = useQuery(["user"], () =>
        makeRequest.get("users/find/" + userid).then((res) => {
            return res.data;
        })
    )

    const { isLoading : followerIsLoading, data : followerData } = useQuery(["follower"], () =>
        makeRequest.get("/followers?followeduserid=" + userid).then((res) => {
            return res.data;
        }) 
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (following) => {
            if (following) return makeRequest.delete("/followers?userid=" + userid);
            return makeRequest.post("/followers", { userid })
       },
       {
        onSuccess:() => {
            queryClient.invalidateQueries(["follower"])
        }
       } 
    );

    const handleFollow = () => {
        mutation.mutate(followerData.includes(currentUser.id));
    };
    
    console.log(data)

    return ( 
        <div className="profile">
     {isLoading ? ( "loading" ) : ( <><div className="images">
                <img
                    src={"/upload/" + data.coverpicture}
                    alt=""
                    className="cover"/>
                <img src={"/upload/" + data.profilepic} alt="" className="profilePic" />
            </div>
            <div className="profilecontainer">
                <div className="uInfo">
                    <div className="left">
                       <a href="http://facebook.com"><FacebookTwoToneIcon fontSize="small"/></a> 
                       <a href="http://facebook.com"><InstagramIcon fontSize="small"/></a> 
                       <a href="http://facebook.com"><TwitterIcon fontSize="small"/></a> 
                       <a href="http://facebook.com"><LinkedInIcon fontSize="small"/></a> 
                       <a href="http://facebook.com"><PinterestIcon fontSize="small"/></a> 
                    </div>
                    <div className="center">
                        <span>{data.name}</span>
                        <div className="info">
                            <div className="item">
                                <PlaceIcon/>
                                <span>{data.city}</span>
                            </div>
                            <div className="item">
                                <LanguageIcon/>
                                <span>{data.website}</span>
                            </div>
                        </div>
                        {followerIsLoading ? ( "loading" ) : userid === currentUser.id ?  ( <button onClick={()=>setOpenUpdate(true)}>Update</button>) : ( <button onClick={handleFollow}> {followerData.includes(currentUser.id) ? "Following" : "Follow"} </button> )}
                    </div>
                    <div className="right">
                        <EmailOutlinedIcon/>
                        <MoreVertIcon/>
                    </div>
                </div>
                <Posts userid={userid }/>
            </div>
            </>
            )}
            {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}
        </div>
    )
}

export default Profile