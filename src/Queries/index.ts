export const getCountries = (boardId: string): string => `query
{
  boards(ids: ${boardId}) {
    name
    columns {
      id
      title
    }
    items {
      id
      name
      column_values {
        id
        value
      }
    }
  }
}`
