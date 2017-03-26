var React = require('react');
var DifficultyDropdown = require('./DifficultyDropdown');

class DifficultyPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            difficulty: this.props.Difficulty,
        };
    }

    render() {
        return (
            <div>
                <h3>
                    Difficulty:
                    <span
                        onClick={this.openDropdown}>
                        {this.state.difficulty}
                    </span>
                </h3>
                <DifficultyDropdown
                    currentDifficulty={this.state.difficulty}
                    difficulties={this.props.AvailableDifficulties}
                />
            </div>
        );
    }
}

module.exports = DifficultyPicker;