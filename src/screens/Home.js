import React, { useContext } from 'react'
import { Text, StatusBar, TouchableOpacity } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import { NavigationContext } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const getBooks = gql`
	query GetBooks {
		books {
			id
			name
			available
		}
	}
`

const Home = () => {
	const { loading, error, data } = useQuery(getBooks)
	const navigation = useContext(NavigationContext)
	let content = null

	if (error) {
		content = <Text>Error Fetch Data</Text>
	} else {
		if (loading) {
			content = <Text>Loading...</Text>
		} else {
			content = data.books.map(({ name, available, id }, index) => (
				<TouchableOpacity
					key={index}
					style={{ padding: 12, backgroundColor: 'white', marginVertical: 8, borderRadius: 8, elevation: 1 }}
					onPress={() => navigation.navigate('List Hadiths', { id })}>
					<Text>{name}</Text>
					<Text>{available} Hadiths</Text>
				</TouchableOpacity>
			))
		}
	}

	return (
		<React.Fragment>
			<StatusBar barStyle='dark-content' backgroundColor='white' />
			<SafeAreaView style={{ flex: 1 }}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					keyboardShouldPersistTaps='handled'
					style={{ flex: 1 }}
					contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}>
					{content}
				</ScrollView>
			</SafeAreaView>
		</React.Fragment>
	)
}

export default Home
