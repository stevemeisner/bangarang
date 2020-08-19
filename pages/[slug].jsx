import Layout, { siteTitle } from '../components/layout'
import { NotionRenderer } from "react-notion";
import { fetchNotionPosts, fetchNotionPost } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'

export async function getStaticProps({ params: { slug } }) {
  // Get all posts again
  const posts = await fetchNotionPosts();

  // Find the current blogpost by slug
  const post = posts.find((t) => t.slug === slug);

  const blocks = await fetchNotionPost(post.id);
  
  return {
    props: {
     blocks,
     post,
    },
  };
}

export async function getStaticPaths() {
  const posts = await fetchNotionPosts();
  return {
    paths: posts.map((row) => `/${row.slug}`),
    fallback: true,
  };
}

export default ({ post, blocks }) => (
  <Layout>
    <div className={utilStyles.singlePost}>
      <h1>{post.title}</h1>
      <NotionRenderer blockMap={blocks} />
    </div>
  </Layout>
);