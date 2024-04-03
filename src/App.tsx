import { type ReactNode, useEffect, useState } from "react";
import { get } from "./util/http";
import BlogPosts, { type BlogPost } from "./components/BlogPosts";
import ErrorMessage from "./components/ErrorMessage";

const BASE_URL = "https://jsonplaceholder.typicode.com";

function App() {
  const [posts, setPosts] = useState<BlogPost[]>();
  const [errorMsg, setErrorMsg] = useState<string>();
  const [isFetching, setIsFetching] = useState(false);

  type rawPostData = {
    id: number;
    title: string;
    body: string;
    userId: number;
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsFetching(true);
        const data = (await get(`${BASE_URL}/posts`)) as rawPostData[];

        const formattedPosts = data.map((p) => {
          return {
            id: p.id,
            title: p.title,
            text: p.body,
          };
        });

        setPosts(formattedPosts);
      } catch (error) {
        // setErrorMsg("Error fetching data");
        if (error instanceof Error) {
          setErrorMsg(error.message);
        } else {
          setErrorMsg("Error fetching data");
        }
      }
      setIsFetching(false);
    }
    fetchPosts();
  }, []);

  let content: ReactNode;
  if (isFetching) {
    content = <p>Fetching data...</p>;
  }

  if (posts) {
    content = <BlogPosts posts={posts} />;
  }

  if (errorMsg) {
    content = <ErrorMessage text={errorMsg} />;
  }

  return (
    <main>
      <img src="/data-fetching.png" alt="Data fetching simulation image" />
      {content}
    </main>
  );
}

export default App;
