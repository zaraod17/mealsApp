import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons'
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { Platform } from 'react-native';

import Colors from '../colors/Colors';

const CustomHeaderButton = props => {
    return (
        <HeaderButton 
            {...props} 
            IconComponent={Ionicons} 
            iconSize={23} 
            color={Platform.OS === 'android' ? 'white' : Colors.primaryColor} 
        /> 
    );
};

const styles = StyleSheet.create({

});

export default CustomHeaderButton;
