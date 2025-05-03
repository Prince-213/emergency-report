"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"

type LocationContextType = {
  coordinates: { latitude: number | null; longitude: number | null }
  locationError: string | null
  isLoading: boolean
  refreshLocation: () => void
  setManualCoordinates: (lat: number, lng: number) => void
  usingMockLocation: boolean
}

const LocationContext = createContext<LocationContextType>({
  coordinates: { latitude: null, longitude: null },
  locationError: null,
  isLoading: false,
  refreshLocation: () => {},
  setManualCoordinates: () => {},
  usingMockLocation: false,
})

export const useLocation = () => useContext(LocationContext)

// Mock coordinates for campus (fallback)
const MOCK_COORDINATES = { latitude: 40.7128, longitude: -74.006 }

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [coordinates, setCoordinates] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  })
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [usingMockLocation, setUsingMockLocation] = useState(false)

  const useFallbackLocation = useCallback(() => {
    // Use mock coordinates as fallback
    setCoordinates(MOCK_COORDINATES)
    setIsLoading(false)
    setUsingMockLocation(true)
  }, [])

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser")
      useFallbackLocation()
      return
    }

    setIsLoading(true)
    setLocationError(null)

    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          setIsLoading(false)
          setUsingMockLocation(false)
        },
        (error) => {
          console.error("Error getting location:", error.message)
          setLocationError("Unable to retrieve your location. Using campus coordinates instead.")
          useFallbackLocation()
        },
        { timeout: 10000, enableHighAccuracy: true },
      )
    } catch (error) {
      console.error("Exception when getting location:", error)
      setLocationError("Unable to access location services. Using campus coordinates instead.")
      useFallbackLocation()
    }
  }

  const setManualCoordinates = (lat: number, lng: number) => {
    setCoordinates({ latitude: lat, longitude: lng })
    setUsingMockLocation(false)
  }

  useEffect(() => {
    // Try to get location on mount, fallback to mock if it fails
    getLocation()

    // If geolocation fails or times out after 2 seconds, use fallback
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        useFallbackLocation()
      }
    }, 2000)

    return () => clearTimeout(fallbackTimer)
  }, [useFallbackLocation, isLoading])

  const refreshLocation = () => {
    getLocation()
  }

  return (
    <LocationContext.Provider
      value={{
        coordinates,
        locationError,
        isLoading,
        refreshLocation,
        setManualCoordinates,
        usingMockLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}
