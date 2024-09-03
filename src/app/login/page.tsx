import { LoginForm } from "@/components/login-form";
import { RegisterForm } from "@/components/register-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login(){
  return (
    <div className="p-4">
      <Tabs defaultValue="signUp">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signUp">Sign Up</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="signUp">
        <RegisterForm />
      </TabsContent>
    </Tabs>
    </div>
  )
}