var React = require('react');
var Dropdown = require('./Dropdown');

class DropdownPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: this.props.selectedOption
        };  
    }

    setDropdown(option) {
        this.setState({
            selectedOption: option
        })
        if (this.props.setOption && typeof(this.props.setOption) === 'function' ) {
            this.props.setOption(option)
        }
    }

    render() {
        return (
            <div>
                <div>
                    <span className="listLabel">
                        {this.props.label}
                    </span>
                    <Dropdown
                        selectedOption={this.state.selectedOption}
                        options={this.props.options}
                        setDropdown={this.setDropdown.bind(this)}
                        />
                </div>
            </div>
        );
    }
}

module.exports = DropdownPicker;