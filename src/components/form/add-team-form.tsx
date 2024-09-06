"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { TeamSchema } from "@/schemas"
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import { useGameStore } from "@/lib/store"

export const AddTeamForm = () => {
  const addTeam = useGameStore(state => state.addTeam)

  const form = useForm<z.infer<typeof TeamSchema>>({
    resolver: zodResolver(TeamSchema),
    defaultValues: {
      name: "",
      odd: "",
      winner: false
    }
  })

  const onSubmit = (values: z.infer<typeof TeamSchema>) => {
    const { name, odd } = values
    console.log(name)
    addTeam("10", name, odd)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="odd"
            render={({field}) => (
              <FormItem>
                <FormLabel>Odd</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="winner"
            render={({field}) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>Winner</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}