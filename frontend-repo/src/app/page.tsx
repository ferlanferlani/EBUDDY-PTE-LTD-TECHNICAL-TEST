// "use client";
// import { useState, useEffect } from "react";
// import { useAuthRedirect } from "@/hooks/useAuthRedirect";
// import {
//   Typography,
//   Button,
//   Box,
//   Container,
//   CircularProgress,
// } from "@mui/material";
// import Link from "next/link";

import HomeTemplate from "@/components/templates/HomeTemplate";

// export default function HomePage() {
//   const { loading } = useAuthRedirect(); // Login check
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true); // Tandai bahwa komponen sudah di-render di client
//   }, []);

//   if (!isClient || loading) {
//     return (
//       <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
//         <CircularProgress />
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="md">
//       <Box
//         display="flex"
//         flexDirection="column"
//         alignItems="center"
//         justifyContent="center"
//         minHeight="100vh"
//         textAlign="center"
//       >
//         <Typography variant="h3" gutterBottom>
//           Welcome to the Main Page
//         </Typography>
//         <Typography variant="body1" paragraph>
//           This is the main page of the application. You can navigate to the
//           login page using the button below.
//         </Typography>
//         <Link href="/auth/login" passHref>
//           <Button variant="contained" color="primary" size="large">
//             Go to Login Page
//           </Button>
//         </Link>
//       </Box>
//     </Container>
//   );
// }

// atomic design
export default function HomePage() {
  return <HomeTemplate />;
}
