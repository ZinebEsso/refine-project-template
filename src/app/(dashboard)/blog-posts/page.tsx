import LoadingSpinner from "@context/loadingSpinner";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const BlogPostListComponent = dynamic(() => import("@components/blog/list"), {
  ssr: false,
  loading: () => <LoadingSpinner /> 
});
const BlogPostList = ()=> {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BlogPostListComponent  />
    </Suspense>
  );
}

export default BlogPostList;

