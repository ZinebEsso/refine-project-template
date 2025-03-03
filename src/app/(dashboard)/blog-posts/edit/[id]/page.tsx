
import LoadingSpinner from "@context/loadingSpinner";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const BlogPostEditComponent = dynamic(() => import("@components/blog/update"), {
  ssr: false,
  loading: () => <LoadingSpinner />
});
export default function BlogPostEdit() {
  return(
    <Suspense fallback={<LoadingSpinner />}>
      <BlogPostEditComponent />
    </Suspense>
  )
}
