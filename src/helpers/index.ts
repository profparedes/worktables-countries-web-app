import { BoardResponseCountryType, CountryType } from 'Types'

const getColumnValue = (
  columnName: string,
  columns: { id: string; value: string }[],
  removeQuotes = true,
): string => {
  const value = columns.find((column) => column.id === columnName)?.value ?? ''

  return removeQuotes ? value.replace(/"/g, '') : value
}

export const normalizeCountry = (
  country: BoardResponseCountryType,
): CountryType => {
  const regionValue = getColumnValue('region', country.column_values, false)
  const subregionValue = getColumnValue(
    'subregion',
    country.column_values,
    false,
  )

  return {
    id: country.id,
    name: country.name,
    region: regionValue.length > 0 ? JSON.parse(regionValue) : null,
    subregion: subregionValue.length > 0 ? JSON.parse(subregionValue) : null,
    capital: getColumnValue('capital', country.column_values),
    location: JSON.parse(
      getColumnValue('location', country.column_values, false),
    ),
    internationalCountryCode: getColumnValue('iso3', country.column_values),
    countryCode: getColumnValue('iso2', country.column_values),
    url: getColumnValue('tld', country.column_values),
    phoneCode: getColumnValue('phone_code', country.column_values),
    currencyCode: getColumnValue('currency', country.column_values),
    currencyName: getColumnValue('currency_name', country.column_values),
    timezones: getColumnValue('timezones', country.column_values),
    population: Number(getColumnValue('numbers', country.column_values)),
    area: Number(getColumnValue('numbers6', country.column_values)),
    populationDensity: Number(
      getColumnValue('numbers2', country.column_values),
    ),
    netMigration: Number(getColumnValue('numbers0', country.column_values)),
    gdp: Number(getColumnValue('numbers7', country.column_values)),
    birthrate: Number(getColumnValue('numbers9', country.column_values)),
    deathrate: Number(getColumnValue('numbers8', country.column_values)),
  }
}
