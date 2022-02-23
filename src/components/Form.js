import React, { Component } from 'react';
import '../index.css';

export default class Form extends Component {
  render() {
    return (
      <div>
        <h1>Adicionar nova Carta</h1>
        <form className="forms">
          <label htmlFor="name">
            Nome
            <input type="text" name="name" id="name" data-testid="name-input" />
          </label>

          <label htmlFor="name">
            Descrição
            <textarea name="" id="" cols="60" rows="6" data-testid="description-input" />
          </label>

          <label htmlFor="attr1">
            Attr01
            <input type="number" name="attr1" id="attr1" data-testid="attr1-input" />
          </label>

          <label htmlFor="attr2">
            Attr02
            <input type="number" name="attr2" id="attr2" data-testid="attr2-input" />
          </label>

          <label htmlFor="attr3">
            Attr03
            <input type="number" name="attr3" id="attr3" data-testid="attr3-input" />
          </label>
          <p>
            Pontos Restantes =
            {' '}
            <span>000</span>
          </p>
          <label htmlFor="imagem">
            Imagem
            <input type="text" name="imagem" id="imagem" data-testid="image-input" />
          </label>

          <label htmlFor="rarity ">
            Raridade
            <select name="rarity " id="rarity " data-testid="rare-input">
              <option>normal</option>
              <option>raro</option>
              <option>muito raro</option>
            </select>
          </label>

          <label htmlFor="super">
            <input type="checkbox" name="super" id="super" data-testid="trunfo-input" />
            Super Trybe trunfo
          </label>

          <button type="submit" data-testid="save-button">Salvar</button>
        </form>
      </div>
    );
  }
}
