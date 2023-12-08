import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

import { FaPenAlt, FaRegTrashAlt, FaSave, FaAlignLeft } from "react-icons/fa";
import "../../../src/App.css";
import SideCalender from "./SideCalender";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [editingCardIndex, setEditingCardIndex] = useState(null);
  const [deletingCardIndex, setDeletingCardIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingItemIndex, setDeletingItemIndex] = useState(null);
  const [showDeleteItemModal, setShowDeleteItemModal] = useState(false);
  const [selectedListForAlignment, setSelectedListForAlignment] =
    useState(null);
  const [showItemModal, setShowItemModal] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [itemDescription, setItemDescription] = useState("");
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
  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

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
    setNewCardTitle("");
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
    updatedCards[index].newItem = "";
    setCards(updatedCards);
  };

  // list popup model
  const handleItemClicked = (cardIndex, itemIndex) => {
    setSelectedCardIndex(cardIndex);
    setSelectedItemIndex(itemIndex);
    setItemDescription(cards[cardIndex].items[itemIndex].description || ""); // Set initial description
    setShowItemModal(true);
  };
  const handleSaveDescription = () => {
    const updatedCards = [...cards];
    updatedCards[selectedCardIndex].items[selectedItemIndex].description =
      itemDescription;
    setCards(updatedCards);
    setShowItemModal(false);
  };

  return (
    <div className="section ">
      <div className="row">
        <div className="col-lg-3">
         <SideCalender />
        </div>
        <div className="col-lg-9">
          <div className="row mb-5">
            <div className="col-md-3 col-lg-2 offset-md-5 offset-lg-5 text-center mt-5">
              <p className="month">{monthYear}</p>
              <h1 className="date">{day}</h1>
            </div>
          </div>

          <button className="add-item" onClick={handleAddNewCard}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125"
                stroke="#fffffff"
                stroke-width="2"
              ></path>
              <path
                d="M17 15V18M17 21V18M17 18H14M17 18H20"
                stroke="#fffffff"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            ADD ITEM
          </button>

          <div className="row">
            <div
              className="col-lg-12"
              style={{ overflowX: "auto", whiteSpace: "nowrap" }}
            >
              {cards.map((card, index) => (
                <div className="col-lg-4 d-inline-block mt-5" key={index}>
                  <div
                    className="card add-item mx-2"
                    style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-9 col-sm-8 mt-2 mb-3">
                          <h5 className="card-title">{card.title}</h5>
                        </div>
                        <div className="col-lg-3 col-sm-4">
                          <button
                            className="btn edit col-lg-2 col-sm-2"
                            onClick={() => handleEditCard(index)}
                          >
                            <FaPenAlt />
                          </button>
                          <button
                            className="btn delete col-lg-2 col-sm-2"
                            onClick={() => handleDeleteCard(index)}
                          >
                            <FaRegTrashAlt />
                          </button>
                        </div>
                      </div>
                      <ul>
                        <div className="container">
                          <div className="row">
                            <div className="col-sm-6">
                              {card.items.map((item, itemIndex) => (
                                <li
                                  key={itemIndex}
                                  className="mb-5 clickable-item animate__animated animate__fadeIn"
                                  style={{}}
                                  onClick={() =>
                                    handleItemClicked(index, itemIndex)
                                  }
                                >
                                  {item}

                                  <div className="mt-2 mb-3">
                                    <button
                                      type="button"
                                      className="btn btn-sm"
                                    >
                                      {" "}
                                      <FaAlignLeft />
                                    </button>
                                  </div>
                                </li>
                              ))}
                            </div>
                          </div>
                        </div>
                      </ul>
                      <div className="input-group ">
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
                        <button
                          className="btn btn-primary"
                          onClick={() => handleAddItem(index, card.newItem)}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>  
      </div>

      {/* Modal for New Card Title */}
      {showModal && (
        <div
          className="modal animate__animated animate__backInDown"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content add-item">
              <div className="modal-header">
                <h5 className="modal-title">Enter Card Title</h5>
                <button
                  type=" button"
                  className="btn btn-sm btn-danger close d-none"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={newCardTitle}
                  placeholder="Enter card name"
                  onChange={(e) => setNewCardTitle(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveCard}
                >
                  <FaSave />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-dialog animate__animated animate__backInDown "
            role="document"
          >
            <div className="modal-content delete-card">
              <div className="modal-header">
                <h5 className="modal-title delete-card">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn btn-sm btn-danger close d-none"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowDeleteModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body delete-card">
                Are you sure you want to delete this card?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {showDeleteItemModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn btn-sm btn-danger close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowDeleteItemModal(false)}
                >
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
      )} */}

      {showItemModal && (
        <div
          className="modal col-lg-12"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-dialog animate__animated animate__backInDown modal-xl"
            role="document"
          >
            <div className="modal-content item-description">
              <div className="modal-header">
                <h5 className="modal-title">Item Details</h5>
                <button
                  type="button"
                  className=" btn btn-sm btn-danger close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowItemModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-6 mb-5">
                      {selectedCardIndex !== null &&
                        selectedItemIndex !== null && (
                          <>
                            <p>
                              Name:{" "}
                              {
                                cards[selectedCardIndex].items[
                                  selectedItemIndex
                                ]
                              }
                            </p>

                            <p>Description: {itemDescription}</p>
                            {/* Item description input, needs better implementation */}
                            <textarea
                              className="form-control"
                              placeholder="Enter item description"
                              value={itemDescription}
                              onChange={(e) =>
                                setItemDescription(e.target.value)
                              }
                            />
                          </>
                        )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-2 col-lg-11">
                      <button
                        className="btn btn-primary  mt-2"
                        onClick={handleSaveDescription}
                      >
                        Save
                      </button>
                    </div>

                    <div className="col-sm-6 col-lg-1">
                      <button
                        className="btn btn-danger mt-2"
                        onClick={() =>
                          handleDeleteItem(selectedCardIndex, selectedItemIndex)
                        }
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
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div
            className="modal-dialog animate__animated animate__backInDown modal-dialog-centered"
            role="document"
          >
            <div className="modal-content delete-item">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn btn-sm btn-danger close d-none"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowDeleteItemModal(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this item from the list?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary secondary"
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
                  className="btn btn-danger primary"
                  onClick={confirmDeleteItem}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div class="card d-none">
        <div class="header">
          <div class="image">
            <svg
              aria-hidden="true"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                stroke-linejoin="round"
                stroke-linecap="round"
              ></path>
            </svg>
          </div>
          <div class="content">
            <span class="title">Desactivate account</span>
            <p class="message">
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed. This action cannot be undone.
            </p>
          </div>
          <div class="actions">
            <button class="desactivate" type="button">
              Desactivate
            </button>
            <button class="cancel" type="button">
              Cancel
            </button>
          </div>
        </div>
      </div>

      <div class="page d-none">
        <div class="margin"></div>
        <h1>hello</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mauris
          risus, lobortis a neque aliquet, ornare rutrum purus. Integer
          hendrerit ac est non cursus. Integer quis risus tincidunt nunc mattis
          ultricies. Proin sed enim tellus.
        </p>
      </div>
    </div>
  );
}
