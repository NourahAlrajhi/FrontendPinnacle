import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
//import { Link,useNavigate } from "react-router-dom";


export const YourComponent = ({ Position }) => {


    function handleClick() {
    }

    return (
        <Menu>
            <MenuTrigger text='...' />
            <MenuOptions optionsContainerStyle={{ width: 100, height: 60 }}>
                <MenuOption onSelect={handleClick} customStyles={{ width: 100, height: 30 }} text='View'>
                </MenuOption>
                <MenuOption onSelect={() => alert(`Delete`)} customStyles={{ width: 100, height: 30 }} text='Edit'>
                </MenuOption>

            </MenuOptions>
        </Menu>
    )
}