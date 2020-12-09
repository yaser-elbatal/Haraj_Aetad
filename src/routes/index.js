import React, { useEffect } from "react";
import { StatusBar, SafeAreaView, View } from 'react-native'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { MainStackNavigator } from './DrawerCustomization'
import { useSelector, useDispatch } from 'react-redux';

const RootStack = createStackNavigator();

function renderScreens() {

    const dispatch = useDispatch();

    return (

        <RootStack.Screen name={'MainStack'} component={MainStackNavigator} />
    )

}

function AppNavigator() {

    return (

        <NavigationContainer>

            <RootStack.Navigator screenOptions={{ headerShown: false }} >

                {renderScreens()}
            </RootStack.Navigator>

        </NavigationContainer>

    );
}

export default AppNavigator;

