var classNames = require('classnames');
var React = require('react');

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: this.props.selectedOption,
            options: this.props.options,
            dropdownOpen: false
        };
    }

    toggleOpen() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        console.log(this.state, this.props);
        var dropdownOptions = this.state.options.map(function (option, index) {
            var liClasses = classNames({
                'selected': option == this.props.selectedOption,
                'visible': this.state.dropdownOpen,
            });

            return (
                <li
                    key={index}
                    className={liClasses}
                    onClick={() => this.state.dropdownOpen ? this.props.setDropdown(option) : null} >
                    <span>{option}</span>
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

module.exports = Dropdown;