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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { useMemo, useState } from "react"
import { FormError } from "./form-error"
import { TeamType } from "@/lib/types"

export const AddEventForm = ({ teams } : { teams: TeamType[] }) => {
  const [ error, setError ] = useState<string>("")
  const [ open, setOpen ] = useState<boolean>(false)

  const { games, addEvent } = useGameStore(state => state)
  const filteredGames = useMemo(() => games.filter(game => game.id === "10"), [games])

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
    name: "teams",
    rules: { minLength: 2 }
  })

  const handleCheckboxChange = (team: TeamType, checked: boolean) => {
    const index = fields.findIndex(field => field.name === team.name)
    if (checked && index === -1) {
      append({ id: team.id, name: team.name, odd: team.odd, winner: false })
    } else if (!checked && index !== -1) {
      remove(index)
    }
  }

  const selectAllTeams = (checked: boolean) => {
    if (checked) {
      teams.forEach((team) => {
        if (!fields.some(field => field.name === team.name)) {
          append({ id: team.id, name: team.name, odd: team.odd, winner: false })
        }
      })
    } else {
      replace([])
    }
  }
 
  const onSubmit = (values: z.infer<typeof EventSchema>) => {
    const { name, status, teams} = values
    setError("")
    if (filteredGames[0].events.length >= 5) {
      setError("Hit Event Limit")
      return
    }
    console.log(values)
    addEvent("10", name, status, teams, [])
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Add Event
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="Add Event">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
        </DialogHeader>
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
              <FormMessage />
              {form.formState.errors.teams && (
                <p className="text-red-600">
                  {form.formState.errors.teams.message}
                </p>
              )}
              <FormError message={error} />
              <Button type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}