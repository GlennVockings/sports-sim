"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import * as z from "zod"
import { LoginSchema } from "@/schemas";
import { FormError } from "@/components/form/form-error";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";

export const LoginForm = () => {
  const [error, setError] = useState<string | undefined>("")
  const [isPending, startTransition ] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("")

    startTransition(() => {
      login(values)
        .then((data: any) => {
          setError(data.error || "")
        })
    })
  }

  return (
    <Card>
      <CardHeader>
        <p className="tracking-wide font-semibold">Welcome back!</p>
      </CardHeader>
      <CardContent className="pb-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField 
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              <FormField 
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
            </div>
            <FormError message={error} />
            <Button type="submit" className="w-full" disabled={isPending}>
              Login
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}