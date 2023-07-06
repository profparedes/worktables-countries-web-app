import styled from 'styled-components'

type TableDataProps = {
  backgroundColorIndex?: string
}

export const ScrollableDiv = styled.div`
  height: calc(100vh - 120px);
  overflow-x: auto;
  width: 100%;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #30324e;
  }

  &::-webkit-scrollbar-thumb {
    background: #afafaf;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ff148a;
  }
`

export const CountriesTable = styled.table`
  font-family: 'Figtree', sans-serif;
  background-color: #30324e;
  color: #ffffff;
  overflow-x: auto;
  border-spacing: 0;
  border-left: 6px solid #ff148a;
  margin-left: 10px;
  border-radius: 8px;

  .width-limit {
    min-width: 160px;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`
export const Th = styled.th`
  background-color: #4c4e69;
  border: 1px solid #30324e;
  padding: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-left: 20px;
  padding-right: 20px;
  position: sticky;
  top: 0;
  z-index: 1;

  &:first-child {
    position: sticky;
    left: 0;
    z-index: 2;
  }
`

export const Tr = styled.tr`
  & td {
    background-color: #30324e;
  }
  &:hover {
    background-color: #143774;
    & td {
      background-color: transparent;
    }
  }
`

export const Td = styled.td<TableDataProps>`
  text-align: center;
  border: 1px solid #4c4e69;
  padding: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &.background-color {
    background-color: ${({ backgroundColorIndex }) => backgroundColorIndex};
  }

  &:first-child {
    text-align: left;
    position: sticky;
    left: 0;
    z-index: 1;
    cursor: pointer;
  }
`
