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

export default function VMap() {
  useEffect(() => {
    // create Map instance
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
        center: fromLonLat([127.189972804, 37.723058796]),
        zoom: 15,
      }),
    })

    let marker = new Feature({
      geometry: new Point(fromLonLat([127.189972804, 37.723058796])),
    })

    let myStyle = new Style({
      text: new Text({
        text: '마크',
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

    // create a vector layer and add the marker feature to it
    const markerLayer = new Vector({
      source: new VectorSource({
        features: [marker],
      }),
    })

    // add myLayer
    map.addLayer(markerLayer)
  })

  return <div id="vmap" style={{ width: '100%', height: '500px' }} />
}
