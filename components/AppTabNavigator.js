import * as React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {image } from 'react-native';
import DonateScreen from '../screens/DonateScreen';
import RequestScreen from '../screens/RequestScreen';

export const AppTabNavigator=createBottomTabNavigator({
    DonateBook:{screen:DonateScreen,
    navigationOptions:{
        tabBarIcon:<image
        source={
            require("../assets/request-list.png")
        }
        style={{width:20,height:20}}
        />,
        tabBarLabel:"Donate"
        
        
    }
    },
    RequestBook:{screen:RequestScreen,
        navigationOptions:{
            tabBarIcon:<image
            source={
                require("../assets/request-book.png")
            }
            style={{width:20,height:20}}
            />,
            tabBarLabel:"Request"
            
            
        }
    }
})