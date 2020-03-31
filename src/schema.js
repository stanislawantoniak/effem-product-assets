const { gql } = require('apollo-server');

const typeDefs = gql`

type Asset @key(fields: "id") {
  id: ID!
  url: String
  format: String
  status: String
  bytes: Int
}

extend type Product @key(fields: "id") {
  id: ID! @external
  digitalAssets: [Asset]
  backImage: Asset
  mainImage: Asset
}

`;

module.exports = typeDefs;

