import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import HTMLView from 'react-native-htmlview'
import Config from '../config';
import { Actions } from 'react-native-router-flux';

export default class ItemRow extends Component {
    constructor(props){
        super(props);

        this.state = {}
        this._onPressItem = this._onPressItem.bind(this);
    }

    render() {
        let excerpt = this.props.excerpt.rendered.substring(0, Config.wordpress.excerpt_length);
        const goSinglePage = () => Actions.SingleItem({id: this.props.id});

        return (
            <TouchableHighlight onPress={goSinglePage}>
                <View style={styles.container}>
                    <Text style={styles.title}>{this.props.title.rendered}</Text>
                    <HTMLView
                        value={`<i>${excerpt}</i>`}
                        stylesheet={styles}
                    />
                </View>
            </TouchableHighlight>
        );
    }

    _onPressItem() {
        Actions.pageTwo
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 5, 
        paddingBottom: 5,
        paddingRight: 10,
        paddingLeft: 10,
    },
    title: {
        fontWeight: "500",
        marginBottom: 5
    },
    excerpt: {
        fontWeight: "200",
        fontStyle: "italic"
    },
    p: {
        fontStyle: "italic",
        fontSize: 12
    }
});