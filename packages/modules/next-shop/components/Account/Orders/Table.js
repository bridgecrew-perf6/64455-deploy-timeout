const AccountOrdersTable = () => (
  <table className="uk-table uk-table-small uk-table-justify uk-table-responsive uk-table-divider uk-margin-small-top uk-margin-remove-bottom">
    <tbody>
      <tr>
        <th className="uk-width-medium">Items</th>
        <td>7</td>
      </tr>
      <tr>
        <th className="uk-width-medium">Shipping</th>
        <td>Pick up from store</td>
      </tr>
      <tr>
        <th className="uk-width-medium">Payment</th>
        <td>Online by card</td>
      </tr>
      <tr>
        <th className="uk-width-medium">Total</th>
        <td>$4896.00</td>
      </tr>
      <tr>
        <th className="uk-width-medium">Status</th>
        <td>
          <span className="uk-label">Processing</span>
        </td>
      </tr>
    </tbody>
  </table>
);

export default AccountOrdersTable;
