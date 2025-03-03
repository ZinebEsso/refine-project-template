import LoadingSpinner from "@context/loadingSpinner";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CategoryCreateComponent = dynamic(
  () => import("@components/categories/create"),
  {
    ssr : false,
    loading: () => <LoadingSpinner /> 

}
);

export default function CategoryCreate() {
  return(
    <Suspense fallback={ <LoadingSpinner /> }>
  <CategoryCreateComponent />
  </Suspense>
  )
}
