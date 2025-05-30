'use client'

import { Loader } from '@googlemaps/js-api-loader'
import { useRef, useEffect } from 'react'

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
        version: 'weekly'
      })

      const { Map } = await loader.importLibrary('maps')

      // init marker

      const { Marker } = (await loader.importLibrary('marker')) as google.maps.MarkerLibrary

      const position = {
        lat: 49.23378,
        lng: 28.4115
      }

      // options

      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 17,
        mapId: 'MY_NEXTJS_MAPID'
      }

      // setup map

      const map = new Map(mapRef.current as HTMLDivElement, mapOptions)

      const marker = new Marker({
        position,
        map
      })
    }

    initMap()
  }, [])

  return (
    <>
      <div className='h-[391px]' ref={mapRef} />
    </>
  )
}
