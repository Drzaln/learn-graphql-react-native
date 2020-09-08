import React from 'react'
import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { enableScreens } from 'react-native-screens'
import 'react-native-gesture-handler'
enableScreens()

const client = new ApolloClient({
	uri: 'https://rest-wrap.herokuapp.com/',
	cache: new InMemoryCache()
})

const Main = () => (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
)

AppRegistry.registerComponent(appName, () => Main)
