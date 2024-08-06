import React, { useState } from 'react'
import SchemaDropdown from './SchemaDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Popup = ({onClose}) => {
  const [name,setname]=useState("")
  const [schemas, setSchemas] = useState([]);
  const [addnewschema,setAddnewschema]=useState(false);
  const [allSchemas,setallSchemas] = useState([
    {id:1, label: 'First Name', value: 'first_name' },
    {id:2, label: 'Last Name', value: 'last_name' },
    {id:3, label: 'Gender', value: 'gender' },
    {id:4, label: 'Age', value: 'age' },
    {id:5, label: 'Account Name', value: 'account_name' },
    {id:6, label: 'City', value: 'city' },
    {id:7, label: 'State', value: 'state' },
  ]);  

  const addSchema = (value) => {
    console.log(value.id)
    setSchemas([...schemas, value]);
  };
  const addNewSchema=()=>{
    setAddnewschema(true)
  }

  const handleSave =async () => {
    const data = {
      segment_name: name,
      schema: schemas.map(value => ({ [value]: allSchemas.find(schema => schema.value === value).label }))
    };
    console.log(data)
    try {
      const response = await fetch('https://webhook.site/479a9011-bb3a-4106-bf2b-e8f0175241fd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Data successfully sent to the server:', data);
        onClose();
      } else {
        console.error('Failed to send data to the server');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const removeSchema = (index) => {
    const schemaToRemove = schemas[index];
    setSchemas(schemas.filter((_, i) => i !== index));
  };
  return (
    <>
    <div className='modal'>
     <header className='modal-header'>
      <p>Saving Segment</p>
     </header>
     <div className='modal_body'>
      <div className='segment_name'>
      <label>Enter the name of the Segment</label>
      <input type="text" placeholder='Name of the Segment' value={name} onChange={(e)=>setname(e.target.value)}></input>
      </div>
      <p>To save your segment, you need to add the schemas to build the query</p>
  

      {(schemas.length===0)?<SchemaDropdown schemas={allSchemas.filter(schema => !schemas.includes(schema.value))} onAddSchema={addSchema} setAddnewschema={setAddnewschema} />:
        <div className="schemas-list">
        {schemas.map((schema, index) => (
          <div key={index} >
          <SchemaDropdown key={index} schemas={allSchemas.filter(s => !schemas.includes(s.value) || s.value === schema)} selected={schema} onAddSchema={addSchema} setAddnewschema={setAddnewschema}/>
          <button onClick={() => removeSchema(index)}> <FontAwesomeIcon icon="fa-solid fa-minus" /></button>
          </div>
         
        ))}
        
      </div>}
      {addnewschema?<SchemaDropdown schemas={allSchemas.filter(schema => !schemas.includes(schema.value))} onAddSchema={addSchema} setAddnewschema={setAddnewschema}/>:<></>}
      <a href="#" className="add-schema-link" onClick={addNewSchema}>+ Add new schema</a>
     </div>
    
     <footer className='footer'>
    <button  className="save" onClick={handleSave}>Save the Segment</button>
    <button className="cancel" onClick={onClose}>Cancel</button>
    </footer>
    </div>
   
    </>
  )
}

export default Popup