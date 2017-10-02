import React from 'react';
import styles from './App.scss';
import { withRouter, Link } from 'react-router';

const { Component } = React;

export default
class App extends Component {

    renderBase() {

        const { parent } = this.props;

        return parent;
    }

    renderProgress() {

        const { progress } = this.props;

        window.progress = progress;

        return progress;
    }

    render() {
        return (
            <div className={styles.container}>
                {this.renderBase()}
            </div>
        );
    }
}