import {
  Card,
  Form,
  TextField,
  Input,
  InputGroup,
  Label,
  FieldError,
  Button,
} from "@heroui/react";
import { FaGoogle } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    console.log("Sign Up Data:", data);
    toast.success("Form submitted successfully");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl">
        <Card.Header className="flex flex-col items-center gap-0.5 pb-1">
          <Card.Title className="text-2xl font-bold text-center text-gray-800">
            Sign Up to <span className="text-blue-600">Continue</span>
          </Card.Title>
        </Card.Header>

        <Card.Content className="space-y-3">
          <Form className="flex flex-col gap-3" onSubmit={onSubmit}>
            {/* First & Last Name – side by side */}
            <div className="grid grid-cols-2 gap-4">
              <TextField isRequired name="firstName">
                <Label className="text-sm font-medium text-gray-700">
                  First Name
                </Label>
                <Input
                  placeholder="John"
                  className="rounded-lg border border-gray-300 px-3 py-2"
                />
                <FieldError className="text-xs text-red-500" />
              </TextField>
              <TextField isRequired name="lastName">
                <Label className="text-sm font-medium text-gray-700">
                  Last Name
                </Label>
                <Input
                  placeholder="Doe"
                  className="rounded-lg border border-gray-300 px-3 py-2"
                />
                <FieldError className="text-xs text-red-500" />
              </TextField>
            </div>

            {/* Email with validation */}
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

            {/* Phone (optional) */}
            <TextField name="phone" type="tel">
              <Label className="text-sm font-medium text-gray-700">
                Your Phone
              </Label>
              <Input
                placeholder="+96542145874844"
                className="rounded-lg border border-gray-300 px-3 py-2"
              />
            </TextField>

            {/* Password with toggle */}
            <TextField
              isRequired
              name="password"
              validate={(value) => {
                if (value.length < 8) {
                  return "Password must be at least 8 characters";
                }
                if (!/[A-Z]/.test(value)) {
                  return "Password must contain at least one uppercase letter";
                }
                if (!/[0-9]/.test(value)) {
                  return "Password must contain at least one number";
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Confirm Password with toggle and cross-field validation */}
            <TextField
              isRequired
              name="confirmPassword"
              validate={(value) => {
                if (value !== password) {
                  return "Passwords do not match";
                }
                return null;
              }}
            >
              <Label className="text-sm font-medium text-gray-700">
                Confirm Password
              </Label>
              <InputGroup>
                <InputGroup.Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  className="rounded-lg border border-gray-300 px-3 py-2"
                />
                <InputGroup.Suffix>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <AiFillEyeInvisible className="text-gray-500 text-xl" />
                    ) : (
                      <AiFillEye className="text-gray-500 text-xl" />
                    )}
                  </button>
                </InputGroup.Suffix>
              </InputGroup>
              <FieldError className="text-xs text-red-500" />
            </TextField>

            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full font-semibold bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              Sign Up
            </Button>
          </Form>

          {/* Already have an account? */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/sign-in" className="font-semibold text-blue-600">
              Sign In
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
          By signing up, you agree to our Terms & Privacy Policy
        </Card.Footer>
      </Card>
    </div>
  );
}