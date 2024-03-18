const fs = require("fs/promises");
const repo = require("../repository");
const { CustomError } = require("../config/error");
const service = require("../service");
const uploader = require("../utils/cloudinary");

exports.getAll = async (req, res, next) => {
  try {
    const posts = await repo.post.getAll();
    res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await repo.post.getPostById(+postId);
    res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    req.body.gameId = +req.body.gameId;
    req.body.userId = req.user.id;
    if (req.file) {
      const image = await uploader.upload(req.file.path);
      req.body.imgUrl = image.url;
      // req.body.gameId = 32
      fs.unlink(req.file?.path);
      }
    console.log(req.body);
    const post = await repo.post.createPost(req.body);
    res.status(200).json({ post });
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

exports.getSearchPost = async(req,res,next) =>{
    try{
        const {query} = req.params
        const posts = await repo.post.searchPosts(query)
        res.status(200).json({posts})
    }catch(err){
        next(err)
    }
}
    

exports.editPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await repo.post.updatePost(+postId, req.body);
    res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    console.log(req.params);
    const post = await repo.post.deletePost(+postId);
    res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
};
