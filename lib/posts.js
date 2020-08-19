import fetch from 'cross-fetch';

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