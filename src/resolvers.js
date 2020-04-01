module.exports = {
	Product: {
		__resolveReference(product, { dataSources }) {
			return dataSources.productAPI.getProductById(product.id)
		}
	}
};