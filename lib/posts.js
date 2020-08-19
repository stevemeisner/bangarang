import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import fetch from 'cross-fetch';

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function fetchNotionPosts() {
  const notionWorkerUrl = "https://api.bangarang.dev/v1/table/";
  const notionBlogTableId = "82224ba57e2a45d6b6d3b917e6590541";

  const response = await fetch(`${notionWorkerUrl}${notionBlogTableId}`)
  
  return await response.json();
}

export async function fetchNotionPost(id) {
  const notionWorkerUrl = `https://api.bangarang.dev/v1/page/${id}`;
  const response = await fetch(`${notionWorkerUrl}`)
  
  return await response.json();
}