import * as React from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {globalStyles} from '../shared/globalStyles';
import Card from '../shared/card';
import { listKyocera } from './lists/KyoceraList';
import { Searchbar } from 'react-native-paper';
import {AdMobBanner} from 'expo-ads-admob';

export default function Kyocera ({navigation}) {
    const [search, setSearch] = React.useState('');
    const filteredSearch = listKyocera.filter(model => {
        const itemData = model.name.toUpperCase();
        const searchData = search.toUpperCase();
        return itemData.includes(searchData);
        });


    return (
        <View style={globalStyles.container}>
            <Searchbar
                placeholder="Find a model.."
                onChangeText={setSearch}
                value={search}
                style={globalStyles.searchB}
            />
            <FlatList data={filteredSearch} keyExtractor={(item) => item.key} renderItem={({item}) => (
                <TouchableOpacity onPress={() => navigation.navigate('errorKyocera', {
                    name: item.name, errors: item.errors})}>
                    <Card>
                        <Text style={globalStyles.titleText}> {item.name} </Text>
                    </Card>
                </TouchableOpacity>
            )} />
            <AdMobBanner
            style={globalStyles.ads}
            bannerSize="fullBanner"
            adUnitID="ca-app-pub-4176358068972637/6253324686"
            servePersonalizedAds
            onDidFailToReceiveAdWithError={(err) => console.log(err)} />
        </View>
    );
}
