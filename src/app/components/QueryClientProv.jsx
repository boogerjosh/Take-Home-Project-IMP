"use client"

import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();
import React from 'react'

const QueryClientProv = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default QueryClientProv