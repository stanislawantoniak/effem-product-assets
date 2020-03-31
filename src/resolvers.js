module.exports = {
  
  Query: {
    products: async (_, __, { dataSources }) =>
      dataSources.productAPI.getAllProducts(),
    product: async (_, { id }, { dataSources }) =>
      dataSources.productAPI.getProductById(id)
  }
};