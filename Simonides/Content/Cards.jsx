var TestCard = React.createClass({

    getInitialState() {
        return {
            cards: this.props.Cards,
            deckid: this.props.DeckId,
            position: this.props.Position,
            correct: true,
            deckComplete: false
        };
    },
    testCard(cardCode) {
        var xhr = new XMLHttpRequest();
        xhr.open(
            'GET',
            '/Simonides/Cards/TestCard/'
                + this.state.deckid + '/'
                + this.state.position + '/'
                + cardCode, true);
        xhr.onload = function () {
            var response = JSON.parse(xhr.responseText);

            if (!response.result.success) {
                this.setState({
                    correct: false
                });
                return;
            }
            if (response.result.deckComplete) {
                this.setState({
                    deckComplete: true
                });
                return;
            }

            var test = response.result.test;
            this.setState({
                cards: test.Cards,
                deckid: test.DeckId,
                position: test.Position,
                correct: true,
                deckComplete: false
            });
        }.bind(this);
        xhr.send();
    },

    render() {
        var testCard = this.testCard;

        var displayCards = this.state.cards.map(function (card, index) {
            return (
                <li
                    key={index}
                    className="card"
                    onClick={() => testCard(card.Code)} >
                    <img src={card.Image} alt={card.Code} width="75" height="105" />
                </li>
            )
        });

        return (
            <div>
            <h3>
                Correct Cards: {this.state.position}
            </h3>
            <span>
                {this.state.deckComplete ? 'Deck Complete!' : ''}
            </span>
            <span>
                {!this.state.position
                    ? ''
                    : this.state.correct
                        ? 'Correct!'
                        : 'Incorrect'}
            </span>
            <ul>
                {displayCards}
            </ul>
            </div>
            );
    }
});