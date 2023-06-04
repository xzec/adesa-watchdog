export const SEARCH_URL = 'https://www.adesa.eu/en/findcarv6/search'

export const SEARCH_REQUEST_PAYLOAD = {
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
