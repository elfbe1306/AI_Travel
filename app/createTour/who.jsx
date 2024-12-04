import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import {styles} from '../../styles/who_style'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const SelectTravelsList = [
	{
		id: 1,
		title: 'Một mình',
		desc: 'khám phá những vùng đất mới',
		icon: require('../../assets/images/onlyWho.png')
	}, 
	{
		id: 2,
		title: 'Cùng người yêu',
		desc: 'đến một nơi chỉ có hai ta',
		icon: require('../../assets/images/loverWho.png')
	},
	{
		id: 3,
		title: 'Cùng bạn bè',
		desc: 'đi du lịch vòng quanh thế giới',
		icon: require('../../assets/images/friendWho.png')
	},
	{
		id: 4,
		title: 'Cùng gia đình',
		desc: 'đến một khu du lịch nghỉ dưỡng',
		icon: require('../../assets/images/familyWho.png')
	}
]

export default function WhoTravelling() {

	const router = useRouter();

	const [selectTraveler, setSelectTraveler] = useState();
	
	return (
    <View style={styles.container}>
			<TouchableOpacity style={styles.returnButton} onPress={() => router.back()}>
				<Ionicons name="chevron-back" size={24} color="black" />
			</TouchableOpacity>

			<View style={styles.selectOptionsContainer}>
				<Text style={styles.selectOptionsTitle}>Bạn sẽ...</Text>

				<FlatList
					data={SelectTravelsList}
					keyExtractor={(item) => item.id}
					renderItem={({item, index}) => (
						<TouchableOpacity style = {styles.selectOptionsCard} onPress={() => setSelectTraveler(item.title)}>
							<View>
								<Text style={styles.selectOptionsCardTitle}>{item.title}</Text>
								<Text style={styles.selectOptionsCardDescription}>{item.desc}</Text>
							</View>

							<View>
								<Image source={item.icon}/>
							</View>
						</TouchableOpacity>
					)}
				/>

			</View>
    </View>
  )
}