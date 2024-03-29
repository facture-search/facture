import { ApolloClient, createHttpLink, InMemoryCache, OperationVariables, QueryOptions } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

export async function fetchData<T, V extends OperationVariables = OperationVariables>(uri: string, authToken: string, queryOptions: QueryOptions<V, T>) {
    const httpLink = createHttpLink({ uri });

    const authLink = setContext((_, { headers }) => {
        return { headers: { Authorization: `Bearer ${authToken ? authToken : ""}`, ...headers } };
    });

    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

    const { data } = await client.query<T>(queryOptions);

    return data;
}
