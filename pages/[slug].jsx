import Layout from '../components/layout'
import { NotionRenderer } from "react-notion";
import { fetchNotionPosts, fetchNotionPost } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'

export const getStaticProps = async ({ params: { slug } }) => {
  // Get all posts again
  const posts = await fetchNotionPosts();

  // Find the current blogpost by slug
  const post = await posts.find((t) => t.slug === slug);

  // get the notion content blocks from the post
  const blocks = await fetchNotionPost(post.id);
  
  return {
    props: {
     blocks,
     post,
    },
  };
}

export const getStaticPaths = async () => {
  const posts = await fetchNotionPosts();
  return {
    paths: posts.map((row) => `/${row.slug}`),
    fallback: true,
  };
}

const Post = ({ post, blocks }) => (
  <Layout>
    <div className={utilStyles.singlePost}>
      <h1>{post.title}</h1>
      <NotionRenderer blockMap={blocks} />
    </div>
  </Layout>
);

export default Post;