import express  from "express";
import { getFollower, addFollower, deleteFollower } from "../controllers/followers.js";


const router = express.Router()

router.get('/', getFollower);
router.post('/', addFollower);
router.delete('/', deleteFollower);


export default router 