var React = require('react');
var DifficultyDropdown = require('./DifficultyDropdown');

class DifficultyPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            difficulty: this.props.Difficulty,
        };
    }

    setDropdown(difficulty) {
        console.log(difficulty);
        this.setState({
            difficulty: difficulty
        })
    }

    render() {
        return (
            <div>
                <div>
                    <span className="listLabel">
                        Difficulty:
                    </span>
                    <DifficultyDropdown
                        currentDifficulty={this.state.difficulty}
                        difficulties={this.props.AvailableDifficulties}
                        setDropdown={this.setDropdown.bind(this)} />
                </div>
                
            </div>
        );
    }
}

module.exports = DifficultyPicker;