import LoadingSpinner from "@context/loadingSpinner";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CategoryListComponent = dynamic(
  () => import("@components/categories/list"),
  {
    ssr: false,
    loading: () => <LoadingSpinner />

  }
);

export default async function CategoryList() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CategoryListComponent />
    </Suspense>);
}
