import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CategoryGridTile from '../components/CategoryGridTile';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


import { CATEGORIES } from '../data/dummy-data';
import CustomHeaderButton from '../components/CustomHeaderButton';


const CategoriesScreen = (props) => {

    const renderGridItem = ({item}) => {
        return (
            <CategoryGridTile 
                title={item.title} 
                onSelect={() => {
                    props.navigation.navigate({routeName: 'CategoryMeals', params: {
                        categoryId: item.id
                    }});
            }}
                color={item.color}
            />
        );
    };

    return (
        <FlatList 
            keyExtractor={(item, index) => item.id }
            numColumns={2}
            data={CATEGORIES}
            renderItem={renderGridItem}  
        />
    
    );
};

CategoriesScreen.navigationOptions = navData => {
    return {
    headerTitle: 'Meal Categories',
    headerLeft: () =>  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Menu" iconName='ios-menu' onPress={() => {
            navData.navigation.openDrawer();
        }} />    
    </HeaderButtons>
    
  };
};
  

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    

});

export default CategoriesScreen;
