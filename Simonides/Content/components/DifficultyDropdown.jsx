var React = require('react');

class DifficultyDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDifficulty: this.props.currentDifficulty,
            difficulties: this.props.difficulties
        };
    }

    render() {
        var dropdownOptions = this.state.difficulties.map(function (difficulty, index) {
            return (
                <li
                    key={index}
                    onClick={() => this.setDropdown(difficulty)} >
                    {difficulty}
                </li>
            )
        }.bind(this));


        return (
            <ul>
                {dropdownOptions}
            </ul>
        );
    }
}

module.exports = DifficultyDropdown;