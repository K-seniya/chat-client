class UrlsUtil {


    getUrl(arg) {
        const envMode = process.env.NODE_ENV;
        console.log('ENV: ' + envMode);
        switch (envMode) {
            case 'production': {
                return 'https://chat-service-appreciative-kudu.cfapps.io' + arg;
            }
            case 'development': {
                return 'https://chat-service-appreciative-kudu.cfapps.io' + arg;
            }
            default: {
                return 'http://localhost:8080' + arg
            }
        }
    }
}

export default new UrlsUtil();

export class UrlsUtilStatic {


    static getUrl(arg) {
        const envMode = process.env.NODE_ENV;
        switch (envMode) {
            case 'production': {
                return 'https://chat-service-appreciative-kudu.cfapps.io' + arg;
            }
            case 'development': {
                return 'https://chat-service-appreciative-kudu.cfapps.io' + arg;
            }
            default: {
                return 'http://localhost:8080' + arg
            }
        }
    }
}
