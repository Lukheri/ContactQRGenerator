'use client'
import React from 'react'
import QRCode from 'react-qr-code'

const QRComponent = ({
  id,
  setIsFlipped,
}: {
  id: string
  setIsFlipped: any
}) => {
  return (
    <div className='mt-6 flex h-full flex-col justify-between space-y-4 p-4 sm:p-6 lg:p-8'>
      <p>Scan the QR code to see your contact information!</p>
      <QRCode
        className='h-[150px] max-h-[300px] w-full object-cover md:h-full'
        value={`http://localhost:3000/${id}`}
      />
      <button
        onClick={() => setIsFlipped(false)}
        className='block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white'
      >
        Fill new contact
      </button>
    </div>
  )
}

export default QRComponent
