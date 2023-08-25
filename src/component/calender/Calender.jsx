import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEllipsisV, FaRegTrashAlt, FaFeatherAlt, FaPencilAlt, FaSave, FaAlignLeft } from "react-icons/fa";
import '../../../src/App.css'

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
  const [selectedListForAlignment, setSelectedListForAlignment] = useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [itemDescription, setItemDescription] = useState('');
  const [showEditorToolbar, setShowEditorToolbar] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);


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

  // Item delete
  const handleDeleteItem = (cardIndex, itemIndex) => {
    setDeletingCardIndex(cardIndex);
    setDeletingItemIndex(itemIndex);
    setShowDeleteItemModal(true);
  };

  const confirmDeleteItem = () => {
    const updatedCards = [...cards];
    updatedCards[deletingCardIndex].items.splice(deletingItemIndex, 1);
    setCards(updatedCards);
    setShowItemModal(false); // Close the item details modal
    setShowDeleteItemModal(false); // Close the delete item confirmation modal
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

  // list popup model 
  const handleItemClicked = (cardIndex, itemIndex) => {
    setSelectedCardIndex(cardIndex);
    setSelectedItemIndex(itemIndex);
    setItemDescription(cards[cardIndex].items[itemIndex].description || ''); // Set initial description
    setShowItemModal(true);

  };
  const handleSaveDescription = () => {
    const updatedCards = [...cards];
    updatedCards[selectedCardIndex].items[selectedItemIndex].description = itemDescription;
    setCards(updatedCards);
    setShowItemModal(false);
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
                <div className="card mx-2" style={{ backgroundColor: "transparent", border: "none" }}>
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
                              <li
                                key={itemIndex}
                                className="mb-5 clickable-item"
                                style={{ listStyle: "none", border: "dotted", width: "20rem", height: "4rem" }}
                                onClick={() => handleItemClicked(index, itemIndex)}
                              >
                                {item}

                                <div className="mt-2 mb-3">
                                  <button type="button" className="btn btn-sm"> <FaAlignLeft /></button>

                                </div>
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
                  <button type=" button" className="btn btn-sm btn-danger close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
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
                  <button type="button" className="btn btn-primary" onClick={handleSaveCard}><FaSave /></button>
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
                <button type="button" className="btn btn-sm btn-danger close" data-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteModal(false)}>
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
                <button type="button" className="btn btn-sm btn-danger close" data-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteItemModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this item from the list?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowDeleteItemModal(false);
                    setDeletingCardIndex(null);
                    setDeletingItemIndex(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDeleteItem}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showItemModal && (
        <div className="modal col-lg-12" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-xl" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Item Details</h5>
                <button type="button" className=" btn btn-sm btn-danger close" data-dismiss="modal" aria-label="Close" onClick={() => setShowItemModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 mb-5">
                      {selectedCardIndex !== null && selectedItemIndex !== null && (
                        <>
                          <p>Name: {cards[selectedCardIndex].items[selectedItemIndex]}</p>

                          <p>Description: {itemDescription}</p>
                          {/* Item description input, needs better implementation */}
                          <textarea
                            className="form-control"
                            placeholder="Enter item description"
                            value={itemDescription}
                            onChange={(e) => setItemDescription(e.target.value)}
                          />
                        </>
                      )}

                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-2 col-lg-11">
                      <button className="btn btn-primary mt-2" onClick={handleSaveDescription}>Save</button>
                    </div>

                    <div className="col-sm-6 col-lg-1">
                      <button
                        className="btn btn-danger mt-2"
                        onClick={() => handleDeleteItem(selectedCardIndex, selectedItemIndex)}
                      >
                        <FaRegTrashAlt />
                      </button>
                      {/* Once item has been deleted automatically close the item  model */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {showDeleteItemModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn btn-sm btn-danger close" data-dismiss="modal" aria-label="Close" onClick={() => setShowDeleteItemModal(false)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this item from the list?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowDeleteItemModal(false);
                    setDeletingCardIndex(null);
                    setDeletingItemIndex(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDeleteItem}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div >


  );
};
