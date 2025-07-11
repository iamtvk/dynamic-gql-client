import type { GraphQLObjectType } from "graphql"
import { fetchSchema } from "./introspector"


async function getCapability(endpoint: string): Promise<GqlServerCapability> {
	const client_schema = fetchSchema(endpoint)
	const verbs: GqlVerb[] = []
	const extract = (rootType: GraphQLObjectType, type: "query" | "mutation") => {
		Object.values(rootType.getFields()).forEach(field => {
			verbs.push({
				name: field.name,
				type,
				args: Object.fromEntries(field.args.map(arg => [arg.name, {
					type: arg.type.toString()
				}]))
			})
		})
	}
}
