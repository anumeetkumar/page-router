// pages/blog/[id].ts

import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

// Define the types for the blog post data
interface Blog {
  id: string;
  title: string;
  content: string;
  date: string;
}

// getStaticPaths fetches the paths for each blog post based on the id
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://api.vercel.app/blog');
  const blogs: Blog[] = await res.json();

  const paths = blogs.map(blog => ({
    params: { id: blog.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }; 

  const res = await fetch(`https://api.vercel.app/blog/${id}`);
  const blog: Blog = await res.json();

  return {
    props: {
      blog,
    },
  };
};

interface BlogPostProps {
  blog: Blog;
}

const BlogPost: NextPage<BlogPostProps> = ({ blog }) => {
  return (
    <div>
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>{blog.date}</p>
    </div>
  );
};

export default BlogPost;
