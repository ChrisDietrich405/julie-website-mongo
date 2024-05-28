import React, {FormEvent, useEffect, useState} from "react";

import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Alert, Snackbar, Stack, Box } from "@mui/material";
import { IUser} from "@/models";

import {usePostOrder, useUpdateCart} from "@/app/hooks";
import {useRouter} from "next/navigation";

type CheckoutFormProps = {
  cart: string[];
  clientSecret: string;
  onDisabled: (disabled: boolean ) => void;
  onLoad: (load: boolean ) => void;
  user?: IUser;
}
const CheckoutForm: React.FC<CheckoutFormProps> = ({ user, clientSecret, onDisabled, cart, onLoad }) => {
  const route = useRouter();
  const stripe = useStripe();
  const elements = useElements();

  const [open, setOpen] = React.useState(false);
  const [error, setError] = useState("");

  const { mutate: updateCart } = useUpdateCart()

  const { mutate } = usePostOrder({
    onSuccess: async (res) => {

      await stripe?.confirmPayment({
        elements: elements ?? undefined,
        clientSecret,
        redirect: 'if_required',
      });
      updateCart([])
      route.push(`payment-success/${res.data.orderId}`)
    },
    onError: (error) => {
      setOpen(true);
      setError(error.message);
    }
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { value } = await elements?.getElement('address')?.getValue() ?? {};
    mutate({
      availableWorks: cart,
      customer: {
        name: value?.name,
        phoneNumber: value?.phone
      },
      deliveryAddress: {
        streetAddress: value?.address.line1,
        city: value?.address.city,
        zipCode: value?.address.postal_code
      }
    })

    elements?.submit();
  };

  const handleAddressChange = async () => {
      const stripeElement = elements?.getElement('address');

      const elementValue = await stripeElement?.getValue();

      onDisabled(!elementValue);
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
            <LinkAuthenticationElement
              options={{
              defaultValues: {
                email: user?.email ?? ''
              }
            }} />

            <AddressElement
              onChange={handleAddressChange}
              options={{
                defaultValues: {
                  name: user?.name,
                  address: {
                    line1: '',
                    country: 'USA'
                  },
                },
                mode: "shipping",
                fields: {
                  phone: "always",
                },
              }}
            />

          </Stack>
          <Box flex={1}>
            <PaymentElement />
          </Box>
        </Stack>
      </form>
    </Stack>
  );
};

export default CheckoutForm;
