import { useState } from "react";
import "./update.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRevalidator } from "react-router-dom";


const Update = ({setOpenUpdate, user}) => {

    const [ cover, setCover ] = useState(null);

    const [ profile, setProfile ] = useState(null);
    const [ texts, setText ]  = useState({
        name : "",
        city: "",
        website: "",
    });

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;

        } catch (err) {
            console.log(err);
        }
    }
    const handleChange = (e) => {
        setText((prev) =>({...prev, [e.target.name]: [e.target.value] }))
    };

    const queryClient = useQueryClient();
    
    const mutation = useMutation(
        (user) => {
            return makeRequest.put("/users", user);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["user"]);
            },
        }
    );
    
    const handleSubmit = async (e) => { 
        e.preventDefault();
        let coverUrl = user.coverpicture;
        let profileUrl = user.profilepic;

        coverUrl = cover ? await upload(cover) : user.coverpicture
        profileUrl = cover ? await upload(cover) : user.profilepic

        mutation.mutate({ ...texts, coverpicture : coverUrl, profilepic : profileUrl });
        setOpenUpdate(false);
    }

    return(
        <div className="update">Update
        <form>
            <input type="file" onChange={e=>setCover(e.target.files[0])}/>
            <input type="file" onChange={e=>setProfile(e.target.files[0])}/>
            <input type="text" name="name" onChange={handleChange}/>
            <input type="text" name="city" onChange={handleChange}/>
            <input type="text" name="website" onChange={handleChange}/>
            <button onClick={handleSubmit} >Update</button>
        </form>
            <button onClick={() => setOpenUpdate(false)}>X</button>
        </div>
    );
};

export default Update