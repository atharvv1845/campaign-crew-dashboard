
import { SignUp } from "@clerk/clerk-react";
import { Card, CardContent } from "@/components/ui/card";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="mb-4 text-center">
            <h1 className="text-2xl font-semibold">Create Your Account</h1>
            <p className="text-sm text-muted-foreground">Sign up to get started</p>
          </div>
          <SignUp
            afterSignUpUrl="/dashboard"
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

export default SignUpPage;
