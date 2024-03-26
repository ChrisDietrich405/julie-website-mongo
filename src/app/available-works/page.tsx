import Image from "next/image";
import Link from "next/link";
import axios from "axios";

import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

// useEffect(() => {
//   const fetchResource = async () => {
//     const response = await axios.get(
//       `https://z1ek6m2k90.execute-api.us-east-1.amazonaws.com/dev/resources`,
//       {
//         headers: {
//           "x-api-key": process.env.API_KEY,
//         },
//       }
//     );
//     console.log(response.data);
//     const { body } = response.data;
//     setResources(body);
//   };
//   fetchResource();
// }, []);

async function getData() {
  try {
    const response = await axios.get(
      "https://lq9oqysp3l.execute-api.us-east-1.amazonaws.com/dev/available-works",
      {
        headers: {
          "x-api-key": process.env.AWS_API_KEY,
        },
      }
    );

    return response.data.body;
  } catch (error) {
    console.log(error);
  }
}

export default async function Page() {
  const data = await getData();

  return (
    <Container className="main-content">
      <h1>Available Works</h1>
      <>
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {data.map((item: any, index: any) => {
            return (
              <Grid key={`firstArrayIndex ${index}`} item xs={6}>
                <Card
                  sx={{
                    maxWidth: 500,
                    marginX: "auto",
                  }}
                >
                  <CardContent>
                    <Stack gap={3} textAlign="center">
                      <Box height={320} overflow="hidden">
                        <Image
                          width={0}
                          height={0}
                          sizes="100vw"
                          alt="slideshow"
                          src={item.image}
                          style={{
                            width: "100%",
                            height: "auto",
                            position: "relative",
                            top: "50%",
                            transform: "translateY(-50%)",
                          }}
                        />
                      </Box>

                      <Typography variant="h4">{item.title}</Typography>
                      <Link prefetch={true} href={`/available-works/${item.ID}`}>
                        <Button fullWidth variant="contained" color="primary">
                          Details
                        </Button>
                      </Link>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </>
    </Container>
  );
}
