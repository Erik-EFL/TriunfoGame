import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      hasTrunfo: false,
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      deck: [],
    };
  }

  inputValueCheck = () => {
    const {
      cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage,
    } = this.state;

    let verify = true;
    const atributes = [cardAttr1, cardAttr2, cardAttr3];
    atributes.forEach((field) => {
      if (Number(field) > Number('90')
     || Number(field) < 0) verify = false;
    });
    const maxValidate = (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3)
    <= Number('210'));
    const fields = [cardName, cardDescription, cardImage];
    const notEmptyFields = fields.every((field) => field !== '');

    if (notEmptyFields && verify && maxValidate) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const { cardTrunfo } = this.state;
    if (cardTrunfo) this.setState({ hasTrunfo: true });

    this.setState((prev) => {
      const cards = { ...prev };
      return {
        deck: [...prev.deck, cards],
        cardName: '',
        cardDescription: '',
        cardAttr1: 0,
        cardAttr2: 0,
        cardAttr3: 0,
        cardImage: '',
        cardRare: 'normal',
        cardTrunfo: false,
        isSaveButtonDisabled: true,
      };
    });
  }

  /* usei como refente para criar parte desta function => [
    https://qastack.com.br/programming/36326612/delete-item-from-state-array
    -in-react */
  deleteCard = (event) => {
    const { deck } = this.state;
    const filteredCards = deck.filter((card) => card.cardName !== event.target.value);
    const hasTrunfo = filteredCards.some((card) => card.cardTrunfo);
    this.setState({ deck: filteredCards, hasTrunfo });
  }

  /* Tive o auxilio dos amigos Sheila Nakashima Thiago Medeiros e Thiago Zardo
   para desconstruir a function */
  onInputChange = ({ target }) => {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name]: value },
      () => this.inputValueCheck());
  };

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      deck,
    } = this.state;

    return (
      <div className="app">

        <Form
          { ...this.state }
          hasTrunfo={ hasTrunfo }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
          isSaveButtonDisabled={ isSaveButtonDisabled }
        />

        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        <section className="cards-container">
          {
            deck.map((card) => (
              <div key={ card.cardName } className="cards-container">
                <Card
                  cardName={ card.cardName }
                  cardDescription={ card.cardDescription }
                  cardAttr1={ card.cardAttr1 }
                  cardAttr2={ card.cardAttr2 }
                  cardAttr3={ card.cardAttr3 }
                  cardRare={ card.cardRare }
                  cardImage={ card.cardImage }
                  cardTrunfo={ card.cardTrunfo }
                />
                <button
                  data-testid="delete-button"
                  type="button"
                  value={ card.cardName }
                  onClick={ this.deleteCard }
                >
                  Excluir
                </button>
              </div>
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;
