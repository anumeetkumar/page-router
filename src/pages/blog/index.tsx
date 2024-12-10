import { GetStaticProps, NextPage } from "next";
import Link from "next/link";

interface Blog {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface BlogListingProps {
  blogs: Blog[];
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://api.vercel.app/blog");
  const blogs: Blog[] = await res.json();

  return {
    props: {
      blogs,
    },
  };
};

const BlogListing: NextPage<BlogListingProps> = ({ blogs }) => {
  return (
    <div>
      <h1>Blog Listing</h1>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
              <p>{blog.date}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogListing;
