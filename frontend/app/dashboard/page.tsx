"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/providers/auth-provider"
import { NavBar } from "@/components/nav-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import ProtectedRoute from "@/components/protected-route"

export default function Dashboard() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<string[]>([])
  const [loadingProjects, setLoadingProjects] = useState(true)

  useEffect(() => {
    // Simulating project fetch
    const fetchProjects = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProjects(["Project A", "Project B", "Project C"])
      setLoadingProjects(false)
    }

    if (user) {
      fetchProjects()
    }
  }, [user])

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <NavBar />
        <main className="container mx-auto mt-8 px-4">
          <h1 className="mb-6 text-3xl font-bold">Welcome, {user?.email}</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Your Projects</CardTitle>
                <CardDescription>Manage your ongoing projects</CardDescription>
              </CardHeader>
              <CardContent>
                {loadingProjects ? (
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : (
                  <ul className="list-inside list-disc space-y-1">
                    {projects.map((project) => (
                      <li key={project}>{project}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Find Teams</CardTitle>
                <CardDescription>Discover new teams to join</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Browse Teams</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Create Project</CardTitle>
                <CardDescription>Start a new project and recruit team members</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">New Project</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}

