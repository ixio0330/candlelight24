'use client'
import { Map, View } from 'ol'
import { defaults } from 'ol/control'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import { Tile, Vector as VectorLayer } from 'ol/layer'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import { XYZ } from 'ol/source'
import ClusterSource from 'ol/source/Cluster'
import VectorSource from 'ol/source/Vector'
import { Circle, Fill, Icon, Stroke, Style, Text } from 'ol/style'
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

    const markers = stores.map(({ id, name, latitude, longitude }) => {
      const marker = new Feature({
        geometry: new Point(fromLonLat([longitude, latitude])),
        storeName: name,
        storeId: id,
      })

      const markerStyle = new Style({
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

      marker.setStyle(markerStyle)
      return marker
    })

    const vectorSource = new VectorSource({
      features: markers,
    })

    const clusterSource = new ClusterSource({
      distance: 50,
      source: vectorSource,
    })

    const clusterStyleFunction = (feature) => {
      const singleFeature = feature.get('features')[0]
      const size = feature.get('features').length

      const style = new Style({
        image: new Circle({
          radius: size > 1 ? 15 : 10,
          fill: new Fill({
            color:
              size > 1 ? 'rgba(255, 153, 0, 0.8)' : 'rgba(0, 128, 255, 0.8)',
          }),
          stroke: new Stroke({
            color: '#fff',
            width: 2,
          }),
        }),
        text: new Text({
          text:
            size > 1
              ? size.toString()
              : (singleFeature?.get('storeName') ?? ''),
          fill: new Fill({
            color: '#000',
          }),
          font: 'bold 14px sans-serif',
          offsetY: size > 1 ? 0 : 22,
        }),
      })
      return style
    }

    const clusterLayer = new VectorLayer({
      source: clusterSource,
      style: clusterStyleFunction,
    })

    map.addLayer(clusterLayer)

    map.on('click', (event) => {
      const feature = map.forEachFeatureAtPixel(event.pixel, (feat) => feat)

      if (feature) {
        const clusteredFeatures = feature.get('features')
        const storeId = clusteredFeatures.map((f) => f.get('storeId'))
        console.log(storeId)
      }
    })

    return () => {
      map.setTarget(undefined)
    }
  }, [stores])

  return <div id="vmap" style={{ width: '100%', height: '500px' }} />
}
