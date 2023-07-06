"use client"

import { Header, TodoForm, TodoListing } from './components/index'
import axios from 'axios'
import { useQuery } from 'react-query'

const fetchTodos = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos', {
      params: {
      _limit: 5, // Limiting to 5 results
      _sort: 'id', // Sorting by ID in ascending order (assuming higher IDs are newer)
      _order: 'asc' // Sorting in descending order to get the newest data first
      }
  });
  return response.data;
};

export default function Home() {
  const { data: todos, isLoading, error } = useQuery('todos', fetchTodos);

  return (
      <>
        <Header />
        <main>
          <TodoForm todos={todos}/>
          <TodoListing todos={todos} isLoading={isLoading} error={error}/>
        </main>
      </>
  )
}
