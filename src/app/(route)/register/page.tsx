import LoadingSpinner from "@context/loadingSpinner";
import { authProviderServer } from "@providers/auth-provider/auth-provider.server";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const AuthPage = dynamic(() => import("@components/auth-page"), {
  ssr: false,
  loading: () => <LoadingSpinner /> 

});

export default async function Register() {
  const data = await getData();

  if (data.authenticated) {
    redirect(data?.redirectTo || "/");
  }

  return <AuthPage type="register" />;
}

async function getData() {
  const { authenticated, redirectTo, error } = await authProviderServer.check();

  return {
    authenticated,
    redirectTo,
    error,
  };
}
