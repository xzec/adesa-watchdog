import { z } from 'zod'

export const AdesaCarAuctionSchema = z.object({
  AuctionId: z.number(),
  CarNameEn: z.string(),
  CarCountryExtended: z.string(),
  BatchStartDate: z.preprocess((val) => val + 'Z', z.coerce.date()),
  BatchEndDate: z.preprocess((val) => val + 'Z', z.coerce.date()),
  StartPrice: z.number(),
  RequestedSalesPrice: z.number(),
  CurrentPrice: z.number(),
  CurrencyCodeId: z.string(),
})

export const AdesaCarSearchSchema = z.object({
  Count: z.number().nonnegative(),
  Auctions: z.array(AdesaCarAuctionSchema),
})
