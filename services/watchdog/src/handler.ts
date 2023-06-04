import fetch from 'node-fetch'
import {
  SEARCH_REQUEST_PAYLOAD,
  SEARCH_URL,
} from './constants'
import { AdesaCarSearchSchema } from './constants'
import {
  type AdesaCarAuction,
  type AdesaCarSearch,
} from './types'

export async function handler(): Promise<void> {
  const res = await fetch(SEARCH_URL, {
    method: 'POST',
    body: JSON.stringify(SEARCH_REQUEST_PAYLOAD),
  })
  if (!res.body) throw new Error('No response.')
  const searchResult = await res.json()

  const validatedSearchResult: AdesaCarSearch = AdesaCarSearchSchema.parse(searchResult)

  console.log(validatedSearchResult.Count)
  const toLog = validatedSearchResult.Auctions.map((auction: AdesaCarAuction) => ({
    AuctionId: auction.AuctionId,
    CarNameEn: auction.CarNameEn,
    CarCountryExtended: auction.CarCountryExtended,
    BatchStartDate: auction.BatchStartDate,
    BatchEndDate: auction.BatchEndDate,
    StartPrice: auction.StartPrice,
    RequestedSalesPrice: auction.RequestedSalesPrice,
    CurrentPrice: auction.CurrentPrice,
    CurrencyCodeId: auction.CurrencyCodeId,
  }))

  console.log(toLog)
}
