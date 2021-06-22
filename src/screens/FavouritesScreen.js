import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { useSelector } from 'react-redux';
import DefaultText from '../components/DefaultText';

import MealList from '../components/MealList';


const FavouritesScreen = props => {

    const favMeals = useSelector(state => state.meals.favouriteMeals)

    if (favMeals.length === 0 || !favMeals) {
        return <View style={styles.content}>
                     <DefaultText>No favourite meals found. Start adding some!</DefaultText>
               </View>
    }
    
    return (
        <MealList
            listData={favMeals}
            navigation={props.navigation}
        />
    );
};

FavouritesScreen.navigationOptions = navData => {
    return {
    headerTitle: 'Favourites',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Menu" iconName='ios-menu' onPress={() => {
            navData.navigation.openDrawer();
        }} />    
    </HeaderButtons>
    
  };
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default FavouritesScreen;
