import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { BiTrash } from "react-icons/bi";
import EditableField from './EditableField';

class InvoiceItem extends React.Component {
  calculateTotal() {
    return this.props.items.reduce((total, item) => {
      return total + (item.quantity * item.price);
    }, 0).toFixed(2); // Ensures 2 decimal places
  }

  render() {
    const { onItemizedItemEdit, currency, onRowDel, onRowAdd, items } = this.props;
    const itemTable = items.map(item => (
      <ItemRow 
        onItemizedItemEdit={onItemizedItemEdit} 
        item={item} 
        onDelEvent={onRowDel} 
        key={item.id} 
        currency={currency} 
      />
    ));

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>QTY</th>
              <th>PRICE/RATE</th>
              <th className="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {itemTable}
          </tbody>
        </Table>
        <Button className="fw-bold btn-secondary" onClick={onRowAdd}>Add Item</Button>
        <div className="mt-3">
          <h5>Total Amount: {currency} {this.calculateTotal()}</h5>
        </div>
      </div>
    );
  }
}

class ItemRow extends React.Component {
  constructor(props) {
    super(props);
    this.onDelEvent = this.onDelEvent.bind(this);
  }

  onDelEvent() {
    this.props.onDelEvent(this.props.item);
  }

  render() {
    const { item, onItemizedItemEdit, currency } = this.props;

    return (
      <tr>
        <td style={{ width: '100%' }}>
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{
              type: "text",
              name: "name",
              placeholder: "Item name",
              value: item.name,
              id: item.id,
            }}
          />
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{
              type: "text",
              name: "description",
              placeholder: "Item description",
              value: item.description,
              id: item.id,
            }}
          />
        </td>
        <td style={{ minWidth: '70px' }}>
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{
              type: "number",
              name: "quantity",
              min: 1,
              step: "1",
              value: item.quantity,
              id: item.id,
            }}
          />
        </td>
        <td style={{ minWidth: '130px' }}>
          <EditableField
            onItemizedItemEdit={onItemizedItemEdit}
            cellData={{
              leading: currency,
              type: "number",
              name: "price",
              min: 1,
              step: "0.01",
              presicion: 2,
              textAlign: "text-end",
              value: item.price,
              id: item.id,
            }}
          />
        </td>
        <td className="text-center" style={{ minWidth: '50px' }}>
          <BiTrash
            onClick={this.onDelEvent}
            style={{ height: '33px', width: '33px', padding: '7.5px' }}
            className="text-white mt-1 btn btn-danger"
          />
        </td>
      </tr>
    );
  }
}

export default InvoiceItem;
