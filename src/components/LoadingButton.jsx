import React from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function LoadingButton() {
  return (
    <Button disabled>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>
  )
}
