const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const ProductAPI = require('./datasources/product');

const dotenv = require('dotenv');
dotenv.config();

const { buildFederatedSchema } = require('@apollo/federation');

const schema = buildFederatedSchema([{
		typeDefs,
		resolvers
	}]);

const server = new ApolloServer({
	schema: schema,
  dataSources: () => ({
    productAPI: new ProductAPI()
  }),
  engine: {
		apiKey: process.env.AGM_API_KEY,
		schemaTag: process.env.AGM_SCHEMA_TAG
  }
});

server.listen({ port: process.env.PORT || 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});