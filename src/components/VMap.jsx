'use client'

import { Map, View } from 'ol'
import { defaults } from 'ol/control'
import Feature from 'ol/Feature.js'
import Point from 'ol/geom/Point.js'
import { Tile, Vector } from 'ol/layer'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import { XYZ } from 'ol/source'
import VectorSource from 'ol/source/Vector.js'
import { Icon, Style, Text } from 'ol/style'
import { useEffect } from 'react'

export default function VMap({ stores }) {
  useEffect(() => {
    const map = new Map({
      controls: defaults({ zoom: true, rotate: false }).extend([]),
      layers: [
        new Tile({
          visible: true,
          source: new XYZ({
            url: `http://api.vworld.kr/req/wmts/1.0.0/${process.env.NEXT_PUBLIC_VWORD_API_KEY}/Base/{z}/{y}/{x}.png`,
          }),
        }),
      ],
      target: 'vmap',
      view: new View({
        center: fromLonLat([126.92247308499337, 37.52572414089632]),
        zoom: 15,
      }),
    })

    const markers = []

    stores?.forEach(({ name, latitude, longitude }) => {
      let marker = new Feature({
        geometry: new Point(fromLonLat([longitude, latitude])),
      })

      let myStyle = new Style({
        text: new Text({
          text: name,
          font: 'bold 14px sans-serif',
          offsetY: 10,
        }),

        image: new Icon({
          anchor: [0.5, 1],
          src: 'http://map.vworld.kr/images/ol3/marker_blue.png',
          scale: 1.0,
        }),
      })

      marker.setStyle(myStyle)
      markers.push(marker)
    })

    const markerLayer = new Vector({
      source: new VectorSource({
        features: [...markers],
      }),
    })

    map.addLayer(markerLayer)
  })

  return <div id="vmap" style={{ width: '100%', height: '500px' }} />
}
