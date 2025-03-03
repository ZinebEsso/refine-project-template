
import LoadingSpinner from "@context/loadingSpinner";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CategoryShowComponent = dynamic(
  () => import("@components/categories/show"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />

  }
);

export default function CategoryShow() {
  return (<>
    <Suspense fallback={<LoadingSpinner />}>
      <CategoryShowComponent />
    </Suspense>
  </>);
}
