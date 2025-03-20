import { Container } from "@mui/material";
import DashboardContent from "../organisms/DashboardContent";

type DashboardTemplateProps = {
  email: string | null;
};

export default function DashboardTemplate({ email }: DashboardTemplateProps) {
  return (
    <Container>
      <DashboardContent email={email} />
    </Container>
  );
}
