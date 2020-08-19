import Link from "next/link";
import utilStyles from '../styles/utils.module.css'


export default function IndexPost({post}) {
  const { id, date, title, draft, slug, tags } = post;

  if (!draft) {
    return (
      <li className={utilStyles.listItem} key={id}>
        <Link href="/[slug]" as={`/${slug}`}><a title={title}>{title}</a></Link>
        <br />
        {id}
        <br />
        {date}
      </li>
    )
  } else {
    return null
  }
}
