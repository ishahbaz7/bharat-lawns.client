import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { postLogin } from "@/api/auth";
import useAuth from "@/hooks/useAuth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function SignIn() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    postLogin(form)
      .then((data) => {
        setLoading(false);
        login(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        setErrors(err.response?.data?.errors);
      });
  };
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit}>
          <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
            <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                Sign In
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <div>
                <Input
                  error={!!errors?.UserName}
                  onChange={handleChange}
                  name="userName"
                  type="text"
                  label="User Name"
                  size="lg"
                />
                <span className="text-xs text-red-500">
                  {errors?.UserName?.length > 0 && errors?.UserName[0]}
                </span>
              </div>
              <div>
                <Input
                  error={!!errors?.Password}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  label="Password"
                  size="lg"
                />
                <span className="text-xs text-red-500">
                  {errors?.Password?.length > 0 && errors?.Password[0]}
                </span>
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                className="flex items-center justify-center gap-4"
                disabled={loading}
                type="submit"
                variant="gradient"
                fullWidth
              >
                Sign In{" "}
                {loading && (
                  <AiOutlineLoading3Quarters
                    className="animate-spin"
                    size={16}
                  />
                )}
              </Button>
              {/* <Typography variant="small" className="mt-6 flex justify-center">
                Don't have an account?
                <Link to="/auth/sign-up">
                  <Typography
                    as="span"
                    variant="small"
                    color="blue"
                    className="ml-1 font-bold"
                  >
                    Sign up
                  </Typography>
                </Link>
              </Typography> */}
            </CardFooter>
          </Card>
        </form>
      </div>
    </>
  );
}

export default SignIn;
