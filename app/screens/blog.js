import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ListView, Button } from 'react-native';
import Config from '../config';
import Header from '../components/header';
import ItemRow from '../components/item-row';
import Api from '../inc/api';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

let req_url;

export default class Blog extends Component {
    static navigationOptions = {
        title: Config.wordpress.blog_name,
    };

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
             dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            posts : {},
            page: 1,
        }

        req_url = `${Config.wordpress.url}/${Config.wordpress.wp_api}/${Config.wordpress.posts_route}?per_page=${Config.wordpress.per_page}`;
        this._latestPosts = this._latestPosts.bind(this);
        this._loadNextContentAsync = this._loadNextContentAsync.bind(this);
        this._loadPrevContentAsync = this._loadPrevContentAsync.bind(this);
        this._renderFooter = this._renderFooter.bind(this);
    }

     async _latestPosts() {
        let url = `${req_url}&page=${this.state.page}`;
        
        Api(url).then(
            (response) => {
                this.setState({
                    loaded: true,
                    posts: this.state.dataSource.cloneWithRows(response)
                });
            }
        );
    }

      async _loadNextContentAsync(e)  {
        this.setState({
            loaded: false,
            page: this.state.page + 1
        });
    
        let url = `${req_url}&page=${this.state.page + 1}`;
        Api(url).then(
            (response) => {
                this.setState({
                    loaded: true,
                    posts: this.state.dataSource.cloneWithRows(response),
                });
            }
        );
    }

    async _loadPrevContentAsync (e)  {
        if (this.state.page > 1) {
            this.setState({
                loaded: false,
                page: this.state.page - 1
            });

            let url = `${req_url}&page=${this.state.page - 1}`;
            Api(url).then(
                (response) => {
                    this.setState({
                        loaded: true,
                        posts: this.state.dataSource.cloneWithRows(response),
                    });
                }
            );
        } else {
            alert("No more Previous page");
        }
    }

     _renderFooter() {
        return ( 
            <View style={styles.buttonContainer}>  
                {
                    this.state.page > 1 &&
                    <Button
                        style={styles.buttonPrev}
                        onPress={this._loadPrevContentAsync}
                        title="Previous"
                        accessibilityLabel="Load more posts"
                    />
                }

                <Button
                    style={styles.buttonNext}
                    onPress={this._loadNextContentAsync}
                    title="Next"
                    color="#841584"
                    accessibilityLabel="Load more posts"
                />
            </View>
        )
    }

    componentDidMount() {
        this._latestPosts();
        console.log(this.state.page);
    }

    render() {
        return (
            <View style={styles.container}> 
                <Header/>            
                {
                    this.state.loaded === false &&
                    <View style={styles.loadingContainer}>
                        <Text>Loading...</Text>
                    </View>
                }
            
                {
                    this.state.loaded &&
                    <ListView dataSource={this.state.posts} 
                        renderRow={(rowData) => <ItemRow {...rowData}/>}
                        renderSeparator={(sectionId, rowId) =>  <View key={rowId} style={styles.separator}/>}
                    />
                }   

                {
                    this._renderFooter()
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: (Platform.OS === 'ios') ? 60 : 50
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#ccc',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: '#ccc',
        justifyContent: "center"
    },
    buttonNext: {
    },
    buttonPrev: {
    }
});