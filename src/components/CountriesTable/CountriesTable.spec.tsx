import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CountryType } from 'Types'
import { expect, describe, it, vi } from 'vitest'

import CountriesTable from './CountriesTable'

const mockCountryData: CountryType = {
  id: '1',
  name: 'Testland',
  region: { index: 0 },
  subregion: { index: 0 },
  capital: 'Testville',
  location: {
    lat: 0,
    lng: 0,
    address: '123 Test St, Testville, Testland',
  },
  internationalCountryCode: 'TST',
  countryCode: 'TST',
  url: 'https://www.testland.com',
  phoneCode: '123',
  currencyCode: 'TST',
  currencyName: 'Test Dollar',
  timezones: 'UTC+0',
  population: 1000000,
  area: 100000,
  populationDensity: 10,
  netMigration: 0,
  gdp: 50000,
  birthrate: 2.1,
  deathrate: 1.1,
}

const mockHandleClickOnCountry = vi.fn()

describe('CountriesTable', () => {
  it('should render country data correctly', () => {
    render(
      <CountriesTable
        countries={[mockCountryData]}
        handleClickOnCountry={mockHandleClickOnCountry}
      />,
    )

    const countryName = screen.getAllByText('Testland')
    const capital = screen.getAllByText('Testville')
    const address = screen.getAllByText('123 Test St, Testville, Testland')
    const internationalCountryCode = screen.getAllByText('TST')
    const url = screen.getAllByText('https://www.testland.com')

    expect(countryName[0]).toBeTruthy()
    expect(capital[0]).toBeTruthy()
    expect(address[0]).toBeTruthy()
    expect(internationalCountryCode[0]).toBeTruthy()
    expect(url[0]).toBeTruthy()
  })

  it('should call handleClickOnCountry on country name click', async () => {
    render(
      <CountriesTable
        countries={[mockCountryData]}
        handleClickOnCountry={mockHandleClickOnCountry}
      />,
    )

    const countryName = screen.getAllByText('Testland')
    await userEvent.click(countryName[0])

    expect(mockHandleClickOnCountry).toHaveBeenCalledWith('Testland')
  })
})
