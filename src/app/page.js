"use client"

import { QueryClient, QueryClientProvider } from 'react-query';
import Header from "./components/Header"
import TodoForm from "./components/TodoForm"
import TodoListing from "./components/TodoListing"

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Header />
        <main>
          <TodoForm />
          <TodoListing />
        </main>
      </>
    </QueryClientProvider>
  )
}
