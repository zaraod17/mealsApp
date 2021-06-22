import React, {useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';
import { useDispatch } from 'react-redux';
import { setFilters } from '../store/actions/meals'

const FilterSwitch = props => {
    return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch 
                value={props.state} 
                onValueChange={props.onValueChange} />
        </View>
    );
};

const FiltersScreen = props => {

    const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  const saveFilters = useCallback(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    };

    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  useEffect(() => {
    navigation.setParams({ save: saveFilters });
  }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters / Resctrictions</Text>
            <FilterSwitch 
                label='Gluten-free' 
                state={isGlutenFree} 
                onValueChange={newValue => setIsGlutenFree(newValue) } 
            />
            <FilterSwitch 
                label='Lactose-free' 
                state={isLactoseFree} 
                onValueChange={newValue => setIsLactoseFree(newValue) } 
            />
            <FilterSwitch 
                label='Vegan' 
                state={isVegan} 
                onValueChange={newValue => setIsVegan(newValue) } 
            />
            <FilterSwitch 
                label='Vegetarian' 
                state={isVegetarian} 
                onValueChange={newValue => setIsVegetarian(newValue) } 
            />
        </View>
    );
};

FiltersScreen.navigationOptions = navData => {
    return {
    headerTitle: 'Filters',
    headerLeft: () =>  (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={() => {
                navData.navigation.openDrawer();
            }} />    
        </HeaderButtons>
    ),

    headerRight: () =>  (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Save" iconName='ios-save' onPress={navData.navigation.getParam('save')} 
        />    
        </HeaderButtons>
    ),
    
  };
};


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },

    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
        marginVertical: 15

    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center'
    }
});

export default FiltersScreen;
