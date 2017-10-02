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

    renderRatios(){

        const { teamRatios } = this.props;

        return (
            <ul className={styles.schedule}>
                <Link to={`Front`}>Next Game Day Matches</Link>
                <Link to={`All`}>All Matches</Link>
                <Link to={`Ratio`}>Win / Loss Ratio</Link>
                {teamRatios.map( team => {

                    const teamId = team.get('TeamId');
                    const teamName = team.get('TeamName');
                    const totalMatches = team.get('won') + team.get('lost');
                    const winRatio = parseInt(team.get('won')/totalMatches * 100);
                    const lossRatio = parseInt(team.get('lost')/totalMatches * 100);
                    const icon = team.get('TeamIconUrl');

                    return(
                        <li className={styles.fixture} key={teamId}>
                            <span><img src={icon}/> {teamName} - Win Ratio {winRatio} / Loss Ratio {lossRatio}</span>
                        </li>
                    )
                })}
            </ul>
        )
    }

    render() {
        return (
            <div className={styles.container}>
                {this.renderRatios()}
            </div>
        );
    }
}

export default
withRouter(connect(props)(Container));
