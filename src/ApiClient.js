import superagent from 'superagent';

// import { getTokens } from 'helpers/utilities';

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class ApiClient_ {
    constructor() {
        ['get', 'post', 'put', 'patch', 'del'].
            forEach((method) => {
                this[method] = (path, options = {}) => {
                    return new Promise((resolve, reject) => {
                        let request = superagent[method](this.formatUrl(path));
                        if (options && options.params) {
                            request.query(options.params);
                        }
                        request.set('Accept', 'application/json, application/hal+json');
                        // Have to remove this because this is not where it should be done.
                        // const { token, refreshToken } = getTokens();
                        // if(options.authRequired && token) {
                        //     request.set('Authorization', `Bearer ${token}`);
                        // }
                        if (options && options.noCache) {
                            request.set('Expires', '-1');
                            request.set('Cache-Control', 'no-cache,no-store,must-revalidate,max-age=-1,private');
                        }
                        if (options && options.data) {
                            request.send(options.data);
                        }
                        request.end((err, res) => {
                            if (err) {
                                reject(res && JSON.parse(res.text) || err);
                            } else {
                                resolve(JSON.parse(res.text));
                            }
                        });
                    });
                };
            });
    }

  /* This was originally a standalone function outside of this class, but babel kept breaking, and this fixes it  */
  formatUrl(path) {
    return path;
  }
}

export default ApiClient_;
