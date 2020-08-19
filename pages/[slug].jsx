import Layout from '../components/layout'
import { NotionRenderer } from "react-notion"
import { fetchNotionPosts, fetchNotionPost } from '../lib/posts'
import utilStyles from '../styles/utils.module.css'

export const getServerSideProps = async ({ params: { slug } }) => {
  // Get all posts again
  const posts = await fetchNotionPosts()

  // Find the current blogpost by slug
  const post = posts.find((t) => t.slug === slug)

  // get the notion content blocks from the post
  const blocks = await fetchNotionPost(post.id)
  const title = post.title
  
  return {
    props: {
     blocks,
     title,
    }
  }
}

// export const getStaticPaths = async () => {
//   const posts = await fetchNotionPosts();
//   const paths = posts.map((post) => ({
//     params: { slug: post.slug },
//   }))
//   return {
//     paths,
//     fallback: false,
//   }
// }

const Post = ({ title, blocks }) => (
  <Layout>
    <div className={utilStyles.singlePost}>
      <h1>{title}</h1>
      <NotionRenderer blockMap={blocks} />
    </div>
  </Layout>
)

export default Post;