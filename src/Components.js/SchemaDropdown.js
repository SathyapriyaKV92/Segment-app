import React from 'react'
import { useState } from 'react';

const SchemaDropdown = ({ schemas, onAddSchema,selected,setAddnewschema}) => {
    const [selectedValue, setSelectedValue] = useState(selected || '');

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    onAddSchema(e.target.value);
    setAddnewschema(false)
  };
  return (
   <>
    <select value={selectedValue} onChange={handleChange}>
      <option value="">Add schema to segment</option>
      {schemas.filter(schema => !selected || schema.value === selected).map(schema => (
        <option key={schema.value} value={schema.value}>{schema.label}</option>
      ))}
    </select>
   </>
  )
}

export default SchemaDropdown