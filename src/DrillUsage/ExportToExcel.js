import React, {Component} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';



class ExportToExcel extends Component {


    render() {

        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1;
        let yyyy = today.getFullYear();

        if (dd < 10) {
        dd = '0' + dd;
        }

        if (mm < 10) {
        mm = '0' + mm;
        }

        today = mm + '/' + dd + '/' + yyyy;

        return (
            <div>

                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="fa fa-table"
                    table="table-to-xls"
                    filename={"gameSense Drill Usage " + today}
                    sheet="tablexls"
                    buttonText=" Export to XLS"/>
                <table border= {1} hidden="true" id="table-to-xls">

                    <thread>
                        <tr>
                            <th>Team</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Drill</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                    </thread>
                    <tbody>
                    {
                      this.props.posts.map(post => {
                          return(
                              <tr key={post.id_submissions}>
                                <td>{post.team_name}</td>
                                <td>{post.player_first_name}</td>
                                <td>{post.player_last_name}</td>
                                <td>{post.drill}</td>
                                <td>{post.first_glance_total_score}</td>
                                <td>{post.completion_timestamp_formatted_short}</td>
                              </tr>
                          )
                      })
                    }
                </tbody>
                </table>
            </div>
        );
    }
}

export default ExportToExcel