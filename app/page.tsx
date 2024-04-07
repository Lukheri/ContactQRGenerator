'use client'
import Form from '@/components/Form'
import Image from 'next/image'
import { ApolloProvider } from '@apollo/client'
import apolloClient from '@/lib/apolloClient'

export default function Home() {
  return (
    <main className=''>
      {/* <ApolloProvider client={apolloClient}> */}
      <Form />
      {/* </ApolloProvider> */}
    </main>
  )
}
