import React, { FormEvent, useState } from "react";

import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Alert, Snackbar, Stack, Box } from "@mui/material";
import { StripeElementType } from "@stripe/stripe-js";

type CheckoutFormProps = {
  clientSecret: string;
  onDisabled: (disabled: boolean ) => void;
  onLoad: (load: boolean ) => void;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({ clientSecret, onDisabled, onLoad }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    elements?.submit();

    onLoad(true)

    const response = await stripe?.confirmPayment({
      elements: elements ?? undefined,
      clientSecret,
      confirmParams: {
        return_url: "http://localhost:3000/payment-success",
      },
    });

    if (response?.error) {
      setOpen(true);
      setError(response.error?.message ?? "");
    }

    onLoad(false)
  };

  const handleChange = async ({
    elementType,
  }: {
    elementType: StripeElementType;
  }) => {
    if (elementType === "address") {
      const stripeElement = elements?.getElement(elementType);

      const elementValue = await stripeElement?.getValue();

      onDisabled(!elementValue);
    }
  };

  return (
    <Stack gap={2}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <form
        id="checkout-form"
        onSubmit={(event) => handleSubmit(event)}
      >
        <Stack
          gap={6}
          direction="row"
          sx={{ width: "70dvw" }}
          justifyContent="space-between"
        >
          <Stack flex={2} gap={3}>
            <h3>Contact info</h3>
            <LinkAuthenticationElement />

            <h3>Address</h3>
            <AddressElement
              onChange={handleChange}
              options={{
                mode: "shipping",
                fields: {
                  phone: "always",
                },
              }}
            />

          </Stack>
          <Box flex={1}>
            <h3 style={{
              marginBottom: 24
            }}>Payment</h3>

            <PaymentElement />
          </Box>
        </Stack>
      </form>
    </Stack>
  );
};

export default CheckoutForm;
