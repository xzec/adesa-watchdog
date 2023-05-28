import { type z } from 'zod'
import {
  type AdesaCarAuctionSchema,
  type AdesaCarSearchSchema,
} from '../constants/zod'

export type AdesaCarAuction = z.infer<typeof AdesaCarAuctionSchema>
export type AdesaCarSearch = z.infer<typeof AdesaCarSearchSchema>
