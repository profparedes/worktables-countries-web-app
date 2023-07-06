import { memo } from 'react'

import { CountryType } from 'Types'

import {
  indexRegionColors,
  indexToRegions,
  indexSubregionColors,
  indexToSubregions,
} from '../../constants'
import { Table, Td, Th, Tr } from './style'

interface ICountriesTableProps {
  countries: CountryType[]
  handleClickOnCountry: (countryName: string) => void
}

const CountriesTable: React.FC<ICountriesTableProps> = ({
  countries,
  handleClickOnCountry,
}) => (
  <Table>
    <thead>
      <tr>
        <Th>Country</Th>
        <Th>Region</Th>
        <Th>Subregion</Th>
        <Th>Capital</Th>
        <Th>Location</Th>
        <Th>International Country Code</Th>
        <Th>Country Code</Th>
        <Th>URL</Th>
        <Th>Phone Code</Th>
        <Th>Currency</Th>
        <Th>Currency Name</Th>
        <Th>Timezones</Th>
        <Th>Latitude</Th>
        <Th>Longitude</Th>
        <Th>Population</Th>
        <Th>Area</Th>
        <Th>Population Density</Th>
        <Th>Net Migration</Th>
        <Th>GDP ($ per capita)</Th>
        <Th>Birthrate</Th>
        <Th>Deathrate</Th>
      </tr>
    </thead>
    <tbody>
      {countries.map((country) => (
        <Tr key={country.id}>
          <Td onClick={() => handleClickOnCountry(country.name)}>
            {country.name}
          </Td>
          <Td
            backgroundColorIndex={
              country.region ? indexRegionColors[country.region.index] : '#ccc'
            }
            className="width-limit background-color"
          >
            {country.region ? indexToRegions[country.region.index] : '--'}
          </Td>
          <Td
            backgroundColorIndex={
              country.subregion
                ? indexSubregionColors[country.subregion.index]
                : '#ccc'
            }
            className="width-limit background-color"
          >
            {country.subregion
              ? indexToSubregions[country.subregion.index]
              : '--'}
          </Td>
          <Td>{country.capital}</Td>
          <Td>{country.location.address}</Td>
          <Td>{country.internationalCountryCode}</Td>
          <Td>{country.countryCode}</Td>
          <Td>{country.url}</Td>
          <Td>{country.phoneCode}</Td>
          <Td>{country.currencyCode}</Td>
          <Td>{country.currencyName}</Td>
          <Td className="width-limit">{country.timezones}</Td>
          <Td>{country.location.lat}</Td>
          <Td>{country.location.lng}</Td>
          <Td>{country.population}</Td>
          <Td>{country.area}</Td>
          <Td>{country.populationDensity}</Td>
          <Td>{country.netMigration}</Td>
          <Td>{country.gdp}</Td>
          <Td>{country.birthrate}</Td>
          <Td>{country.deathrate}</Td>
        </Tr>
      ))}
    </tbody>
  </Table>
)

export default memo(CountriesTable)
