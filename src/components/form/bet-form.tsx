"use client"

import { BetSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Event, Team } from "@/lib/types"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"

export const BetForm = ({ events } : { events: Event[] }) => {
  const [ eventId, setEventId ] = useState<string>("")
  const [teams, setTeams] = useState<Team[]>([])
  const [teamId, setTeamId] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)

  const form = useForm<z.infer<typeof BetSchema>>({
    resolver: zodResolver(BetSchema),
    defaultValues: {
      eventId: "",
      eventName: "",
      teamName: "",
      teamOdd: "",
      amount: 0
    }
  })

  useEffect(() => {
    const selectedEvent = events.find(event => event.id === eventId)
    const selectedTeam = selectedEvent?.teams.find(team => team.id === teamId)
    if (selectedEvent) {
      form.setValue("eventName", selectedEvent.name)
      setTeams(selectedEvent.teams)
    }
    if (selectedTeam) {
      form.setValue("teamName", selectedTeam.name)
      form.setValue("teamOdd", selectedTeam.odd)
    }
  }, [eventId, events, form, teamId])

  const onSubmit = (values: z.infer<typeof BetSchema>) => {
    console.log(values);
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Bet
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="Add Team">
        <DialogHeader>
          <DialogTitle>Add Team</DialogTitle>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField 
                control={form.control}
                name="eventId"
                render={({field}) => (
                  <Select onValueChange={(value) => {
                    field.onChange(value); 
                    setEventId(value); // Update eventId state
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Event" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        events.map(event => (
                          <SelectItem key={event.id} value={event.id}>{event.name}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                )}
                />
              <FormField 
                control={form.control}
                name="eventName"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Teams</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex flex-col space-y-1"
                        onValueChange={(value) => {
                          setTeamId(value);
                        }}
                        >
                        {
                          teams.map(team => (
                            <FormItem key={team.id} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={team.id} />
                              </FormControl>
                              <FormLabel className="font-normal">
                                { team.name }
                              </FormLabel>
                            </FormItem>
                          ))
                        }
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                />
              <FormField 
                control={form.control}
                name="amount"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" onChange={(e) => field.onChange(Number(e.target.value))} />
                    </FormControl>
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
      </DialogContent>
    </Dialog>
  )
}