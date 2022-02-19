import http from './httpService';

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const APIBASE_URL = 'https://api.spotify.com/v1/';
const CLIENTSECRET_BASE64='MTg4YTA1NzhjMTk0NGEzNTkwMzgxZjE0ZWMyMWRjNzU6MzU3MWIyZmU5YWEzNDZlNTlmZWI3MTkwYmQxMTRhY2M=';

//  Fetch Token 
async function fetchToken() {
    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')
    const url = `${TOKEN_URL}`;
    let response = await http.post(url, params,
        { headers: {
            'Authorization': 'Basic '+CLIENTSECRET_BASE64,
            'Content-Type':'application/x-www-form-urlencoded'
        }}).then(resp=>{
            return resp;
        }).catch(err => {
            return {status:500,statusText:err.message};
        });;
    return response;
}

//  GET Featured Playlist 
async function fetchFeaturedPlayList(authtoken) {
    const url = `${APIBASE_URL}browse/featured-playlists?limit=50&offset=0&country=IN`;
    let response = await http.get(url,
        { headers: {
            'Content-Type':'application/json',
            'Authorization':"Bearer "+authtoken
        }}).then(resp=>{
            return resp;
        }).catch(err => {
            return {status:500,statusText:err.message};
        });
    return response;
}

const spotifyService = {
    fetchFeaturedPlayList,
    fetchToken
};

export default spotifyService;