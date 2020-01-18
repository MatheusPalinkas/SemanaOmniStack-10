import React from 'react';
import { WebView } from 'react-native-webview';

function Profile({ navigation }) {
    const gitHub_UseName = navigation.getParam('github_username');
    return <WebView style={{flex: 1}} source={{uri: `https://github.com/${gitHub_UseName}`}}/>
}


export default Profile;