import Container from "../Container";
import actions from "../actions";

export default class PlayerUseOverTimeContainer extends Container {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        if (this.props.dispatch) this.props.dispatch.on(actions.PICKLIST_UPDATE, this.handleChange)
    }

    getRoutingKey() {
        return 'calc.drill.completionSummary';
    }

    async handleChange(timeSeries) {
        await this.setState({
            params: {
                rollUpType: timeSeries
            }
        });
        this.dataSource();
    }

    mapStateToProps(state) {
        let defaultProps = {name: "date", values: [{value: "count", color: "turquoise"}], yLabel: "# Drills"};

        let dates = state.submissions.reduce((accum, next) => {
            if (!accum.find(x => x === next[defaultProps.name])) {
                accum.push(next[defaultProps.name]);
            }
            return accum;
        }, []).sort();

        return {
            ...state,
            ...defaultProps,
            xValues: dates,
            yMax: state.submissions.reduce((accum, next) => {
                return (next[defaultProps.values[0].value] > accum) ? next[defaultProps.values[0].value] : accum;
            }, 0)
        };
    }
}

