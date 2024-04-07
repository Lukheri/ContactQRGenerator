'use client'
import React, { useState } from 'react'
import { FormData, FormErrors } from '@/types/FormTypes'
import QRComponent from './QRComponent'
import emailValidator from '@sefinek/email-validator'

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    birthdate: '',
    gender: '',
    address: '',
    email: '',
    contactNumber: '',
    password: '',
  })
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [newUserID, setNewUserID] = useState<string>('')

  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  function handleContactChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target
    const newValue = value.replace(/[^0-9]/g, '')
    setFormData((prevState) => ({ ...prevState, [name]: newValue }))
  }

  const validateForm = (): boolean => {
    let isValid = true
    let errors: FormErrors = {}

    if (!formData.firstName.trim()) {
      errors.firstName = 'First Name is required'
      isValid = false
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last Name is required'
      isValid = false
    }
    if (!formData.birthdate.trim()) {
      errors.birthdate = 'Birthdate is required'
      isValid = false
    }
    if (!formData.gender.trim()) {
      errors.gender = 'Gender is required'
      isValid = false
    }
    if (!formData.address.trim()) {
      errors.address = 'Address is required'
      isValid = false
    }
    if (!emailValidator.test(formData.email.trim())) {
      errors.email = 'Please enter valid email'
      isValid = false
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
      isValid = false
    }
    if (!formData.contactNumber.trim()) {
      errors.contactNumber = 'Contact Number is required'
      isValid = false
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required'
      isValid = false
    }

    setErrors(errors)
    return isValid
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)

    if (validateForm()) {
      console.log('Form Data:', formData)
      try {
        const res = await fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (res.ok) {
          setFormData({
            firstName: '',
            lastName: '',
            birthdate: '',
            gender: '',
            address: '',
            email: '',
            contactNumber: '',
            password: '',
          })
          const data = await res.json()

          setNewUserID(data.id)
          console.log(data)
          setIsFlipped(true)
        } else {
          console.log('Create Failed')
        }
      } catch (error) {
        console.log('Error in Create User: ', error)
      }
    }
    setSubmitting(false)
  }

  return (
    <div className='mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8'>
      <div className='mx-auto max-w-lg'>
        <h1 className='text-center text-2xl font-bold text-indigo-600 sm:text-3xl'>
          Contact QR code generator
        </h1>
        <p className='mx-auto mt-4 max-w-md text-center text-gray-500'>
          Fill in the form below to generate your own QR code for your contact
          information.
        </p>
        <div className='flip-card'>
          <div
            className='flip-card-inner'
            style={{ transform: `${isFlipped ? 'rotateY(180deg)' : ''}` }}
          >
            <div className='flip-card-front'>
              <form
                onSubmit={handleSubmit}
                className='mb-0 mt-6 space-y-4 p-4 sm:p-6 lg:p-8'
              >
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <input
                      type='text'
                      name='firstName'
                      className='w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm'
                      placeholder='First Name'
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    <p
                      style={{ opacity: errors.firstName ? 1 : 0 }}
                      className='text-xs italic text-red-500'
                    >
                      {errors.firstName || 'Placeholder'}
                    </p>
                  </div>
                  <div>
                    <input
                      type='text'
                      name='lastName'
                      className='w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm'
                      placeholder='Last Name'
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    <p
                      style={{ opacity: errors.lastName ? 1 : 0 }}
                      className='text-xs italic text-red-500'
                    >
                      {errors.lastName || 'Placeholder'}
                    </p>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <input
                      type='date'
                      name='birthdate'
                      className='w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm'
                      value={formData.birthdate}
                      onChange={handleChange}
                      min='1900-01-01'
                      max={new Date().toISOString().split('T')[0]}
                    />
                    <p
                      style={{ opacity: errors.birthdate ? 1 : 0 }}
                      className='text-xs italic text-red-500'
                    >
                      {errors.birthdate || 'Placeholder'}
                    </p>
                  </div>
                  <div>
                    <select
                      name='gender'
                      className='w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm'
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value=''>Select Gender</option>
                      <option value='male'>Male</option>
                      <option value='female'>Female</option>
                      <option value='other'>Other</option>
                    </select>
                    <p
                      style={{ opacity: errors.gender ? 1 : 0 }}
                      className='text-xs italic text-red-500'
                    >
                      {errors.gender || 'Placeholder'}
                    </p>
                  </div>
                </div>

                <div>
                  <input
                    type='text'
                    name='address'
                    className='w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm'
                    placeholder='Address'
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <p
                    style={{ opacity: errors.address ? 1 : 0 }}
                    className='text-xs italic text-red-500'
                  >
                    {errors.address || 'Placeholder'}
                  </p>
                </div>

                <div>
                  <input
                    type='email'
                    name='email'
                    className='w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm'
                    placeholder='Enter email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <p
                    style={{ opacity: errors.email ? 1 : 0 }}
                    className='text-xs italic text-red-500'
                  >
                    {errors.email || 'Placeholder'}
                  </p>
                </div>

                <div>
                  <input
                    type='tel'
                    name='contactNumber'
                    className='w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm'
                    placeholder='Contact Number'
                    value={formData.contactNumber}
                    onChange={handleContactChange}
                  />
                  <p
                    style={{ opacity: errors.contactNumber ? 1 : 0 }}
                    className='text-xs italic text-red-500'
                  >
                    {errors.contactNumber || 'Placeholder'}
                  </p>
                </div>

                <div>
                  <input
                    type='password'
                    name='password'
                    className='w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm'
                    placeholder='Enter password'
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <p
                    style={{ opacity: errors.password ? 1 : 0 }}
                    className='text-xs italic text-red-500'
                  >
                    {errors.password || 'Placeholder'}
                  </p>
                </div>

                <button
                  type='submit'
                  className='block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white'
                >
                  {!submitting ? (
                    <p>Generate QR</p>
                  ) : (
                    <section className='dots-container'>
                      <div className='dot'></div>
                      <div className='dot'></div>
                      <div className='dot'></div>
                      <div className='dot'></div>
                      <div className='dot'></div>
                    </section>
                  )}
                </button>
              </form>
            </div>
            <div className='flip-card-back'>
              <QRComponent id={newUserID} setIsFlipped={setIsFlipped} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Form
