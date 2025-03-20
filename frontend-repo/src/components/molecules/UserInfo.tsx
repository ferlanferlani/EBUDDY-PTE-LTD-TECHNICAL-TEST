import Typography from "../atoms/Typography";

type UserInfoProps = {
  email: string | null;
};

export default function UserInfo({ email }: UserInfoProps) {
  return <Typography variant="h6">Logged in as: {email}</Typography>;
}
