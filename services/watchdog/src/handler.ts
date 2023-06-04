import fetch from 'node-fetch'
import { SEARCH_URL } from './constants'
import { Writable } from 'stream'
import assert from 'node:assert'
import { AdesaCarSearchSchema } from './constants/zod'
import {
  type AdesaCarAuction,
  type AdesaCarSearch,
} from './types/types'

const MOCK_EVENT_BODY = {
  query: {
    MakeModels: [
      {
        Make: 'Skoda',
        Models: [
          'Kamiq',
        ],
      },
    ],
    Transmissions: [
      'Automatic',
    ],
  },
  FacetRequest: [
    'CleanMake',
    'FuelGroupSearch',
    'GearboxGroupSearch',
    'PremiumOffer',
    'CleanModel',
    'CommunityId',
    'CountryCodeDealer',
  ],
  Sort: {
    Field: 'BatchStartDateForSorting',
    Direction: 'ascending',
    SortType: 'Field',
  },
  Paging: {
    PageNumber: 1,
    ItemsPerPage: 100,
  },
  UniqueSearchLogId: '04f564be-5787-4055-a4cc-ec7b1a06a43e',
  SavedSearchId: null,
  PageUrl: 'https://www.adesa.eu/en/findcar?makesModels=Skoda%2CKamiq&transmissionTypes=Automatic',
}

export async function handler(): Promise<void> {
  const res = await fetch(SEARCH_URL, {
    method: 'POST',
    body: JSON.stringify(MOCK_EVENT_BODY),
  })
  if (!res.body) throw new Error('No response.')
  const streamRes = res.body

  // Create a custom writable stream to accumulate the chunks of data
  const dataChunks: Buffer[] = []
  const writableStream = new Writable({
    write(chunk, encoding, callback) {
      dataChunks.push(chunk)
      callback()
    },
  })

  await new Promise((resolve, reject) => {
    streamRes.pipe(writableStream)
    streamRes.on('end', resolve)
    streamRes.on('error', reject)
  })

  assert.ok(Array.isArray(dataChunks))
  const searchResultString = dataChunks.join('')
  const searchResult = JSON.parse(searchResultString)

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
  // console.log(JSON.stringify(searchResult))
}
