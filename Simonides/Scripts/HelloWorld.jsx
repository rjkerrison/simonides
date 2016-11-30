var TestCard = React.createClass({

    getInitialState: function () {
        return { data: '' };
    },

    componentWillMount: function () {
        try {
            var card = this.props.card;
            this.data.imagesrc = card.image;
            this.data.cardcode = card.cardcode;
        }
        catch (e) {
            this.data = {
                imagesrc: 'http://placehold.it/200x100',
                cardcode: 'BS',
                props: this.props,
                exception: e
            };
        }
    },

    nextCard: function (e) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/Cards/NextTestCard/' + this.props.deck.deckid + '/' + (this.props.position + 1), true);
        xhr.onload = function () {
            var response = JSON.parse(xhr.responseText);

            this.setState({ data: response.result });
        }.bind(this);
        xhr.send();
    },

    render: function () {
        return (
            <div class="card">
                <img src="{this.data.imagesrc}" alt="{this.data.cardcode}" width="75" height="105" />
                <div onClick="{this.nextCard}">
                    NEXT
                </div>
            </div>
            )
    }
});