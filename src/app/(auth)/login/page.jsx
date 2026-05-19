"use client";

import { Card, Form, Input, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";

const LoginPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });
// console.log(data)
    if (data) {
      alert('login sucessfuly')
      router.push("/");
    }

    if (error) {
      alert("Login failed");
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center my-6">
        <h1 className="text-2xl font-bold">Login</h1>
        <p>Start your adventure with Wanderlust</p>
      </div>

      {/* Card */}
      <Card className="border rounded-none p-6 max-w-md mx-auto">
        <Form onSubmit={onSubmit} className="flex flex-col gap-4">

          {/* EMAIL */}
          <Input
            name="email"
            type="email"
            label="Email"
            isRequired
            placeholder="john@example.com"
          />

          {/* PASSWORD */}
          <Input
            name="password"
            type="password"
            label="Password"
            isRequired
            minLength={8}
            placeholder="Enter your password"
          />

          {/* LOGIN BUTTON */}
          <Button
            type="submit"
            className="w-full rounded-none bg-cyan-500 text-white"
          >
            Login
          </Button>
        </Form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm whitespace-nowrap">Or sign in with</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* GOOGLE LOGIN */}
        <Button
          onClick={handleGoogleSignin}
          variant="outline"
          className="w-full rounded-none flex items-center gap-2"
        >
          <FcGoogle className="text-xl" />
          Sign in with Google
        </Button>
      </Card>
    </div>
  );
};

export default LoginPage;