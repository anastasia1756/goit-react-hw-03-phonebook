import React, { Component } from "react";
import { nanoid } from "nanoid";
import toast, { Toaster } from "react-hot-toast";
import { ContactList } from "../ContactList";
import { Filter } from "../Filter";
import { ContactForm } from "../ContactForm";
import { Container, Title, Contacts } from "./App.styled";

const LS_KEY = "contacts";
export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: "",
  };
  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    }
  }
  componentDidMount() {
    const savedContacts = localStorage.getItem(LS_KEY);
    const parsedContacts = JSON.parse(savedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  filterInputChange = (evt) => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  addContact = (submitedName, submitedNumber) => {
    const notify = () =>
      toast.error(`${searchedName.name} is already in contacts`);
    const successAdded = () =>
      toast.success("successfully added!", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    const id = nanoid();
    const newContact = { name: submitedName, id, number: submitedNumber };

    const searchedName = this.state.contacts.find(
      ({ name }) => name.toLowerCase() === submitedName.toLowerCase()
    );
    searchedName
      ? notify()
      : this.setState(({ contacts }) => ({
          contacts: [...contacts, newContact],
        }));
    !searchedName && successAdded();
  };
  findContact = () => {
    const { contacts, filter } = this.state;
    const normilizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );
  };
  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };
  filterHandleDelete = () => {
    this.setState({ filter: "" });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = this.findContact();

    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.addContact} />
        <Toaster />
        <Contacts>Contacts</Contacts>
        <Filter
          filter={filter}
          contacts={contacts}
          onChange={this.filterInputChange}
          onClick={this.filterHandleDelete}
        />
        {contacts.length > 0 ? (
          <ContactList
            contacts={filteredContacts}
            onDeleteClick={this.deleteContact}
          />
        ) : (
          <p>No contacts yet</p>
        )}
      </Container>
    );
  }
}
