import ImageBag from "./img/Bag.png";
import DeleteIcon from "./img/delete.svg";
import "./App.css";
import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    backgroundColor: "#fafafa",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    borderRadius: "10px",
    transform: "translate(-50%, -50%)",
  },
};

function App() {
  const [item, setItem] = useState("");
  const [shopList, setShopList] = useState([]);
  const [boughtList, setBoughtList] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [currentItemType, setCurrentItemType] = useState("");
  const generateNewDate = () =>
    `${new Date().toLocaleDateString("pt-BR", {
      weekday: "long",
    })} (${new Date().toLocaleDateString()}) às ${new Date().toLocaleTimeString(
      "pt-BR",
      { hour: "numeric", minute: "numeric" }
    )}`;

  function addItem(event) {
    event.preventDefault();

    if (item.trim() === "") {
      setErrorMessage("Digite um item válido!");
      return;
    }

    const itemObj = {
      name: item,
      date: generateNewDate(),
    };

    setShopList([itemObj, ...shopList]);
    setItem("");
    setErrorMessage("");
  }

  function removeItem() {
    const newShopList =
      currentItemType === "shop" ? [...shopList] : [...boughtList];
    const indexOf = newShopList.indexOf(currentItem);
    newShopList.splice(indexOf, 1);
    if (currentItemType === "shop") {
    setShopList(newShopList);
    } else{
      setBoughtList(newShopList)
    }
    closeModal();
  }

  function handleChecked(index) {
    const newItem = shopList[index];
    newItem.date = generateNewDate();
    setBoughtList([newItem, ...boughtList]);
    const newShopList = [...shopList];
    newShopList.splice(index, 1);
    setShopList([...newShopList]);
  }

  function handleUnChecked(index) {
    setShopList([boughtList[index], ...shopList]);
    const newBoughtList = [...boughtList];
    newBoughtList.splice(index, 1);
    setBoughtList([...newBoughtList]);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(shopItem, itemType) {
    setCurrentItem(shopItem);
    setCurrentItemType(itemType);
    setIsOpen(true);
  }

  return (
    <div id="App">
      <main>
        <div id="bag-container">
          <img id="bag" src={ImageBag} alt="sacola de compras" />
          <div id="checkmark">✔</div>
        </div>

        <form>
          <input
            value={item}
            onChange={(input) => setItem(input.target.value)}
            className="input-item"
            id="input-item"
            type="text"
            autoComplete="off"
            placeholder="Digite o item que deseja adicionar"
          />
          <button onClick={addItem} className="button-item" id="addItem">
            Salvar item
          </button>
          {errorMessage && (
            <div className="error-message">
              <div className="alert-icon"></div>
              <span>{errorMessage}</span>
            </div>
          )}
        </form>

        <div className="container-list">
          <h2>Lista de compras</h2>
          <hr />
          <ul id="shop-list">
            {shopList.map((shopItem, index) => (
              <li key={index}>
                <div className="container-item-list">
                  <div>
                    <div className="container-checkbox">
                      <label htmlFor={`checkbox-shop-${index}`}>
                        <input
                          type="checkbox"
                          onChange={() => handleChecked(index)}
                          className="input-checkbox"
                          id={`checkbox-shop-${index}`}
                        />
                        <div className="custom-checkbox"></div>
                      </label>
                    </div>
                    <p>{shopItem.name}</p>
                  </div>

                  <div>
                    <button
                      className="item-list-button"
                      onClick={() => openModal(shopItem, "shop")}
                    >
                      <img src={DeleteIcon} alt="remover" />
                    </button>

                  </div>
                </div>
                <p className="data-text">{shopItem.date}</p>
              </li>
            ))}
          </ul>
          <h2>Comprados</h2>
          <hr />
          <ul id="purchased-list">
            {boughtList.map((boughtItem, index) => (
              <li key={index}>
                <div className="container-item-list">
                  <div>
                    <div className="container-checkbox">
                      <label htmlFor={`checkbox-purchased-${index}`}>
                        <input
                          type="checkbox"
                          onChange={() => handleUnChecked(index)}
                          className="input-checkbox"
                          id={`checkbox-purchased-${index}`}
                        />
                        <div className="custom-checkbox checked"></div>
                      </label>
                    </div>
                    <p className="bought">{boughtItem.name}</p>
                  </div>
                  <div>
                    <button
                      className="item-list-button"
                      onClick={() => openModal(boughtItem, "purchased")}
                    >
                      <img src={DeleteIcon} alt="remover" />
                    </button>
                  </div>
                </div>
                <p className="data-text">{boughtItem.date}</p>
              </li>
            ))}
          </ul>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <h2 className="modal-title">Atenção!</h2>
            <p className="modal-text">{`Tem certeza que deseja excluir o item?`}</p>
            <div className="modal-button-container">
            <button onClick={removeItem} className="button-modal">Sim</button>
            <button onClick={closeModal} className="button-modal outline">Não</button>
            </div>
          </Modal>
        </div>
      </main>
    </div>
  );
}

export default App;
