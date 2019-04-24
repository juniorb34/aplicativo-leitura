import React from "react";
import { Select } from "antd";

const SortBy = ({ mudarOrdem }) => (
  <div>
    <span>Ordenado por</span>
    <Select defaultValue="date" onChange={type => mudarOrdem(type)}>
      <Select.Option value="date">Mais recente</Select.Option>
      <Select.Option value="votes">Mais Votado</Select.Option>
    </Select>
  </div>
);

export default SortBy;
