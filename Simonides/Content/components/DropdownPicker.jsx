var React = require('react');
var Dropdown = require('./Dropdown');

class DropdownPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: this.props.SelectedOption,
        };  
    }

    setDropdown(option) {
        this.setState({
            selectedOption: option
        })
    }

    render() {
        return (
            <div>
                <div>
                    <span className="listLabel">
                        {this.props.Label}
                    </span>
                    <Dropdown
                        selectedOption={this.state.selectedOption}
                        options={this.props.Options}
                        setDropdown={this.setDropdown.bind(this)} />
                </div>
                
            </div>
        );
    }
}

module.exports = DropdownPicker;