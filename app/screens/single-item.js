import React, { Component } from 'react';
import { Platform, Text, WebView, View, ScrollView, StyleSheet } from 'react-native';
import Api from '../inc/api';
import { Actions } from 'react-native-router-flux';

export default class SingleItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            post: {}
        };
        this._loadSinglePost = this._loadSinglePost.bind(this);

        if (this.state.loaded) {
            Actions.refresh({title: this.state.post.title.rendered});
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.loaded === false &&
                    <View style={styles.loadingContainer}>
                        <Text>Loading...</Text>
                    </View>
                }

                {
                    this.state.loaded && 
                   <Text style={styles.singleTitle}>{this.state.post.title.rendered}</Text>
                }

                {
                    this.state.loaded && 
                    <WebView  
                        source={{html: this.state.post.content.rendered}} />
                }
            </View>
        );
    }

    componentDidMount() {
        if (this.state.loaded) {
            Actions.refresh({title: this.state.post.title.rendered});
        }

        this._loadSinglePost();
    }

    async _loadSinglePost() {
        let url = `${Config.wordpress.url}/${Config.wordpress.wp_api}/${Config.wordpress.posts_route}/${this.props.id}`;
        Api(url).then(
            (response) => {
                
                this.setState({
                    loaded: true,
                    post: response
                })

                Actions.refresh({title: response.title.rendered});
            }
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 60 : 50,
        padding: 10
    },
    singleTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        marginTop: 10
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain',
        maxWidth: "100%"
    }
});