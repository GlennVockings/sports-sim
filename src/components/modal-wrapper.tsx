"use client"

import { useState } from "react"
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

interface ModalWrapperProps {
  children: React.ReactNode
  buttonLabel: string
  modalTitle: string
}

export const ModalWrapper = ({ children, buttonLabel, modalTitle } : ModalWrapperProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          { buttonLabel }
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={ modalTitle }>
        <DialogHeader>
          <DialogTitle>{ modalTitle }</DialogTitle>
        </DialogHeader>
        { children }
      </DialogContent>
    </Dialog>
  )
}