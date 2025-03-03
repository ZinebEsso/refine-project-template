import LoadingSpinner from "@context/loadingSpinner";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const BlogPostCreateComponent = dynamic(
  () => import("@components/blog/create"),
  { ssr: false, loading: () => <LoadingSpinner /> }
);

export default function BlogPostCreate() {
  return (
    <Suspense  fallback={<LoadingSpinner />}>
      <BlogPostCreateComponent />
    </Suspense>
  );
}
