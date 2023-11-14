import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .email(),
  password: z
    .string()
    .min(1, {
      message: "Password cannot be empty",
    })
    .trim(),
});

const Login = () => {
  const auth = useAuthContext();
  const navigate = useNavigate();
  
  if (auth.authenticated()) {
    return <Navigate to="/dashboard" />;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    auth.signin(values, () => {
      navigate("/dashboard");
    });
  };
  return (
    <div className="w-screen h-screen bg-slate-300 flex items-center justify-center">
      <div className="w-1/3 m-auto  bg-transparent">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-3">
                  <FormLabel className=" uppercase">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex items-center justify-center gap-3">
                  <FormLabel className="uppercase">Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex items-center justify-center ">
              <Button type="submit" className="">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default Login;
