import express from "express";
import { getFeedPosts, createPost, addComment } from "../controllers/posts.js"
//^we removed likepost because it wasn't created, save for future updates
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// READ
router.get("/:forum", getFeedPosts);
// router.get("/posts/general", verifyToken, getFeedPosts);
// router.get("/posts/reviews", verifyToken, getFeedPosts);

// UPDATE
router.patch("/:id/comment", verifyToken, addComment);

// CREATE
router.post("/posts", verifyToken, createPost);

export default router;