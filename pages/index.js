import { fetchNotionPosts } from '../lib/posts'
import Head from 'next/head'
import IndexPost from '../components/index-post'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export async function getServerSideProps() {
  let allPostsData = await fetchNotionPosts()

  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Shout out to all the Lost Boys</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(post => <IndexPost key={post.id} post={post} />)}
        </ul>
      </section>
    </Layout>
  )
}
