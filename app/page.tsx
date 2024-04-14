"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Button
        onClick={() => { router.push("/dashboard/library") }}
      >
        Go to dashboard
      </Button>
    </div>
  );
}
