import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavBar } from "@/components/nav-bar"

export default function Home() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="flex flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="mb-4 text-6xl font-bold">Welcome to HackMate</h1>
        <p className="mb-2 text-xl text-muted-foreground">
          Find your perfect team for hackathons, challenges, and group projects.
        </p>
        <p className="mb-8 text-xl text-muted-foreground">Connect with developers who share your passion.</p>
        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/teams">Find Teams</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

