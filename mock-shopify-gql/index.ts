import { ApolloServer, gql } from "apollo-server";
import { faker } from "@faker-js/faker";

const typeDefs = gql`
type Product {
id: ID!
title: String!
price: Float!
inventory: Int!
}

type Query {
products: [Product!]!
product(id: ID!): Product
}

input NewProductInput {
title: String!
price: Float!
inventory: Int!
}

type Mutation {
createProduct(input: NewProductInput!): Product!
}
`;
// some mock products 
const products = Array.from({ length: 5 }).map(() => ({
	id: faker.string.uuid(),
	title: faker.commerce.productName(),
	price: parseFloat(faker.commerce.price()),
	inventory: faker.number.int({ min: 0, max: 100 })
}));

const resolvers = {
	Query: {
		products: () => products,
		product: (_: any, { id }: { id: string }) => products.find(p => p.id === id)
	},
	Mutation: {
		createProduct: (_: any, { input }: any) => {
			const newProduct = {
				id: faker.string.uuid(),
				...input,
			};
			products.push(newProduct) // like db updat
			return newProduct
		}
	}
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
	console.log(`mock graphql server runnning at ${url}`)
});




