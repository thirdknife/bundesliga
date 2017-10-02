import React from 'react';
import _ from 'underscore';
import path from 'path';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';

import * as actions from '../actions';
import styles from './Container.scss';
import { props } from '../selectors';

const { Component } = React;

class Container extends Component {

    componentWillMount(){

        const { dispatch } = this.props;

        dispatch(actions.requestData());
    }

    renderDate(matchDate){
        const date = new Date(matchDate);
        const month = date.getMonth()+1;
        const day   = date.getDate();
        const year  = date.getFullYear();
        return(<span className={styles.time}>{month}/{day}/{year}</span>)
    }

    renderTeam(teamName, teamLogo, team2Name, team2Logo){
        return(<div><span>{teamName} vs {team2Name}</span><span><img src={teamLogo}/> vs <img src={team2Logo}/></span></div>);
    }

    renderMatchTime(matchTime){

        const date = new Date(matchTime);
        const hour = date.getHours();
        const minutes = date.getMinutes();
        return(<span>{hour}:{minutes} UTC</span>);
    }

    renderStadium(stadium){
        return(<span>{stadium}</span>)
    }

    renderMatches(){

        const { nextGroupMatches, isLoading } = this.props;
        const pendingMatches = nextGroupMatches.filter(m => !m.MatchIsFinished);

        if(isLoading){
            const imgSrc = './spinner.svg';

            return(
                <div><img src={imgSrc}/></div>
            )
        }else{
            return (
                <ul className={styles.schedule}>
                    <Link to={`Front`} activeStyle={{ color: 'black' }}>Next Game Day Matches</Link>
                    <Link to={`All`} activeStyle={{ color: 'black' }}>All Matches</Link>
                    <Link to={`Ratio`} activeStyle={{ color: 'black' }}>Win / Loss Ratio</Link>
                    {pendingMatches.map( match => {

                        const matchID   = match.get('MatchID');
                        const matchDate = match.get('MatchDateTimeUTC');
                        const team1Name = match.getIn(['Team1','TeamName']);
                        const team1Logo = match.getIn(['Team1','TeamIconUrl']);
                        const team2Name = match.getIn(['Team2','TeamName']);
                        const team2Logo = match.getIn(['Team2','TeamIconUrl']);
                        const matchTime = match.get('MatchDateTimeUTC');
                        const stadium   = match.getIn(['Location','LocationStadium']);

                        return(
                            <li className={styles.fixture} key={matchID}>
                                {this.renderDate(matchDate)}
                                {this.renderTeam(team1Name, team1Logo, team2Name, team2Logo)}
                                {this.renderMatchTime(matchTime)}
                                {this.renderStadium(stadium)}
                            </li>
                        )
                    })}

                </ul>
            )
        }

    }
    
    render() {
        return (
            <div className={styles.container}>
                {this.renderMatches()}
            </div>
        );
    }
}

export default
withRouter(connect(props)(Container));
