var classNames = require('classnames');
var React = require('react');

class TestCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cards: this.props.Cards,
            deckid: this.props.DeckId,
            position: this.props.Position,
            difficulty: this.props.Difficulty,
            correct: true,
            deckComplete: false
        };
    }

    testCard(cardCode) {
        this.setTestCardActionState(cardCode);
        setTimeout(
            () => this.makeTestCardRequest(cardCode),
            1000)
    }

    setTestCardActionState(cardCode) {
        this.setState({
            checkingCard: cardCode
        });
    }

    makeTestCardRequest(cardCode) {
        var xhr = new XMLHttpRequest();
        xhr.open(
            'GET',
            '/Simonides/Cards/TestCard/'
                + this.state.deckid + '/'
                + this.state.position + '/'
                + cardCode
                + '?difficulty=' + this.state.difficulty,
            true);

        xhr.onload = function () {
            var response = JSON.parse(xhr.responseText);
            var state = {};

            if (!response.result.success) {
                state.correct = false;
            }
            else {
                var test = response.result.test;
                state.cards = test.Cards;
                state.deckid = test.DeckId;
                state.position = test.Position;
                state.correct = true;
                state.deckComplete = response.result.deckComplete;
            }

            state.checkingCard = null;

            this.setState(state);

        }.bind(this);

        xhr.send();
    }

    render() {
        var displayCards = this.state.cards.map(function (card, index) {
            var liClasses = classNames({
                'card': true,
                'checking': card.Code == this.state.checkingCard,
                'disabled': this.state.checkingCard != null && card.Code != this.state.checkingCard
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
            <div>
            <h3>
                Correct Cards: {this.state.position}
            </h3>
            <span>
                {this.state.deckComplete ? 'Deck Complete!' : ''}
            </span>
            <ul>
                {displayCards}
            </ul>
            <span>
                {this.state.checkingCard != null
                    ? 'Checking\u2026'
                    : !this.state.position
                        ? ''
                        : this.state.correct
                            ? 'Correct!'
                            : 'Incorrect'}
            </span>
            </div>
            );
    }
}

module.exports = TestCard;