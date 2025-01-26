import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to Hackmate</h1>
      <p className="text-xl mb-8 max-w-2xl">
        Find your perfect team for hackathons, challenges, and group projects. Connect with like-minded individuals and
        build amazing things together.
      </p>
      <div className="space-x-4">
        <Link href="/teams">
          <Button size="lg">Browse Teams</Button>
        </Link>
        <Link href="/signup">
          <Button variant="outline" size="lg">
            Get Started
          </Button>
        </Link>
      </div>
    </main>
  )
}

