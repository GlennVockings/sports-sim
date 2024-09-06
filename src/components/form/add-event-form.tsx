"use client"

import { useFieldArray, useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { EventSchema } from "@/schemas"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { useGameStore } from "@/lib/store"

interface Team {
  id: string
  name: string
  odd: string
}

export const AddEventForm = ({ teams } : { teams: Team[] }) => {

  const form = useForm<z.infer<typeof EventSchema>>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      name: "",
      status: "active",
      teams: []
    }
  })

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "teams"
  })

  const handleCheckboxChange = (team: Team, checked: boolean) => {
    const index = fields.findIndex(field => field.name === team.name)
    if (checked && index === -1) {
      append({ name: team.name, odd: team.odd, winner: false })
    } else if (!checked && index !== -1) {
      remove(index)
    }
  }

  const selectAllTeams = (checked: boolean) => {
    if (checked) {
      teams.forEach((team) => {
        if (!fields.some(field => field.name === team.name)) {
          append({ name: team.name, odd: team.odd, winner: false })
        }
      })
    } else {
      replace([])
    }
  }
 
  const onSubmit = (values: z.infer<typeof EventSchema>) => {
    console.log(values)
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
            name="status"
            render={({field}) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <div>
              <p>Teams</p>
            </div>
            <div>
              <div className="flex flex-row items-center space-x-3 space-y-0 py-2">
                <Checkbox 
                  checked={fields.length === teams.length}
                  onCheckedChange={selectAllTeams}
                />
                <p>Select all</p>
              </div>
              {
                teams.map(team => {
                  const isChecked = fields.some(field => field.name === team.name)
                  return (
                    <div key={team.id} className="grid grid-cols-3">
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={(checked: boolean) => handleCheckboxChange(team, checked)}
                      />
                      <p>{ team.name }</p>
                      <p>{ team.odd }</p>
                    </div>
                  )
                })
              }
            </div>
          </div>
          <div>
            {
              fields.map((item) => (
                <div key={item.id} className="grid grid-cols-3">
                  <p>{ item.name }</p>
                  <p>{ item.odd }</p>
                  <p>{`Winner: ${item.winner ? "true" : "false"}`}</p>
                </div>
              ))
            }
          </div>
          <Button type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}