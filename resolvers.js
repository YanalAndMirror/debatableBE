const Post = require('./models/Post.model');

const resolvers = {
  Query: {
    hello: () => {
      return 'hello world';
    },
    getAllPosts: async () => {
      return await Post.find();
    },
    getPost: async (_, { id }, __) => {
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (parent, args, context) => {
      const { title, description } = args.post;
      let post = new Post({ title, description });
      post = await Post.create(post);
      return post;
    },
    deletePost: async (_, { id }, __) => {
      await Post.findById(id).remove();
      return 'deleted';
    },
    updatePost: async (_, args, __) => {
      const { title, description } = args.post;
      return await Post.findByIdAndUpdate(
        args.id,
        { title, description },
        { new: true }
      );
    },
  },
};
module.exports = resolvers;
