import React from "react";
import { ListGroup, Modal, ModalHeader, ModalBody, Button } from "reactstrap";

import Item from "../../components/Item";
import Form from "../../components/Form";

import { loadFromStorage, saveToStorage } from "../../helpers/storage";

import styles from "./List.module.css";

const modalMods = {
  add: "Add",
  edit: "Edit",
};

export default class List extends React.Component {
  state = {
    contacts: [],
    isModalOpen: false,
    modalValues: {},
    modalMode: "",
  };

  componentDidMount() {
    loadFromStorage({ key: "contacts", defaultValue: [] }).then(res => {
      this.setState({ contacts: res });
    });
  }

  onEdit = item => {
    this.setState({ isModalOpen: true, modalValues: item, modalMode: "edit" });
  };

  onAdd = () => {
    this.setState({ isModalOpen: true, modalValues: {}, modalMode: "add" });
  };

  onRemove = removeId => {
    if (!window.confirm('Remove contact?')) {
      return false;
    }
    const nextContacts = [...this.state.contacts];
    const elIndex = nextContacts.findIndex(({ id }) => id === removeId);

    if (elIndex > -1) {
      nextContacts.splice(elIndex, 1);
    }
    this.setState({ contacts: nextContacts });

    saveToStorage({ key: "contacts", value: nextContacts });
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  onFormSubmit = formValues => {
    const nextContacts = [...this.state.contacts];
    const elIndex = nextContacts.findIndex(({ id }) => id === formValues.id);

    this.toggleModal();

    if (elIndex > -1) {
      nextContacts[elIndex] = formValues;
    } else {
      nextContacts.push(formValues);
    }
    this.setState({ contacts: nextContacts });

    saveToStorage({ key: "contacts", value: nextContacts });
  };

  render() {
    const { contacts, isModalOpen, modalValues, modalMode } = this.state;

    return (
      <>
        {contacts.length ? (
          <>
            <ListGroup>
              {contacts.map((contact, i) => (
                <Item
                  key={i}
                  data={contact}
                  onEdit={this.onEdit}
                  onRemove={this.onRemove}
                />
              ))}
            </ListGroup>
          </>
        ) : null}
        <div className={styles.addBtnContainer}>
          <Button
            className={styles.addBtn}
            color="success"
            onClick={this.onAdd}
          >
            Add contact
          </Button>
        </div>
        <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            {modalMods[modalMode]} contact
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onFormSubmit} values={modalValues} />
          </ModalBody>
        </Modal>
      </>
    );
  }
}
