import LoadingSpinner from "@context/loadingSpinner";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const BlogPostShowComponent = dynamic(() => import("@components/blog/show"), {
  ssr: false,
  loading: () => <LoadingSpinner /> 

});

export default function BlogPostShow() {
  return (
    <Suspense fallback={<LoadingSpinner /> }>
      <BlogPostShowComponent />
    </Suspense>
  );
}
