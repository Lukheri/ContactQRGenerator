'use client'
import { AtSign, CalendarFold, Eye, Lock, MapPin } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Profile from '@/public/profile.avif'

interface UserData {
  firstName: string
  lastName: string
  birthdate: string
  gender: string
  address: string
  email: string
  contactNumber: string
  password: string
}

const Page = ({ params }: { params: { id: string } }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserData | null>(null)

  const getUser = async () => {
    try {
      const response = await fetch(`/api/user/${params.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 201) {
        const data = await response.json()
        setUserData(data.data)
      } else {
        throw new Error('Request failed')
      }
    } catch (error) {
      console.log('Error fetching routine', error)
    }
  }

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleShowPassword = () => {
    setShowPassword(true)
  }

  return (
    <div className='relative mx-auto mt-10 w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg'>
      <div className={`${!!userData ? 'opacity-100' : 'opacity-0'}`}>
        <Image
          className='h-56 w-full object-cover object-center'
          src={Profile}
          alt='avatar'
        />

        <div className='px-6 py-4'>
          <h1 className='text-xl font-semibold text-gray-800'>
            {userData?.firstName} {userData?.lastName}
          </h1>

          <div className='mt-4 flex items-center text-gray-700'>
            <CalendarFold />

            <h1 className='px-2 text-sm'>{userData?.birthdate}</h1>
          </div>

          <div className='mt-4 flex items-center text-gray-700'>
            <svg
              fill='#000000'
              width='800px'
              height='800px'
              className='h-6 w-6 fill-current'
              viewBox='0 0 256 256'
              id='Flat'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M223.96008,39.20947c-.01117-.11377-.03271-.22412-.04858-.33642-.02069-.146-.038-.29248-.06671-.4375-.026-.13086-.0622-.2583-.09461-.38721-.03106-.124-.05829-.24854-.09546-.37158-.03839-.12647-.08593-.24854-.13037-.37256-.04382-.12256-.08429-.24609-.13427-.3667-.04779-.11523-.104-.22559-.157-.33838-.05835-.124-.11358-.249-.17865-.3706-.05774-.10791-.12359-.21-.186-.315-.07111-.11914-.13873-.24023-.21661-.35644-.07593-.11328-.16059-.22022-.242-.3291-.07464-.1001-.14429-.20264-.22424-.3003-.1521-.185-.31384-.36181-.48175-.53271-.01654-.01709-.0304-.03564-.04712-.05225-.01935-.01953-.04077-.03515-.0603-.05468-.16852-.165-.34253-.32422-.525-.47413-.09424-.07763-.19366-.145-.29053-.21728-.1123-.084-.22229-.1709-.339-.249-.11236-.0752-.229-.14063-.34423-.20948-.109-.06494-.2157-.1333-.32807-.19384-.115-.06153-.23328-.11329-.35058-.16895-.11963-.05664-.23749-.11621-.3603-.167-.11077-.0459-.22387-.08252-.33618-.12305-.13421-.04883-.267-.09961-.40442-.1416-.10833-.03223-.2185-.05615-.32788-.084-.14325-.03663-.28515-.07666-.43145-.10547-.12085-.02393-.24286-.03711-.36451-.05567-.13653-.02051-.27142-.04541-.41009-.05908-.20184-.01953-.40436-.02588-.60693-.03076C216.11768,32.00781,216.05981,32,216,32H168a8,8,0,0,0,0,16h28.686L168,76.686,149.65674,58.34277a8.00018,8.00018,0,0,0-11.31348,11.31446L156.686,88l-15.753,15.75293a71.994,71.994,0,1,0,11.31574,11.3125L168,99.314l18.34326,18.34327a8.00018,8.00018,0,0,0,11.31348-11.31446L179.314,88,208,59.314V88a8,8,0,0,0,16,0V40.00244C224.00006,39.73779,223.98608,39.47314,223.96008,39.20947ZM135.59814,199.59766A55.99961,55.99961,0,1,1,152,160,56.06457,56.06457,0,0,1,135.59814,199.59766Z' />
            </svg>
            <h1 className='px-2 text-sm'>{userData?.gender}</h1>
          </div>

          <div className='mt-4 flex items-center text-gray-700 '>
            <MapPin />

            <h1 className='px-2 text-sm'>{userData?.address}</h1>
          </div>

          <div className='mt-4 flex items-center text-gray-700'>
            <AtSign />

            <h1 className='px-2 text-sm'>{userData?.email}</h1>
          </div>
        </div>
      </div>
      {!userData && (
        <div className='absolute left-0 top-0 flex h-full w-full animate-pulse flex-col gap-4 rounded-xl bg-neutral-300 p-4'>
          <div className='h-56 w-full animate-pulse rounded-md bg-neutral-400/50'></div>
          <div className='flex flex-col gap-4'>
            <div className='h-6 w-full animate-pulse rounded-md bg-neutral-400/50'></div>
            <div className='h-6 w-4/5 animate-pulse rounded-md bg-neutral-400/50'></div>
            <div className='h-6 w-full animate-pulse rounded-md bg-neutral-400/50'></div>
            <div className='h-6 w-2/4 animate-pulse rounded-md bg-neutral-400/50'></div>
            <div className='h-6 w-4/5 animate-pulse rounded-md bg-neutral-400/50'></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Page
