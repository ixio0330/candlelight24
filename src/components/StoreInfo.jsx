'use client'

import { MapPin } from 'lucide-react'
import OrderInfo from './OrderInfo'

export default function StoreInfo({ name, road_address, detailed_address, orders }) {
  return (
    <li className="space-y-2 rounded-xl bg-stone-100 p-5">
      <h3 className="font-semibold">{name}</h3>
      <div className="space-y-1 text-sm">
        <div className="flex items-center gap-1">
          <MapPin className="h-4 w-4 shrink-0" />
          <p>
            {road_address}
            {detailed_address && `, ${detailed_address}`}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {orders?.map((order, idx) => (
          <OrderInfo key={`order-${order.recipient_name}-${idx}`} {...order} />
        ))}
      </div>
    </li>
  )
}
