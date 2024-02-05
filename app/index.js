import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import { Stack, useRouter } from 'expo-router'

import { COLORS, icons, images, SIZES } from '../constants'
import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome, } from '../components'

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function Home() {

    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState('')
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
                <Stack.Screen
                    options={{
                        headerTitle: '',
                        headerStyle: { backgroundColor: COLORS.lightWhite },
                        headerShadowVisible: false,
                        headerLeft: () => (
                            <ScreenHeaderBtn iconUrl={icons.menu} dimension='60%' />
                        ),
                        headerRight: () => (
                            <ScreenHeaderBtn iconUrl={images.profile} dimension='100%' />
                        ),

                    }}
                />
                <ScrollView showsHorizontalScrollIndicator={true} >
                    <View style={{ flex: 1, padding: SIZES.medium }}>
                        <Welcome
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            handleClick={() => {
                                if (searchTerm) {
                                    router.push(`/search/${searchTerm}`)
                                }
                            }}
                        />
                        <Popularjobs />
                        <Nearbyjobs />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}