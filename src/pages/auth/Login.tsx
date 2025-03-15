
import { SignIn } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-semibold">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
          </div>
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-primary text-primary-foreground hover:bg-primary/90",
                card: "bg-transparent shadow-none",
              },
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
