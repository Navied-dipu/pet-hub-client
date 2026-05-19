"use client";
import { FcGoogle } from "react-icons/fc";
import { Card, Button, Input, Form, Divider } from "@heroui/react";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import Link from "next/link";

const SignUpPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    if (user.password !== user.confirmPassword) {
      setError("Password and Confirm Password must be the same");
      setLoading(false);
      return;
    }

    const passwordError = validatePassword(user.password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image || undefined,
      });
      console.log(data)
      if (data) router.push("/");
      if (authError) setError(authError.message || "An error occurred during signup");
    } catch (err) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setLoading(true);
    try {
      await authClient.signIn.social({ provider: "google" });
    } catch (err) {
      setError("Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center my-3">
        <h1 className="text-2xl font-bold">Create Account</h1>
        <p>Start your adventure with Wanderlust</p>
      </div>

      <Card className="border rounded-none p-6 max-w-md mx-auto">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <Form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            isRequired
            name="name"
            type="text"
            label="Name"
            placeholder="Enter your name"
            isDisabled={loading}
            radius="none"
          />

          <Input
            isRequired
            name="email"
            type="email"
            label="Email"
            placeholder="john@example.com"
            isDisabled={loading}
            radius="none"
          />

          <Input
            name="image"
            type="url"
            label="Photo URL"
            placeholder="https://example.com/photo.jpg"
            isDisabled={loading}
            radius="none"
          />

          <Input
            isRequired
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            description="At least 6 characters, 1 uppercase, 1 lowercase"

          />

          <Input
            isRequired
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"

          />

          <Button
            className="rounded-none w-full bg-cyan-500"
            type="submit"
            isLoading={loading}
            isDisabled={loading}
          >
            Create Account
          </Button>
        </Form>

        <div className="flex justify-center items-center gap-3 my-4">
          <Divider className="flex-1" />
          <div className="whitespace-nowrap text-sm">Or sign up with</div>
          <Divider className="flex-1" />
        </div>

        <Button
          onClick={handleGoogleSignin}
          variant="bordered"
          className="w-full rounded-none flex justify-center items-center"
          isDisabled={loading}
          
        >
          <FcGoogle /> Sign up with Google
        </Button>

        <div className="text-center mt-4">
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-cyan-500 hover:underline font-semibold">
              Login here
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignUpPage;