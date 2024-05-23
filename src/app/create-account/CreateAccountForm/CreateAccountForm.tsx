"use client";
import React, {useState, FormEvent, ChangeEvent} from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {Grid, TextField, Typography, Stack} from "@mui/material";

import FormContainer from '@/components/forms/FormContainer'
import {LoadingButton} from "@mui/lab";
import Link from "next/link";
import {useCreateUser} from "@/app/hooks";

const DEFAULT_FORMDATA = {
  name: "",
  streetAddress: "",
  city: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const CreateAccountForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({...DEFAULT_FORMDATA});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSuccess = () => {
    router.push("/login");
    toast.success("Created account successfully");
  }

  const onError = (error: Error) => {
    toast.error(error.message);
  }

  const { mutate: createUser, isPending } = useCreateUser({onSuccess, onError});

  const onSubmit = async (e:  FormEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Confirm password doesn't equal Password");
    }

    createUser(formData)
  };

  return (
      <FormContainer
        maxWidth={600}
        onSubmit={onSubmit}
      >
        <Typography variant="h2">Create account</Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              size="small"
              name="name"
              label="Name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              size="small"
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              size="small"
              name="streetAddress"
              label="Street Address"
              value={formData.streetAddress}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              size="small"
              name="city"
              label="City"
              value={formData.city}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              size="small"
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              size="small"
              type="password"
              name="confirmPassword"
              label="Password Confirmation"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <LoadingButton
              type="submit"
              loading={isPending}
              variant="contained"
              sx={{
                width: 300,
              }}
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>

        <Stack direction="row" columnGap={1}>
          <Typography component="span">Already have an acount?</Typography>
          <Typography component="span">
            <Link href="/login">Login</Link>
          </Typography>
        </Stack>

      </FormContainer>
  );
};

export default CreateAccountForm;
