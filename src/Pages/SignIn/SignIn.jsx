import {
  Card,
  Form,
  TextField,
  Input,
  InputGroup,
  Label,
  FieldError,
  Checkbox,
  Button,
} from "@heroui/react";
import { FaGoogle } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    data.rememberMe = rememberMe;
    console.log("Sign Up Data:", data);
    toast.success("Form submitted successfully");

  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <Card.Header className="flex flex-col items-center gap-0.5 pb-1">
          <Card.Title className="text-2xl font-bold text-center text-gray-800">
            Welcome <span className="text-blue-600">Back</span>
          </Card.Title>
          <Card.Description className="text-center text-sm text-gray-500">
            Sign in to continue to your account
          </Card.Description>
        </Card.Header>

        <Card.Content className="space-y-3">
          <Form className="flex flex-col gap-3" onSubmit={onSubmit}>
            {/* Email */}
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-sm font-medium text-gray-700">
                Your Email
              </Label>
              <Input
                placeholder="example@zenis.com"
                className="rounded-lg border border-gray-300 px-3 py-2"
              />
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Password with toggle */}
            <TextField
              isRequired
              name="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                return null;
              }}
            >
              <Label className="text-sm font-medium text-gray-700">
                Password
              </Label>
              <InputGroup>
                <InputGroup.Input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="rounded-lg border border-gray-300 px-3 py-2"
                />
                <InputGroup.Suffix>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="focus:outline-none"
                  >
                    {showPassword ? (
                      <AiFillEyeInvisible className="text-gray-500 text-xl" />
                    ) : (
                      <AiFillEye className="text-gray-500 text-xl" />
                    )}
                  </button>
                </InputGroup.Suffix>
              </InputGroup>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <Checkbox
                name="rememberMe"
                isSelected={rememberMe}
                onChange={setRememberMe}
              >
                <Checkbox.Content className="text-sm text-gray-600">
                  <Checkbox.Control>
                    <Checkbox.Indicator />
                  </Checkbox.Control>
                  Remember me
                </Checkbox.Content>
              </Checkbox>

              <Link href="#" className="text-sm font-semibold text-blue-600">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full font-semibold bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              Sign In
            </Button>
          </Form>

          {/* Don't have an account? */}
          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="font-semibold text-blue-600">
              Sign Up
            </Link>
          </p>

          {/* OR Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social Login Buttons */}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1 gap-1.5">
              <FaGoogle className="text-red-500" />
              Google
            </Button>
          </div>
        </Card.Content>

        <Card.Footer className="justify-center text-xs text-gray-400 pt-1">
          By signing in, you agree to our Terms & Privacy Policy
        </Card.Footer>
      </Card>
    </div>
  );
}