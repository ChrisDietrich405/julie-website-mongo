"use client";
import React from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useContext } from "react";
import { cartContext } from "@/app/context/cartContext";

import styles from "./styles.module.css";
import { userContext } from "../context/userContext";

const Checkout = () => {
  const { cart } = useContext(cartContext);
  const { userId } = useContext(userContext);

  const router = useRouter();

  router.prefetch('/login')
  router.prefetch('/delivery-details')

  const handleRedirect = () => {

    console.log('teste ', userId)

    if (!userId) {
      router.push("/login");
    } else {
      router.push("/delivery-details");
    }
  };

  return (
    <Container className="main-content">
      <Grid container spacing={2}>
        <Grid item lg={9}>
          {cart.map((cartItem) => {
            return (
              <>
                <Card>
                  <CardContent sx={{ display: "flex", columnGap: 3 }}>
                    <Image
                      width={333}
                      height={333}
                      alt="Picture of Julie"
                      src="/images/art1.jpg"
                    />
                    <Stack className={styles.card_content_items}>
                      <Typography variant="h3">{cartItem.title}</Typography>
                      <Typography variant="h5">${cartItem.price}</Typography>
                      <Typography style={{ marginTop: "20px" }}>
                        Measurements: {cartItem.measurements}
                      </Typography>
                    </Stack>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </>
            );
          })}
        </Grid>

        <Grid item lg={3}>
          {" "}
          <Card>
            <Button onClick={handleRedirect}>
              Proceed to delivery details
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
