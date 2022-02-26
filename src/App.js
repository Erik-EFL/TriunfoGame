import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

const MAX_ATB = 90;
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      deck: [],
    };
  }

  inputValueCheck = () => {
    const {
      cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3, cardImage, cardRare,
    } = this.state;
    const fields = [cardName, cardDescription, cardImage];
    let verify = true;
    const maxValidate = (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3)
    < Number('210'));

    const notEmptyFields = fields.every((field) => field !== '');

    if (Number(cardAttr1) > Number(MAX_ATB) || Number(cardAttr1) <= 0) verify = false;
    if (Number(cardAttr2) > Number(MAX_ATB) || Number(cardAttr2) <= 0) verify = false;
    if (Number(cardAttr3) > Number(MAX_ATB) || Number(cardAttr3) <= 0) verify = false;

    if (notEmptyFields && verify && cardRare && maxValidate) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

   onSaveButtonClick = (event) => {
     event.preventDefault();
     const { cardTrunfo } = this.state;
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
         cardRare: '',
         cardTrunfo: false,
         isSaveButtonDisabled: true,
       };
     });
     if (cardTrunfo) this.setState(() => ({ hasTrunfo: true }));
   }

   /* Tive o auxilio dos amigos Sheila Nakashima Thiago Medeiros e Thiago Zardo
   para desconstruir a function */
   onInputChange = ({ target }) => {
     this.setState({ [target.name]: target.value },
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
     } = this.state;

     return (
       <div>
         <h1>Tryunfo</h1>

         <Form
           cardName={ cardName }
           cardDescription={ cardDescription }
           cardAttr1={ cardAttr1 }
           cardAttr2={ cardAttr2 }
           cardAttr3={ cardAttr3 }
           cardImage={ cardImage }
           cardRare={ cardRare }
           cardTrunfo={ cardTrunfo }
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
       </div>
     );
   }
}

export default App;
