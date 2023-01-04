import React from 'react';
import {Link} from "react-router-dom";

const EquipmentTable = ({item}) => {
  return (
      <tr>
        <th scope="row">{item.id}</th>
        <td>{item.equipment_type[0].name}</td>
        <td>{item.serial}</td>
        <td>{item.equipment_type[0].serial_mask}</td>
        <td>{item.note}</td>
        <td>
          <Link to={`/equipment/${item.id}`}>изменить</Link>
      </td>
</tr>
  );
};

export default EquipmentTable;