"use client"

import { GameSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog"
import { useState } from "react"


export const NewGameForm = () => {
  const [ open, setOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof GameSchema>>({
    resolver: zodResolver(GameSchema),
    defaultValues: {
      name: "",
      description: "",
      users: [],
      teams: [],
      events: []
    }
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "teams"
  })

  const onSubmit = (values: z.infer<typeof GameSchema>) => {
    console.log(values)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Add Game
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          Create a new game
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
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
                  name="description"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-2">
                  <h3>Teams</h3>
                  {fields.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      {/* Team Name Field */}
                      <FormField
                        control={form.control}
                        name={`teams.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} type="text" placeholder="Team Name" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Team Odd Field */}
                      <FormField
                        control={form.control}
                        name={`teams.${index}.odd`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} type="text" placeholder="Odd" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Remove Button */}
                      <Button type="button" onClick={() => remove(index)} size={"icon"}>
                        X
                      </Button>
                    </div>
                  ))}

                  {/* Append Button */}
                  <Button type="button" onClick={() => append({ name: "", odd: "", winner: false })}>
                    Add team
                  </Button>
                </div>
              </div>
              <Button type="submit" variant={"outline"}>
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}