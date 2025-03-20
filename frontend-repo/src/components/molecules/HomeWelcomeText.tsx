import Typography from "../atoms/Typography";

export default function HomeWelcomeText() {
  return (
    <>
      <Typography color="primary" variant="h3">
        Welcome to the Main Page
      </Typography>
      <Typography color="primary" variant="body1">
        This is the main page of the application. You can navigate to the login
        page using the button below.
      </Typography>
    </>
  );
}
