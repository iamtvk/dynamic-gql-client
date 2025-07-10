import {
	getIntrospectionQuery,
	buildClientSchema,
	type IntrospectionQuery,
	printSchema,
} from 'graphql';

const fetchSchema = async (endpoint: string) => {
	const introspectionQuery = getIntrospectionQuery();
	const res = await fetch(endpoint, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ query: introspectionQuery }),
	});
	const { data, errors } = await res.json();
	if (errors) {
		console.error("Graphql errors:", errors);
		return
	}
	if (!data || !data.__schema) {
		console.error("Invalid schema data");
		return
	}
	const clientSchema = buildClientSchema(data as IntrospectionQuery)
	return clientSchema
}
const schema = await fetchSchema("http://localhost:4000")
if (schema) {
	console.log(printSchema(schema))
	schema.
}


