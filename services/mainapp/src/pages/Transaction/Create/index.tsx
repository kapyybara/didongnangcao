import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {
    Button,
    Menu,
    Divider,
    Text,
    Icon,
    Card,
    TextInput,
    SegmentedButtons,
} from 'react-native-paper';
import { GlobalContext } from '../../../contexts/context';
import DropDown from 'react-native-paper-dropdown';
import { CategoryList, TransactionType } from '../../../services/const';
import { DatePickerInput, DatePickerModal, TimePickerModal } from 'react-native-paper-dates';

export const TransactionCreate = ({ navigation }: any) => {
    const [category, setCategory] = useState("")
    const [money , setMoney] = useState(0)
    const [type, setType] = useState("expenses")
    const [description, setDescription] = useState("")
    const [inputDate, setInputDate] = React.useState(undefined)
    const [showDropDown, setShowDropDown] = useState(false);
    const { user } = useContext(GlobalContext)


    return (
        <View className="w-full container p-3 flex ">
            <View className="h-full w-full   ">
                <SegmentedButtons
                    value={type}
                    onValueChange={setType}
                    buttons={TransactionType}
                />
                <DropDown
                    label={"Category"}
                    mode={"outlined"}
                    setValue={setCategory}
                    list={CategoryList}
                    visible={showDropDown}
                    showDropDown={() => setShowDropDown(true)}
                    onDismiss={() => setShowDropDown(false)}
                    value={category} />
                <DatePickerInput
                    locale="en"
                    label="Birthdate"
                    mode={"outlined"}
                    value={inputDate}
                    onChange={(d: any) => setInputDate(d)}
                    inputMode="start"
                />
                <TextInput
                    label={"Description"}
                    value={description}
                    onChangeText={(e)=>setDescription(e)}
                    mode={"outlined"}
                    multiline={true}
                    numberOfLines={5}
                />
                




            </View>

        </View>
    );
}
