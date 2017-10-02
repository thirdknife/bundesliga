import co from 'co';
require('es6-promise').polyfill();
require('isomorphic-fetch');

const matchDayURI     = `https://www.openligadb.de/api/getmatchdata/bl1`;
const currentGroupURI = `https://www.openligadb.de/api/getcurrentgroup/bl1`;
const allTeamsURI     = `https://www.openligadb.de/api/getavailableteams/bl1/2017`;

function generateMatchDayURI(year, groupID) {
    return `https://www.openligadb.de/api/getmatchdata/bl1/${year}/${groupID}`;
}
function requestDataFromURI(URI) {
    return co(function *() {
         const data = yield fetch(URI)
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                return data;
            });

        return data;
    });
}

export
function requestData(){
    return co(function *() {
        const allMatches = yield requestDataFromURI(generateMatchDayURI(2017, ''));

        return { allMatches };
    });
}
