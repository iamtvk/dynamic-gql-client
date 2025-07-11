import { GraphQLObjectType, GraphQLSchema, isObjectType, isWrappingType, type GraphQLNamedType, type GraphQLType } from "graphql"
import { fetchSchema } from "./introspector"



async function buildQuery(url: string) {
	const schema = await fetchSchema(url)
	if (!schema) {
		return
	}
	const queryType = schema.getQueryType()
	const mutationType = schema.getMutationType()
	const queryFields = queryType?.getFields()
	const mutationFields = mutationType?.getFields()

	for (const fieldName in queryFields) {
		const field = queryFields[fieldName]
		if (!field) {
			return
		}
		console.log(`Query: ${field.name}`)
		console.log(`Args :`, field.args.map(arg => ({
			name: arg.name,
			type: arg.type.toString()
		})))
	}

	for (const fieldName in mutationFields) {
		const field = mutationFields[fieldName]
		if (!field) {
			return
		}
		console.log(`Mutation: ${field.name}`)
		console.log(`Args: `, field.args.map(arg => ({
			name: arg.name,
			type: arg.type.toString()
		})))
	}


}

// function unwrapType(type: GraphQLType): GraphQLNamedType {
// 	while (isWrappingType(type)) {
// 		type = type.ofType
// 	}
// 	return type
// }

await buildQuery("http://localhost:4000")

// Introspection URL
// -> json ->
// {
//   [action_Resource]: {
//     url,
//     method: get,
//     queryParams: {},
//     bodyType: {},
//     responseTypes: Resutant_resource
//     responses: [200, 302]
//   }
//   [query_product]
//   [mutation_order]
// }
// lamda.ts 
// // Import generatedJson
// // onEvent 
//     fn = generatedJson(event.action) // 'get_product'
// res.status() // IN range of 200 exit;
// else // Error Handling logic
