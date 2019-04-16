import React, { Component } from 'react';
import '../App.css';
import 'react-table/react-table.css';
import Calendar from "../Calendar";
import {downloadExcelSheet} from "../Utils";
import columns from './columns';
import {Table} from "../Table";
import {LinkButton, LogSelectionButton} from "../Buttons";



class TestSubmissions extends Component {
    constructor(props) {
        super(props);

        const now = new Date();
        const dateOneMonthAgo = new Date();
        dateOneMonthAgo.setDate(now.getDate() - 31);

        this.state = {
            submissions: [],
            selection: [],
            startDate: dateOneMonthAgo,
            endDate: now,
            isLoading: false
        };

        this.dataSource = this.dataSource.bind(this);
        this.exportSource = this.exportSource.bind(this);

        columns.find(h => h.Header === 'Actions').Cell = props => {
            return (
                <button style={{backgroundColor: 'green', color: '#fefefe'}}
                        onClick={() => {
                            this.exportSource(props.original.id_submission);
                        }}
                >Download</button>
            );
        };
    }

    dataSource() {
        if (this.props.socket.state !== "open" || !this.props.socket.authToken || this.state.isLoading) return;

        const timestamp = Date.now();
        const data = {
            timestamp: timestamp,
            routingKey: 'calc.test.usageSummary',
            payload: {authToken: this.props.socket.authToken, filters: {minDate: this.state.startDate, maxDate: this.state.endDate}}
        };
        this.setState({isLoading:true});
        this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);
        this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
            this.props.socket.unsubscribe('gs-message-' + timestamp);
            console.log('GameSense API responded:\n', response);
            const res = typeof response.content === 'string' ? JSON.parse(response.content) : null;
                // CreateTableFromJSON(res)
            console.log('Here is the payload:\n', res);
            this.setState({
                submissions: res,
                isLoading:false
            });
            this.props.socket.off('connect', this.dataSource);
        });
        console.log('Sent message to GameSense API:', 'gs-message-' + timestamp);
    }

    exportSource(submissionId) {
      if (this.props.socket.state !== "open") return;

        const timestamp = Date.now()
        const data = {
            timestamp: timestamp,
            routingKey: 'export.test.singlePlayer',
            payload: {"id_submission":submissionId}
        };
        this.props.socket.publish('SC_MESSAGE-' + this.props.socket.id, data);
        this.props.socket.subscribe('gs-message-' + timestamp).watch((response) => {
            this.props.socket.unsubscribe('gs-message-' + timestamp);
            console.log('GameSense API responded:\n', response);

            downloadExcelSheet(response);
        });
        console.log('Sent message to GameSense API:', 'gs-message-' + timestamp);
    }

    async handleDateChange({startDate, endDate}) {
        await this.setState({startDate, endDate, submissions: []});
        this.dataSource();
    }


    logSelection = () => {
      console.log("selection:", this.state.selection);
    };

    componentDidMount() {
        this.props.socket.on('connect', this.dataSource);
        this.props.socket.on('authStateChange', this.dataSource);
        this.dataSource();
    }

  render() {

      const buttons = [
          (<LogSelectionButton key={'Log Selection Button'} logSelection={this.logSelection.bind(this)}/>),

          (<LinkButton key={'Link Button'} inner={'Drill Usage'} href={'/drillusage'}/>),

          (<Calendar key={'Calendar'} startDate={this.state.startDate} endDate={this.state.endDate} onChange={this.handleDateChange.bind(this)}/>)
      ];

      return (<Table
          columns={columns}
          submissions={this.state.submissions}
          isLoading={this.state.isLoading}
          buttons={buttons}
          updateSelection={selection => this.setState({selection})}/>);
  }
}

export default TestSubmissions;