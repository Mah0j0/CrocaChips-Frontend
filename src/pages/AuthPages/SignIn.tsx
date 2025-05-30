import PageMeta from "../../shared/ui/common/PageMeta";
import AuthLayout from "../../features/auth/login/ui/AuthPageLayout.tsx";
import SignInForm from "../../features/auth/login/ui/SignInForm.tsx";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="Ingresar"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
