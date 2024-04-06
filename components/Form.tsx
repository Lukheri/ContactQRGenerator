'use client'
import React, { useState } from 'react'
import { FormData, FormErrors } from '@/types/FormTypes'

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

  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (validateForm()) {
      console.log('Form Data:', formData)
    }
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

        <form
          onSubmit={handleSubmit}
          className='mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8'
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
              {errors.firstName && (
                <p className='text-xs italic text-red-500'>
                  {errors.firstName}
                </p>
              )}
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
              {errors.lastName && (
                <p className='text-xs italic text-red-500'>{errors.lastName}</p>
              )}
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
              />
              {errors.birthdate && (
                <p className='text-xs italic text-red-500'>
                  {errors.birthdate}
                </p>
              )}
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
              {errors.gender && (
                <p className='text-xs italic text-red-500'>{errors.gender}</p>
              )}
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
            {errors.address && (
              <p className='text-xs italic text-red-500'>{errors.address}</p>
            )}
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
            {errors.email && (
              <p className='text-xs italic text-red-500'>{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type='tel'
              name='contactNumber'
              className='w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm'
              placeholder='Contact Number'
              value={formData.contactNumber}
              onChange={handleChange}
            />
            {errors.contactNumber && (
              <p className='text-xs italic text-red-500'>
                {errors.contactNumber}
              </p>
            )}
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
            {errors.password && (
              <p className='text-xs italic text-red-500'>{errors.password}</p>
            )}
          </div>

          <button
            type='submit'
            className='block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white'
          >
            Generate QR
          </button>
        </form>
      </div>
    </div>
  )
}

export default Form
