import React from "react";
import { ListGroupItem, Badge } from "reactstrap";
import PropTypes from "prop-types";

import { stringToHslColor } from "../../helpers/getColor";

import styles from "./Item.module.css";

export default class Item extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
  };

  state = {};

  onEdit = () => {
    this.props.onEdit(this.props.data);
  };

  onRemove = () => {
    this.props.onRemove(this.props.data.id);
  };

  render() {
    const { name, phone } = this.props.data;
    const avatarColor = stringToHslColor(name);
    const telPhone = phone.slice(2).replace(/\s|-/g, "");

    return (
      <ListGroupItem className={styles.item}>
        <div className={styles.info}>
          <div
            className={styles.avatar}
            style={{ backgroundColor: avatarColor }}
          >
            {name[0]}
          </div>
          <h5 className={styles.name}>{name}</h5>
          <a className={styles.phone} href={"tel:" + telPhone}>{phone}</a>
        </div>
        <div className={styles.btnGroup}>
          <Badge color="warning" className={styles.badgeWarning} onClick={this.onEdit}>
            Edit
          </Badge>
          <Badge color="danger" className={styles.badgeDanger} onClick={this.onRemove}>
            Remove
          </Badge>
        </div>
      </ListGroupItem>
    );
  }
}
