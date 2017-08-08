var classNames = require('classnames');
var React = require('react');
var TestCard = require('./TestCard');
var DropdownPicker = require('./DropdownPicker');

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checkingCard: null,
            deckid: this.props.DeckId,
            position: this.props.Position,
            difficulty: this.props.Difficulty,
            inheritableState: {
                checkingCard: null,
                cards: this.props.Cards
            },
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

    setDifficulty(difficulty) {
        this.setState({
            difficulty: difficulty
        },
        this.makeChangeDifficultyRequest)
    }

    setTestCardActionState(cardCode) {
        this.state.inheritableState.checkingCard = cardCode;
        this.forceUpdate()
    }

    makeXhr(controller, action, parameters, queryParameters, callback) {
        var xhr = new XMLHttpRequest();
        parameters = ['/Simonides', controller, action].concat(parameters);

        var queryStrings = [];

        for (var key in queryParameters) {
            queryStrings.push(key + '=' + queryParameters[key])
        }

        xhr.open(
            'GET',
            parameters.join('/')
                + '?'
                + queryStrings.join('&'),
            true)

        xhr.onload = callback;
        xhr.send();

        return xhr;
    }

    makeChangeDifficultyRequest() {
        var xhr = this.makeXhr(
            'Cards',
            'ChangeDifficulty',
            [
                this.state.deckid,
                this.state.position
            ],
            {
                difficulty: this.state.difficulty
            },
            function () {
                var response = JSON.parse(xhr.responseText);
                var test = response.result.test;

                this.state.inheritableState.cards = test.Cards;
                this.forceUpdate();
            }.bind(this));
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
                state.deckid = test.DeckId;
                state.position = test.Position;
                state.correct = true;
                state.deckComplete = response.result.deckComplete;
                this.state.inheritableState.cards = test.Cards;
            }

            this.state.inheritableState.checkingCard = null;
            this.setState(state);

        }.bind(this);

        xhr.send();
    }

    render() {
        return (
        <div>
            <div>
                <DropdownPicker
                    selectedOption={this.state.difficulty}
                    setOption={this.setDifficulty.bind(this)}
                    options={this.props.AvailableDifficulties}
                    label="Difficulty:"
                    />
                <h3>
                    Correct Cards: {this.state.position}
                </h3>
                <span>
                    {this.state.deckComplete ? 'Deck Complete!' : ''}
                </span>
                <TestCard
                    inheritedState={this.state.inheritableState}
                    testCard={this.testCard.bind(this)}
                    />
                <span>
                    {this.state.inheritableState.checkingCard != null
                    ? 'Checking\u2026'
                    : !this.state.position
                    ? ''
                    : this.state.correct
                    ? 'Correct!'
                    : 'Incorrect'}
                </span>
            </div>
        </div>);
    }
}

module.exports = Test;