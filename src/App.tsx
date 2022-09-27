import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { TiThLargeOutline } from "react-icons/ti";
import { BiMenu } from "react-icons/bi";
import "./App.css";

interface countProps {
  type?: string;
  product: string;
  valor: number;
}

interface selectProps {
  select: string;
  buy: string;
  sell: string;
}

function App() {
  const [count, setCount] = useState<countProps>({
    type: "",
    product: "",
    valor: 0,
  });

  const [typeSelect, setTypeSelect] = useState("-");

  // const [extract, setExtract] = useState<countProps>({
  //   product: "",
  //   valor: 0,
  // });

  let extract: countProps = {
    product: count.product,
    valor: count.valor,
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const product = count.product;
    const valor = count.valor;
    localStorage.setItem("product", product);
    localStorage.setItem("valor", valor.toString());
  };

  const handleValors = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount((valors: countProps) => ({
      ...valors,
      [event.target.name]: event.target.value,
    }));
    // if (typeSelect === "buy") {
    //   const product = localStorage.getItem("product");
    //   const valor = Number(localStorage.getItem("valor"));
    //   count;
    // }
    // console.log(event);
  };

  const handleExtract = () => {
    if (typeSelect === "buy") {
      const product = localStorage.getItem("product");
      const valor = Number(localStorage.getItem("valor"));

      extract = {
        product: product + count.product,
        valor: valor + count.valor,
      };
    }
  };

  useEffect(() => {
    handleExtract();
  }, []);

  return (
    <section className="main-sec">
      <section className="secund-sec">
        <header className="header">
          <TiThLargeOutline className="icons" />
          <h1>Controle Financeiro</h1>
          <BiMenu className="icons" />
        </header>

        <section className="input-data">
          <form className="form-data" onSubmit={handleSubmit}>
            <div className="fields">
              <label className="label" htmlFor="typeShoppings">
                Tipo de Transação
              </label>
              <select
                name="typeShoppings"
                id="typeShoppings"
                required
                defaultValue={typeSelect}
                onChange={(e) => setTypeSelect(e.target.value)}
                className="input-select"
              >
                <option selected>Selecione</option>
                <option value="buy">Compra</option>
                <option value="sell">Venda</option>
              </select>
            </div>

            <div className="fields">
              <label className="label" htmlFor="product">
                Nome da Mercadoria
              </label>
              <input
                className="input"
                type="text"
                name="product"
                onChange={handleValors}
                placeholder="Mercadoria"
                autoComplete="off"
              />
            </div>

            <div className="fields">
              <label className="label" htmlFor="valor">
                Valor
              </label>
              <input
                className="input"
                type="text"
                name="valor"
                onChange={handleValors}
                placeholder="R$: 0,00"
                autoComplete="off"
              />
            </div>

            <button className="button" type="submit">
              Adicionar Transação
            </button>
          </form>
        </section>

        <div className="separator"></div>

        <section className="results-data">
          <h2>Extrato de transações</h2>

          <div className="extract">
            <div className="products-list">
              <p className="title-extract">Mercadoria</p>
              <div className="separator-title"></div>
              <span className="data-extract">{typeSelect === "sell" ? "+ " : "- "} {count.product}</span>
              <span className="data-extract">{typeSelect === "sell" ? "+ " : "- "} {count.product}</span>
            </div>

            <div className="valors-list">
              <p className="title-extract">Valor: </p>
              <div className="separator-title"></div>
              <span className="data-extract">R$: {count.valor}</span>
              <span className="data-extract">R$: {count.valor}</span>
            </div>
          </div>

          <div className="extract-result">
            <p className="title-extract">Total</p>
            <p className="data-extract">R$: {extract.valor}</p>
            <p className="title-extract">[Lucro]</p>
          </div>
        </section>
      </section>
    </section>
  );
}

export default App;
