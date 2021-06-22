import React from 'react';
import { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FiltersScreen from '../screens/FiltersScreen';
import { Platform } from 'react-native';
import FavouritesScreen from '../screens/FavouritesScreen';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';

import Colors from '../colors/Colors';

const defaultNavStackOptions = {
    
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: 
                Platform.OS === 'android' ? Colors.primaryColor : ''
            },

            headerTitleStyle: {
                fontFamily: 'open-sans-bold'
            },
            headerBackTitleStyle: {
                fontFamily: 'open-sans'
            },

            headerTintColor: 
                Platform.OS === 'android' ? 'white' : Colors.primaryColor,
            headerTitle: 'A Screen'
    }};

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen, 
        } ,
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen 
}, defaultNavStackOptions

);

const FavNavigator = createStackNavigator({
    Favourites: FavouritesScreen,
    MealDetail: MealDetailScreen
},   defaultNavStackOptions

);

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator, 
            navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons 
                            name='ios-restaurant' 
                            size={25} 
                            color={tabInfo.tintColor}
                    />
            },

            tabBarColor: Colors.primaryColor,
            tabBarLabel: <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text>
        }
},
    Favourites: {
        screen: FavNavigator, 
            navigationOptions: {
                tabBarIcon: (tabInfo) => {
                    return <Ionicons 
                                name='ios-star' 
                                size={25} 
                                color={tabInfo.tintColor}
                            />
                },
                tabBarColor: Colors.accentColor
                
            }}
};

const MealsFavTabNavigator = 
    Platform.OS === 'android' 
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: Colors.primaryColor
        }
    })
    : createBottomTabNavigator(
         tabScreenConfig,
    
    {
        tabBarOptions: {
            activeTintColor: Colors.accentColor
        }
    }
    );

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen
},  
    defaultNavStackOptions


);

const MainNavigator = createDrawerNavigator({
    MealsFavs: {screen: MealsFavTabNavigator, navigationOptions: {
        drawerLabel: 'Meals'
    }},
    Filters: FiltersNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans'
        }
    }
});

export default createAppContainer(MainNavigator);