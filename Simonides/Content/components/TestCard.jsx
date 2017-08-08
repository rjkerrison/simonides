var classNames = require('classnames');
var React = require('react');

class TestCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inheritedState: this.props.inheritedState
        };

        this.testCard = this.props.testCard;
    }

    render() {
        var displayCards = this.state.inheritedState.cards.map(function (card, index) {
            var liClasses = classNames({
                'card': true,
                'checking': card.Code == this.state.inheritedState.checkingCard,
                'disabled': this.state.inheritedState.checkingCard != null && card.Code != this.state.inheritedState.checkingCard
            });
            return (
                <li
                    key={index}
                    className={liClasses}
                    onClick={() => this.testCard(card.Code)} >
                    <img src={card.Image} alt={card.Code} width="75" height="105" />
                </li>
            )
        }.bind(this));

        return (
            <ul>
                {displayCards}
            </ul>
            );
    }
}

module.exports = TestCard;