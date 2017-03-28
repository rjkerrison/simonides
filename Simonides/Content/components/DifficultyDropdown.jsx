var classNames = require('classnames');
var React = require('react');

class DifficultyDropdown extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            currentDifficulty: props.currentDifficulty,
            difficulties: this.props.difficulties,
            dropdownOpen: false
        };
    }

    toggleOpen() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        var dropdownOptions = this.state.difficulties.map(function (difficulty, index) {
            var liClasses = classNames({
                'selected': difficulty == this.props.currentDifficulty,
                'visible': this.state.dropdownOpen,
            });

            return (
                <li
                    key={index}
                    className={liClasses}
                    onClick={() => this.state.dropdownOpen ? this.props.setDropdown(difficulty) : null} >
                    <span>{difficulty}</span>
                </li>
            )
        }.bind(this));

        var ulClasses = classNames({
            'dropdown': true,
            'open': this.state.dropdownOpen,
            'closed': !this.state.dropdownOpen
        });

        return (
            <ul
                className={ulClasses}
                onClick={this.toggleOpen.bind(this)}>
                {dropdownOptions}
            </ul>
        );
    }
}

module.exports = DifficultyDropdown;