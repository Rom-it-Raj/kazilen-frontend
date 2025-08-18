'use client'

import { useRef, useState, useEffect } from 'react'
import { ArrowLeft, Pencil } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function UserProfilePage() {
  const router = useRouter()
  const fileInputRef = useRef(null)

  const initialData = {
    name: 'Bharat Singh',
    mobile: '9166436773',
    email: '',
    dob: '',
    gender: '',
    image: null,
  }

  const [image, setImage] = useState(initialData.image)
  const [showOptions, setShowOptions] = useState(false)
  const [name, setName] = useState(initialData.name)
  const [mobile] = useState(initialData.mobile)
  const [email, setEmail] = useState(initialData.email)
  const [dob, setDob] = useState(initialData.dob)
  const [gender, setGender] = useState(initialData.gender)
  const [isModified, setIsModified] = useState(false)

  // detect changes to enable the Update Profile button
  useEffect(() => {
    const changed =
      name !== initialData.name ||
      email !== initialData.email ||
      dob !== initialData.dob ||
      gender !== initialData.gender ||
      image !== initialData.image
    setIsModified(changed)
  }, [name, email, dob, gender, image])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
      setShowOptions(false)
    }
  }

  const triggerGallery = () => {
    fileInputRef.current?.click()
  }

  const handleTakePhoto = () => {
    alert('Camera access is not supported in this demo.')
    setShowOptions(false)
  }

  const handleDelete = () => {
    setImage(null)
    setShowOptions(false)
  }

  const handleChangeClick = (field) => {
    alert(`Trigger change for ${field}`)
  }

  const handleUpdateProfile = () => {
    // Replace this with actual API integration
    alert('Profile updated successfully!')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <div className="flex items-center gap-3 p-4 shadow-sm border-b">
        <button onClick={() => router.back()} className="text-gray-700">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-800">Your Profile</h1>
      </div>

      {/* Profile Image */}
      <div className="relative flex justify-center mt-6">
        <div
          className="w-24 h-24 rounded-full bg-orange-100 border-2 border-orange-300 flex items-center justify-center overflow-hidden"
          onClick={() => setShowOptions(true)}
        >
          {image ? (
            <Image
              src={image}
              alt="Profile"
              width={96}
              height={96}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-3xl font-bold text-orange-600">
              {name.charAt(0)}
            </span>
          )}
        </div>

        <button
          onClick={() => setShowOptions(true)}
          className="absolute bottom-1 right-[calc(50%-45px)] bg-white p-1 rounded-full shadow border border-gray-200"
        >
          <Pencil size={14} className="text-gray-700" />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Name */}
      <div className="px-4 mt-6">
        <fieldset className="relative border border-gray-300 rounded-lg px-3 pt-4 pb-2">
          <legend className="text-xs px-1 text-gray-500">Name</legend>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full border-none bg-transparent p-0 text-sm text-gray-800 focus:outline-none"
          />
        </fieldset>
      </div>

      {/* Mobile */}
      <div className="px-4 mt-4">
        <fieldset className="relative border border-gray-300 rounded-lg px-3 pt-4 pb-2">
          <legend className="text-xs px-1 text-gray-500">Mobile</legend>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-800">{mobile}</span>
            <button
              onClick={() => handleChangeClick('mobile')}
              className="text-sm font-semibold text-red-500"
            >
              CHANGE
            </button>
          </div>
        </fieldset>
      </div>

      {/* Email */}
      <div className="px-4 mt-4">
        <fieldset className="relative border border-gray-300 rounded-lg px-3 pt-4 pb-2">
          <legend className="text-xs px-1 text-gray-500">Email</legend>
          <div className="flex items-center justify-between">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border-none bg-transparent p-0 text-sm text-gray-800 focus:outline-none"
            />
            <button
              onClick={() => handleChangeClick('email')}
              className="text-sm font-semibold text-red-500"
            >
              CHANGE
            </button>
          </div>
        </fieldset>
      </div>

      {/* Date of Birth */}
      <div className="px-4 mt-4">
        <fieldset className="relative border border-gray-300 rounded-lg px-3 pt-4 pb-2">
          <legend className="text-xs px-1 text-gray-500">Date of birth</legend>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            placeholder="YYYY-MM-DD"
            className="w-full border-none bg-transparent p-0 text-sm text-gray-800 focus:outline-none"
          />
        </fieldset>
      </div>

      {/* Gender */}
      <div className="px-4 mt-4 mb-6">
        <fieldset className="relative border border-gray-300 rounded-lg px-3 pt-4 pb-2">
          <legend className="text-xs px-1 text-gray-500">Gender</legend>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border-none bg-transparent text-sm text-gray-800 focus:outline-none"
          >
            <option value="" disabled>
              Select gender
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </fieldset>
      </div>

      {/* Update Profile Button */}
      <div className="px-4 pb-6">
        <button
          onClick={handleUpdateProfile}
          disabled={!isModified}
          className={`w-full py-3 rounded-xl font-medium ${
            isModified
              ? 'bg-orange-500 text-white'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Update profile
        </button>
      </div>

      {/* Image Options Popup */}
      {showOptions && (
        <div
          className="fixed inset-0 bg-black/30 z-50 flex items-end justify-center"
          onClick={() => setShowOptions(false)}
        >
          <div
            className="bg-white w-full rounded-t-2xl p-4 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={handleDelete} className="text-left text-red-600 w-full">
              Delete Photo
            </button>
            <button onClick={triggerGallery} className="text-left w-full">
              Choose from Gallery
            </button>
            <button onClick={handleTakePhoto} className="text-left w-full">
              Take Photo
            </button>
            <button
              onClick={() => setShowOptions(false)}
              className="text-left text-gray-500 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
