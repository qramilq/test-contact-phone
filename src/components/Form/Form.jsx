import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import Cleave from "cleave.js/react";

const prefix = "+7";
const cleaveOptions = {
  blocks: [2, 3, 3, 2, 2],
  delimiters: [" ", " ", "-", "-"],
  prefix: prefix,
  numericOnly: true,
};

export default class ContactForm extends React.Component {
  onSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      id: this.props.values.id || Date.now(),
    };

    this.props.onSubmit(formValues);
  };

  render() {
    const {
      values: { name, phone },
    } = this.props;

    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            defaultValue={name}
          />
        </FormGroup>
        <FormGroup>
          <Label for="phone">Phone</Label>
          <Cleave
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone"
            className={"form-control"}
            value={phone}
            options={cleaveOptions}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    );
  }
}
