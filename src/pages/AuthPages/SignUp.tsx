import PageMeta from "../../shared/ui/common/PageMeta";
import AuthLayout from "../../features/auth/login/ui/AuthPageLayout.tsx";
import SignUpForm from "../../features/auth/login/ui/SignUpForm.tsx";

export default function SignUp() {
  return (
    <>
      <PageMeta
        title="React.js SignUp Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignUp Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthLayout>
        <SignUpForm />
      </AuthLayout>
    </>
  );
}
