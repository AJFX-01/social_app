import  {db} from "../connect.js";
import jwt from "jsonwebtoken";

export const getFollower = (req, res) => {

    const q = "SELECT followuserid FROM followers WHERE followeduserid = ?";

    db.query(q, [req.query.followeduserid], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data.map(follower=>follower.followuserid));
    });
};

export const addFollower = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token)  return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "INSERT INTO followers (`followuserid`, `followeduserid`) VALUES (?)";
        const values = [
            userInfo.id,
            req.body.userid
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("following");
        });
    });
};

export const deleteFollower = (req, res) => {

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not Logged in!");

    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "DELETE FROM followers WHERE `followuserid` = ? AND `followeduserid` = ?";

        db.query(q, [userInfo.id, req.query.userid], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Unfollow");
        });
    });
};