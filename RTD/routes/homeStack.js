import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import MainScreen from '../src/MainScreen';
import ResultComponent from "../src/ResultComponent";
import Autorisation from "../src/Autorisation";
const screens ={
    "Prendre une photo":{
        screen:  MainScreen,
    },
    "Validation des résultats":{
        screen:ResultComponent,
    },
    "Autorisation":{
        screen:Autorisation,
    },
}
const HomeStack = createStackNavigator(screens,{
    defaultNavigationOptions:{
        headerStyle:{backgroundColor:"#ddd"}
    }

});

export default createAppContainer(HomeStack);





