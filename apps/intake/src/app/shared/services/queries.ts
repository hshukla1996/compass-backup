
export const BASE_QUERY = `query GetAllColumnValues($tableName: String!
      $locale: String!
      $columnName: String!
      $keys: [String!]!) {
      tableRows: column(
      columnName: $columnName
      locale: $locale
      tableName: $tableName
      keys:  $keys
   )
`;



