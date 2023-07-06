export type FilterCallBackDataType = {
  data: {
    term: string
  }
}

export type BoardResponseCountryType = {
  id: string
  name: string
  column_values: {
    id: string
    value: string
  }[]
}

export type BoardType = {
  name: string
  columns: {
    id: string
    title: string
  }[]
  items: BoardResponseCountryType[]
}

export type BoardResponseDataType = {
  data: {
    boards: BoardType[]
  }
}

export type CountryType = {
  id: string
  name: string
  region: {
    index: number
  } | null
  subregion: {
    index: number
  } | null
  capital: string
  location: {
    lat: number
    lng: number
    address: string
  }
  internationalCountryCode: string
  countryCode: string
  url: string
  phoneCode: string
  currencyCode: string
  currencyName: string
  timezones: string
  population: number
  area: number
  populationDensity: number
  netMigration: number
  gdp: number
  birthrate: number
  deathrate: number
}

type ConditionType = {
  text: string
  icon: string
  code: number
}

export type WeatherDataType = {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tz_id: string
    localtime_epoch: number
    localtime: string
  }
  current: {
    last_updated_epoch: number
    last_updated: string
    temp_c: number
    temp_f: number
    is_day: number
    condition: ConditionType
    wind_mph: number
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity: number
    cloud: number
    feelslike_c: number
    feelslike_f: number
    vis_km: number
    vis_miles: number
    uv: number
    gust_mph: number
    gust_kph: number
  }
}
