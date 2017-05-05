import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Config from '../config';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

        this.onHeaderPress = this.onHeaderPress.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.mainTitle} onPress={this.onHeaderPress}>Recent Posts</Text>
            </View>
        );
    }

    onHeaderPress() {
        
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop : 5,
        paddingBottom: 5,
        backgroundColor: "#252525"
    },
    mainTitle: {
        fontWeight: "500",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff"
    }
});