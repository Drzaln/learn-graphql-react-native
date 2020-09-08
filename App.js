import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './src/screens/Home'
import HadithsList from './src/screens/HadithsList'
import HadithDetail from './src/screens/HadithDetail'

const Stack = createStackNavigator()

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Home' component={Home} />
				<Stack.Screen name='List Hadiths' component={HadithsList} />
				<Stack.Screen name='Hadith Detail' component={HadithDetail} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default App
