import Post from "../models/Post.js"
import User from "../models/User.js";

// CREATE
export const createPost = async (req, res) => {
    try {
        const { userId, postTitle, postContent, forum, comments } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            forum,
            postTitle,
            postContent,
            // userPicturePath: user.picturePath,
            // picturePath,
            comments: []
        });
        await newPost.save();

        const post = await Post.find({ forum })
        res.status(201).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

// READ
export const getFeedPosts = async (req, res) => {
    try {
        const { forum } = req.params;
        const post = await Post.find({ forum });
        res.status(200).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (err) {
        res.status(409).json({ message: err.message })
    }
}

/* UPDATE */
export const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, comment, firstName, lastName } = req.body;
        console.log(req.body)
        console.log(userId)

        const user = await User.findById(userId);
        const post = await Post.findById(id);

        post.comments.push({
            userId: userId,
            comment: comment,
            firstName: firstName,
            lastName: lastName
        })

        post.save()

        const updatedPost = await Post.findById(id)

        // const updatedPost = await Post.findByIdAndUpdate(
        //     id,
        //     {
        //         comments: [...post.comments, {
        //             userId,
        //             firstName,
        //             lastName,
        //             comment
        //         }]
        //     },
        //     { new: true }
        // );
    
        res.status(200)
            .json(updatedPost);
        } catch (err) {
        res.status(404).json({ message: err.message });
    }
  };