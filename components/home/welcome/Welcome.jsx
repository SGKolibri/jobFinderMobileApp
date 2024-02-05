import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image, FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import { icons, SIZES } from '../../../constants'

import styles from './welcome.style'

// const jobTypes = {
//   'Tempo-integral': 'Full-time',
//   'Meio-período': 'Part-time',
//   'Contrato': 'Contractor',
// }

const jobTypes = ["Tempo-integral", "Part-time", "Contractor"];

const FormatJobType = (jobType) => {
  return jobType.toLowerCase().split('-').join('').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

const Welcome = ({ searchTerm, setSearchTerm, handleClick }) => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Tempo-integral");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Olá Samuel.</Text>
        <Text style={styles.welcomeMessage}>Encontre seu trabalho dos sonhos!</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            placeholder='O que você está procurando?'
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={handleClick}>

          <Image
            source={icons.search}
            resizeMode='contain'
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.tab(activeJobType, item)}
              onPress={() => {
                setActiveJobType(item);
                router.push(`/search/${item}`);
              }}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome