var TestCard = React.createClass({

    getInitialState() {
        return {
            cards: this.props.Cards,
            deckid: this.props.DeckId,
            position: this.props.Position
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

            var test = response.result.test;
            this.setState({
                cards: test.Cards,
                deckid: test.DeckId,
                position: test.Position
            });
        }.bind(this);
        xhr.send();
    },

    render() {
        var testCard = this.testCard;

        var displayCards = this.state.cards.map(function (card, index) {
            return (
                <li key={index} onClick={() => testCard(card.Code)}>
                    <img src={card.Image} alt={card.Code} width="75" height="105" />
                </li>
            )
        });

        return (
            <div className="card">
                {displayCards}
            </div>
            );
    }
});