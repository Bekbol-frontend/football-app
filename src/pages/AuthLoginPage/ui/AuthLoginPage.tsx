import { AuthLogin } from "@/features/AuthLogin";
import { Section } from "@/shared/ui/Section";
import styles from "./AuthLoginPage.module.scss";
import { useGetUser } from "@/shared/lib/hooks/useGetUser";
import { Navigate } from "react-router-dom";
import { routePaths } from "@/shared/config/routeConfig";

function AuthLoginPage() {
  const check = useGetUser();

  if (check) return <Navigate to={routePaths.Home} replace />;

  return (
    <Section className={styles.section}>
      <AuthLogin />
    </Section>
  );
}

export default AuthLoginPage;
