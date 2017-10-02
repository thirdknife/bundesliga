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

function findWinnerLooser(result, team1, team2){
    const finalResult = result[1];

    if(finalResult.PointsTeam1 > finalResult.PointsTeam2){
        return { winner : team1.TeamId , looser : team2.TeamId };
    }else{
        return { winner : team2.TeamId , looser : team1.TeamId };
    }
}

export
function requestData(){
    return co(function *() {

        // const currentGroupMatches = yield requestDataFromURI(matchDayURI);

        const groupData = yield requestDataFromURI(currentGroupURI);

        const currentGroup = parseInt(groupData.GroupOrderID);

        const nextGroupMatches = yield requestDataFromURI(generateMatchDayURI(2017, currentGroup + 1));
        // const allMatches = yield requestDataFromURI(generateMatchDayURI(2017, ''));

        // const allTeams   = yield  requestDataFromURI(allTeamsURI);

        // const allTeamsWithDefaultRatio = {};

        // allTeams.map(t=>{
        //     allTeamsWithDefaultRatio[t.TeamId] = t;
        //     allTeamsWithDefaultRatio[t.TeamId]['won'] = 0;
        //     allTeamsWithDefaultRatio[t.TeamId]['lost'] = 0;
        // });

        // const finishedMatches = allMatches.filter(m => m.MatchIsFinished);

        // finishedMatches.forEach(fm=>{
        //     const { winner, looser } = findWinnerLooser(fm.MatchResults, fm.Team1, fm.Team2);
        //     allTeamsWithDefaultRatio[winner]['won']++;
        //     allTeamsWithDefaultRatio[looser]['lost']++;
        // });

        return { currentGroup , nextGroupMatches };
    });
}
