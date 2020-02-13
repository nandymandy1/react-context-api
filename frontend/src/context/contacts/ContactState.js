/* eslint-disable */
import {
  ADD_CONTACT,
  SET_CURRENT,
  GET_CONTACTS,
  CLEAR_FILTER,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  CLEAR_CONTACTS,
  DELETE_CONTACT,
  FILTER_CONTACTS
} from "../types";

import ax from "../../services/api";
import React, { useReducer } from "react";
import ContactReducer from "./ContactReducer";
import ContactContext from "./ContactContext";

const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    loading: false
  };
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Get all Contacts
  const getContacts = async () => {
    try {
      let { data } = await ax.get("/api/contacts");
      dispatch({ type: GET_CONTACTS, payload: data });
    } catch ({ response }) {
      Toast.fire({ icon: "error", title: "Unable to load the contacts." });
    }
  };

  // ADD Contact
  const addContact = async contact => {
    try {
      const { data } = await ax.post("api/contacts", contact);
      dispatch({ type: ADD_CONTACT, payload: data });
      Toast.fire({ icon: "success", title: "Contact added successfully." });
    } catch ({ response }) {
      Toast.fire({ icon: "error", title: response.data.message });
    }
  };

  // DELETE Contact
  const deleteContact = async _id => {
    try {
      await ax.delete(`/api/contacts/${_id}`);
      dispatch({ type: DELETE_CONTACT, payload: _id });
      Toast.fire({ icon: "success", title: "Contact deleted successfully." });
    } catch ({ response }) {
      Toast.fire({ icon: "error", title: response.data.message });
    }
  };

  // Clear Contatc State
  const clearContacts = () => dispatch({ type: CLEAR_CONTACTS });

  // SET Current Contact
  const setCurrent = contact =>
    dispatch({ type: SET_CURRENT, payload: contact });

  // Clear Current Contact
  const clearCurrent = () => dispatch({ type: CLEAR_CURRENT });

  // Update Contact
  const updateContact = async contact => {
    try {
      let { data } = await ax.put(`/api/contacts/${contact._id}`, contact);
      dispatch({ type: UPDATE_CONTACT, payload: data });
      Toast.fire({ icon: "success", title: "Contact updated successfully." });
    } catch ({ response }) {
      Toast.fire({ icon: "error", title: response.data.message });
    }
  };

  // Filter Contact
  const filterContacts = keyword =>
    dispatch({ type: FILTER_CONTACTS, payload: keyword });

  // Clear Filter
  const clearFilter = () => dispatch({ type: CLEAR_FILTER });

  return (
    <ContactContext.Provider
      value={{
        // Methods
        addContact,
        setCurrent,
        getContacts,
        clearFilter,
        clearCurrent,
        clearContacts,
        deleteContact,
        updateContact,
        filterContacts,
        // Values
        loading: state.loading,
        current: state.current,
        contacts: state.contacts,
        filtered: state.filtered
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
