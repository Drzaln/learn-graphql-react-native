import React, { useContext } from 'react'
import { Text, StatusBar, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { gql, useQuery } from '@apollo/client'
import { NavigationContext } from '@react-navigation/native'

const getHadiths = gql`
	query getHadiths($id: String!) {
		hadith(id: $id, from: 1, until: 50) {
			name
			id
			hadiths {
				number
				id
			}
		}
	}
`

const HadithDetail = ({ route }) => {
	const { loading, error, data } = useQuery(getHadiths, {
		variables: { id: route.params.id }
	})
	const navigation = useContext(NavigationContext)
	let content = null
	let name = null

	if (error) {
		content = <Text>Error Fetch Data</Text>
	} else {
		if (loading) {
			content = <Text>Loading...</Text>
		} else {
			content = data.hadith.hadiths.map(({ number, id }, index) => {
				return (
					<TouchableOpacity
						key={index}
						style={{
							padding: 12,
							backgroundColor: 'white',
							marginVertical: 8,
							borderRadius: 8,
							elevation: 1
						}}
						onPress={() =>
							navigation.navigate('Hadith Detail', {
								id: data.hadith.name,
								number: number
							})}>
						<Text>Hadith nomor {number}</Text>
						<Text numberOfLines={1}>{id}</Text>
					</TouchableOpacity>
				)
			})
			name = <Text>{data.hadith.name}</Text>
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
					{name}
					{content}
				</ScrollView>
			</SafeAreaView>
		</React.Fragment>
	)
}

export default HadithDetail
