import { memo, useCallback, useEffect, useMemo, useState } from 'react'

import mondaySdk from 'monday-sdk-js'
import {
  Divider,
  Flex,
  Heading,
  Loader,
  Modal,
  ModalContent,
  ModalFooter,
  Text,
  Toast,
} from 'monday-ui-react-core'
import { getCountries } from 'Queries'
import { useSearchParams } from 'react-router-dom'
import {
  BoardResponseDataType,
  BoardType,
  CountryType,
  FilterCallBackDataType,
  WeatherDataType,
} from 'Types'

import CountriesTable from 'components/CountriesTable/CountriesTable'

import { normalizeCountry } from 'helpers'

import Api from 'services/Api'

import { ScrollableDiv } from './style'

const monday = mondaySdk()

const Dashboard: React.FC = () => {
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(
    null,
  )
  const [board, setBoard] = useState<BoardType | null>(null)
  const [countries, setCountries] = useState<CountryType[]>([])
  const [searchFilter, setSearchFilter] = useState<string>('')
  const [countryInfo, setCountryInfo] = useState<WeatherDataType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingCountryInfo, setIsLoadingCountryInfo] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchParams] = useSearchParams()

  const boardId = searchParams.get('boardId')

  const fetchCountryInfo = useCallback(async (countryName: string) => {
    setIsLoadingCountryInfo(true)

    try {
      const { data } = await Api.get<WeatherDataType>(`weather/${countryName}`)
      setCountryInfo(data)
    } catch (e) {
      setError('Error while fetching country info')
    } finally {
      setIsLoadingCountryInfo(false)
    }
  }, [])

  useEffect(() => {
    // @ts-expect-error the `SubscribableEvents` type 'filter' does not exist on `monday-sdk-js/types/client-data.interface.d.ts:1`
    monday.listen('filter', (res) => {
      const {
        data: { term },
      } = res as FilterCallBackDataType

      setSearchFilter(term)
    })

    monday
      .api(getCountries(String(boardId)))
      .then((res) => {
        const { data } = res as BoardResponseDataType

        setBoard(data.boards[0])
        setCountries(data.boards[0].items.map((item) => normalizeCountry(item)))
        setIsLoading(false)
      })
      .catch(() => {
        setError('Error while fetching countries')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleClickOnCountry = useCallback(
    (countryName: string) => {
      setSelectedCountryName(countryName)
      setIsLoadingCountryInfo(true)
      fetchCountryInfo(countryName)
    },
    [fetchCountryInfo],
  )

  const filteredCountries = useMemo(() => {
    if (!searchFilter) return countries

    return countries.filter((country) =>
      country.name
        .toLocaleLowerCase()
        .includes(searchFilter.toLocaleLowerCase()),
    )
  }, [searchFilter, countries])

  return (
    <>
      {board && (
        <Heading
          type={Heading.types.h1}
          customColor="#ff148a"
          size={Heading.sizes.MEDIUM}
          style={{ marginTop: '55px', marginLeft: '20px' }}
          value={board.name}
        />
      )}
      <Toast
        open={!!error}
        type={Toast.types.NEGATIVE}
        autoHideDuration={1000}
        onClose={() => setError(null)}
        className="monday-storybook-toast_wrapper"
      >
        {String(error)}
      </Toast>

      {isLoading && <Loader color={Loader.colors.ON_PRIMARY} size={40} />}
      {!isLoading && !error && countries.length > 0 && (
        <ScrollableDiv>
          <CountriesTable
            countries={filteredCountries}
            handleClickOnCountry={handleClickOnCountry}
          />
        </ScrollableDiv>
      )}
      {selectedCountryName && !error && (
        <Modal
          data-testid="dashboard-modal"
          show
          onClose={() => setSelectedCountryName(null)}
          title={selectedCountryName}
        >
          <ModalContent>
            <>
              {isLoadingCountryInfo && <Loader size={40} />}
              {!isLoadingCountryInfo && countryInfo && (
                <>
                  <Flex justify={Flex.justify.SPACE_BETWEEN}>
                    <Text>Region:</Text>
                    <Text>{countryInfo.location.region}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify={Flex.justify.SPACE_BETWEEN}>
                    <Text>Country:</Text>
                    <Text>{countryInfo.location.country}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify={Flex.justify.SPACE_BETWEEN}>
                    <Text>Local Time:</Text>
                    <Text>{countryInfo.location.localtime}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify={Flex.justify.SPACE_BETWEEN}>
                    <Text>Condition:</Text>
                    <Flex>
                      <Text>{countryInfo.current.condition.text}</Text>
                    </Flex>
                  </Flex>
                  <Divider />
                  <Flex justify={Flex.justify.SPACE_BETWEEN}>
                    <Text>Temperature:</Text>
                    <Text>
                      {`${countryInfo.current.temp_c}°C | ${countryInfo.current.temp_f}°F`}
                    </Text>
                  </Flex>
                  <Divider />
                  <Flex justify={Flex.justify.SPACE_BETWEEN}>
                    <Text>Humidity:</Text>
                    <Text>{`${String(countryInfo.current.humidity)}%`}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify={Flex.justify.SPACE_BETWEEN}>
                    <Text>Wind:</Text>
                    <Text>
                      {`
                      ${String(countryInfo.current.wind_kph)}kph | ${String(
                        countryInfo.current.gust_mph,
                      )}mph
                    `}
                    </Text>
                  </Flex>
                  <Divider />
                  <Flex justify={Flex.justify.SPACE_BETWEEN}>
                    <Text>Wind Direction:</Text>
                    <Text>{countryInfo.current.wind_dir}</Text>
                  </Flex>
                  <Divider />
                  <Flex justify={Flex.justify.SPACE_BETWEEN}>
                    <Text>Wind Degree:</Text>
                    <Text>{String(countryInfo.current.wind_degree)}</Text>
                  </Flex>
                  <Divider />
                </>
              )}
            </>
          </ModalContent>
          {!isLoadingCountryInfo && countryInfo ? (
            <ModalFooter>
              <Flex justify={Flex.justify.SPACE_BETWEEN}>
                <Text>Last updated: </Text>
                <Text>{countryInfo.current.last_updated}</Text>
              </Flex>
            </ModalFooter>
          ) : (
            <div />
          )}
        </Modal>
      )}
    </>
  )
}

export default memo(Dashboard)
