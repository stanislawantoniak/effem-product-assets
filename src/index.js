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

const api = new ProductAPI()

const server = new ApolloServer({
	schema: schema,
  	dataSources: () => ({
    	productAPI: api
  	}),
	context: ({ req }) => {
		var userbase64 = req.headers['x-user-data'] || '';

		const user = JSON.parse(new Buffer(userbase64, 'base64').toString());

		if (!user.authenticated) throw new AuthenticationError('Unauthorized: You must pass valid user data here.');

		console.log('user from upstream: ',user);
		// add the user to the context
		return { user };
	}
});
 
server.listen({ port: process.env.PORT || 4001 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});