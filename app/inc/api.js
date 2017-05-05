// module.exports = (url) => {
//     fetch(url).then((response) => {
//          response.json();
//     }).then((json) => {
//          json;
//     }).catch((error) => {
//          error;
//     }); 
// };

module.exports = function(url){
	return fetch(url).then(function(response){
		return response.json();
	}).then(function(json){
		return json;
	}).catch((error) => {
        console.error(error);
    });
}
