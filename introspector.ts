import {
	getIntrospectionQuery,
	buildClientSchema,
	type IntrospectionQuery,
} from 'graphql';

export const fetchSchema = async (endpoint: string) => {
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


