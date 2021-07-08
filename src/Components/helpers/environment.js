let APIUrl = "";

    switch(window.location.hostname){
        case 'localhost' || '127.0.0.1':
            APIUrl = "http://localhost:3005";
            break;
        case 'nab-media-server.herokuapp.com':
            APIUrl = 'http://nab-media-server.herokuapp.com'
    }
export default APIUrl;