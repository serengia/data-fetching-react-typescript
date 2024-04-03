import { type ReactNode, useEffect, useState } from "react";
import { get } from "./util/http";
import BlogPosts, { type BlogPost } from "./components/BlogPosts";

const BASE_URL = "https://jsonplaceholder.typicode.com";

function App() {
  const [posts, setPosts] = useState<BlogPost[]>();

  type rawPostData = {
    id: number;
    title: string;
    body: string;
    userId: number;
  };

  useEffect(() => {
    async function fetchPosts() {
      const data = (await get(`${BASE_URL}/posts`)) as rawPostData[];

      const formattedPosts = data.map((p) => {
        return {
          id: p.id,
          title: p.title,
          text: p.body,
        };
      });

      setPosts(formattedPosts);
    }
    fetchPosts();
  }, []);

  let content: ReactNode;
  if (posts) {
    content = <BlogPosts posts={posts} />;
  }

  return (
    <main>
      <img src="/data-fetching.png" alt="Data fetching simulation image" />
      {content}
    </main>
  );
}

export default App;
