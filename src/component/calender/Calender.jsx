import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEllipsisV, FaRegTrashAlt } from "react-icons/fa";
import "../../App.css"

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [editingCardIndex, setEditingCardIndex] = useState(null);
  const [deletingCardIndex, setDeletingCardIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItemIndex, setDeletingItemIndex] = useState(null);
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const day = currentDate.getDate();
  const monthYear = currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const handleAddNewCard = () => {
    setShowModal(true);
  };

  const handleSaveCard = () => {
    if (editingCardIndex !== null) {
      const updatedCards = [...cards];
      updatedCards[editingCardIndex].title = newCardTitle;
      setCards(updatedCards);
      setEditingCardIndex(null);
    } else {
      setCards([...cards, { title: newCardTitle, items: [] }]);
    }
    setNewCardTitle('');
    setShowModal(false);
  };

  const handleEditCard = (index) => {
    setEditingCardIndex(index);
    setNewCardTitle(cards[index].title);
    setShowModal(true);
  };

  const handleDeleteCard = (index) => {
    setDeletingCardIndex(index);
    setShowDeleteModal(true);
  };

  const handleDeleteItem = (index) => {
    setDeletingItemIndex(index);
    setShowDeleteItemModal(true);
  };
  const confirmDeleteItem = (cardIndex, itemIndex) => {
    const updatedCards = [...cards];
    updatedCards[cardIndex].items.splice(itemIndex, 1);
    setCards(updatedCards);
    setShowDeleteItemModal(false);
    setDeletingCardIndex(null);
    setDeletingItemIndex(null);
  };


  const confirmDelete = () => {
    const updatedCards = [...cards];
    updatedCards.splice(deletingCardIndex, 1);
    setCards(updatedCards);
    setShowDeleteModal(false);
    setDeletingCardIndex(null);
  };

  const handleAddItem = (index, newItem) => {
    const updatedCards = [...cards];
    updatedCards[index].items.push(newItem);
    updatedCards[index].newItem = '';
    setCards(updatedCards);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <h1>{day}</h1>
            <p>{monthYear}</p>
          </div>
        </div>
        <button className="btn btn-primary mb-3" onClick={handleAddNewCard}>Add New</button>
        <div className="row">
          <div className="col-lg-12" style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
            {cards.map((card, index) => (
              <div className="col-lg-4 d-inline-block" key={index}>
                <div className="card mx-2">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-9 col-sm-8 mt-2 mb-3">
                        <h5>{card.title}</h5>
                      </div>
                      <div className="col-lg-3 col-sm-4">
                        <button className="btn mx-2 col-lg-2 col-sm-2" onClick={() => handleEditCard(index)}><FaEllipsisV /></button>
                        <button className="btn col-lg-2 col-sm-2 mx-2" onClick={() => handleDeleteCard(index)}><FaRegTrashAlt /></button>
                      </div>
                    </div>
                    <ul>
                      <div className="container">
                        <div className="row">
                          <div className="col-sm-6">
                            {card.items.map((item, itemIndex) => (
                              <li key={itemIndex} style={{ listStyle: "none", }}>{item}
                              <button className="btn col-sm-4" style={{ marginLeft: "10rem" }} onClick={() => handleDeleteItem(index)}><FaRegTrashAlt /></button>
                              </li>
                            ))}
                          </div>
                        </div>
                      </div>

                    </ul>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Add an item"
                        required
                        value={card.newItem || ""}
                        onChange={(e) => {
                          const updatedCards = [...cards];
                          updatedCards[index].newItem = e.target.value;
                          setCards(updatedCards);
                        }}
                      />
                      <button className="btn btn-primary" onClick={() => handleAddItem(index, card.newItem)}>Add</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Modal for New Card Title */}
      {
        showModal && (
          <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Enter Card Title</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={handleSaveCard}>Save</button>
                </div>
              </div>
            </div>
          </div>
        )
      }

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this card?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteItemModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteItemModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this item from the list?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteItemModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={() => confirmDeleteItem(deletingItemIndex)}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div >


  );
};
