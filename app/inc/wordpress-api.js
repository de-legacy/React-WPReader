import Api from './api';
import Config from '../config';

async function getLatestPosts () {
    let url = `${Config.wordpress.url}/${Config.wordpress.wp_api}/${Config.wordpress.posts_route}`;
    Api(url).then(
        (response) => {
            return response;
        }
    );
}

module.exports = getLatestPosts;