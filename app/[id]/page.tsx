'use client'
import { CalendarFold, Eye, Lock } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Profile from '@/public/profile.avif'
import { useQuery, gql } from '@apollo/client'

const GET_USER_QUERY = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      firstName
      lastName
      email
      birthdate
      gender
      address
      contactNumber
      password
    }
  }
`

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

interface UserCardProps {
  data: UserData
}

const Page = ({ params }: { params: { id: string } }) => {
  const { data, loading, error } = useQuery(GET_USER_QUERY, {
    variables: { id: params.id },
  })
  const [showPassword, setShowPassword] = useState<boolean>(false)
  // const data = {
  //   firstName: 'John',
  //   lastName: 'Doe',
  //   birthdate: '1990-01-01',
  //   gender: 'Male',
  //   address: '123 Main St, Anytown, USA',
  //   email: 'john.doe@example.com',
  //   contactNumber: '123-456-7890',
  //   password: 'test',
  // }

  console.log(data.user.firstName)

  const handleShowPassword = () => {
    setShowPassword(true)
  }

  return (
    <div className='mx-auto mt-10 w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg'>
      <Image
        className='h-56 w-full object-cover object-center'
        src={Profile}
        alt='avatar'
      />

      <div className='px-6 py-4'>
        <h1 className='text-xl font-semibold text-gray-800'>
          {data?.user.firstName} {data?.user.lastName}
        </h1>

        <div className='mt-4 flex items-center text-gray-700'>
          <CalendarFold />

          <h1 className='px-2 text-sm'>{data?.user.birthdate}</h1>
        </div>

        <div className='mt-4 flex items-center text-gray-700'>
          <svg
            fill='#000000'
            width='800px'
            height='800px'
            className='fillCurrent h-6 w-6'
            viewBox='0 0 256 256'
            id='Flat'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M223.96008,39.20947c-.01117-.11377-.03271-.22412-.04858-.33642-.02069-.146-.038-.29248-.06671-.4375-.026-.13086-.0622-.2583-.09461-.38721-.03106-.124-.05829-.24854-.09546-.37158-.03839-.12647-.08593-.24854-.13037-.37256-.04382-.12256-.08429-.24609-.13427-.3667-.04779-.11523-.104-.22559-.157-.33838-.05835-.124-.11358-.249-.17865-.3706-.05774-.10791-.12359-.21-.186-.315-.07111-.11914-.13873-.24023-.21661-.35644-.07593-.11328-.16059-.22022-.242-.3291-.07464-.1001-.14429-.20264-.22424-.3003-.1521-.185-.31384-.36181-.48175-.53271-.01654-.01709-.0304-.03564-.04712-.05225-.01935-.01953-.04077-.03515-.0603-.05468-.16852-.165-.34253-.32422-.525-.47413-.09424-.07763-.19366-.145-.29053-.21728-.1123-.084-.22229-.1709-.339-.249-.11236-.0752-.229-.14063-.34423-.20948-.109-.06494-.2157-.1333-.32807-.19384-.115-.06153-.23328-.11329-.35058-.16895-.11963-.05664-.23749-.11621-.3603-.167-.11077-.0459-.22387-.08252-.33618-.12305-.13421-.04883-.267-.09961-.40442-.1416-.10833-.03223-.2185-.05615-.32788-.084-.14325-.03663-.28515-.07666-.43145-.10547-.12085-.02393-.24286-.03711-.36451-.05567-.13653-.02051-.27142-.04541-.41009-.05908-.20184-.01953-.40436-.02588-.60693-.03076C216.11768,32.00781,216.05981,32,216,32H168a8,8,0,0,0,0,16h28.686L168,76.686,149.65674,58.34277a8.00018,8.00018,0,0,0-11.31348,11.31446L156.686,88l-15.753,15.75293a71.994,71.994,0,1,0,11.31574,11.3125L168,99.314l18.34326,18.34327a8.00018,8.00018,0,0,0,11.31348-11.31446L179.314,88,208,59.314V88a8,8,0,0,0,16,0V40.00244C224.00006,39.73779,223.98608,39.47314,223.96008,39.20947ZM135.59814,199.59766A55.99961,55.99961,0,1,1,152,160,56.06457,56.06457,0,0,1,135.59814,199.59766Z' />
          </svg>
          <h1 className='px-2 text-sm'>{data?.user.gender}</h1>
        </div>

        <div className='mt-4 flex items-center text-gray-700 '>
          <svg
            aria-label='location pin icon'
            className='fillCurrent h-6 w-6'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.063 10.063 6.27214 12.2721 6.27214C14.4813 6.27214 16.2721 8.063 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16757 11.1676 8.27214 12.2721 8.27214C13.3767 8.27214 14.2721 9.16757 14.2721 10.2721Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M5.79417 16.5183C2.19424 13.0909 2.05438 7.3941 5.48178 3.79418C8.90918 0.194258 14.6059 0.0543983 18.2059 3.48179C21.8058 6.90919 21.9457 12.606 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.9732 6.93028 5.17326C9.59603 2.37332 14.0268 2.26454 16.8268 4.93029C19.6267 7.59604 19.7355 12.0269 17.0698 14.8268Z'
            />
          </svg>

          <h1 className='px-2 text-sm'>{data?.user.address}</h1>
        </div>

        <div className='mt-4 flex items-center text-gray-700'>
          <svg
            aria-label='email icon'
            className='fillCurrent h-6 w-6'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M3.00977 5.83789C3.00977 5.28561 3.45748 4.83789 4.00977 4.83789H20C20.5523 4.83789 21 5.28561 21 5.83789V17.1621C21 18.2667 20.1046 19.1621 19 19.1621H5C3.89543 19.1621 3 18.2667 3 17.1621V6.16211C3 6.11449 3.00333 6.06765 3.00977 6.0218V5.83789ZM5 8.06165V17.1621H19V8.06199L14.1215 12.9405C12.9499 14.1121 11.0504 14.1121 9.87885 12.9405L5 8.06165ZM6.57232 6.80554H17.428L12.7073 11.5263C12.3168 11.9168 11.6836 11.9168 11.2931 11.5263L6.57232 6.80554Z'
            />
          </svg>

          <h1 className='px-2 text-sm'>{data?.user.email}</h1>
        </div>
        <div className='mt-4 flex items-center text-gray-700'>
          <Lock />

          {showPassword ? (
            <h1 className='px-2 text-sm'>{data?.user.password}</h1>
          ) : (
            <button
              onClick={handleShowPassword}
              className='ml-2 inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-sm text-white shadow-sm'
            >
              <Eye size={18} />
              Show
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
