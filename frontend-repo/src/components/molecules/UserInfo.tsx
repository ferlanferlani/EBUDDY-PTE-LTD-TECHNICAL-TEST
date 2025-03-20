import Typography from "../atoms/Typography";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

type UserInfoProps = {
  email: string | null;
};

export default function UserInfo({ email }: UserInfoProps) {
  return (
    <>
      <Typography color="primary" variant="h6">
        Logged in as: {email}
      </Typography>
    </>
  );
}
