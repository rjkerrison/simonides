var TestCard = React.createClass({

    getInitialState() {
        return {
            imagesrc: this.props.card.Image,
            cardcode: this.props.card.Code,
            deckid: this.props.deckid,
            position: this.props.position
        };
    },
    nextCard(evt) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/Simonides/Cards/NextTestCard/' + this.state.deckid + '/' + (this.state.position + 1), true);
        xhr.onload = function () {
            var response = JSON.parse(xhr.responseText);

            this.setState({
                imagesrc: response.result.imagesrc,
                cardcode: response.result.cardcode
            });
            this.state.position += 1;
        }.bind(this);
        xhr.send();
    },

    render() {
        return (
            <div className="card">
                <img src={this.state.imagesrc} alt={this.state.cardcode} width="75" height="105" />
                <div onClick={this.nextCard}>
                    NEXT
                </div>
            </div>
            );
    }
});