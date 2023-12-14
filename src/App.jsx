import uuid from "react-uuid";
import React, { useState } from "react";
import "./index.css";
import { RiDeleteBin5Line } from "react-icons/ri";
export default function App() {
  const salesForceVariables = [
    "choose",
    "city",
    "food",
    "religion",
    "state",
    "country",
  ];
  const callHubValues = [
    "choose",
    "bengaluru",
    "dal-chaval",
    "muslim",
    "karnataka",
    "india",
  ];
  const [rows, setRows] = useState([{ sv: {options:salesForceVariables}, callHubvalue: {options:callHubValues} }]);
  const [fieldMappers,setFieldMappers]=useState([])
  const handleSfv = (e, rowIndex) => {
    const selectedValue = e.target.value;
    let salesForceVariablesCopy =[...salesForceVariables]
    
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
         // Add UP previous VALUE IN OTHER ELEMENTS
         for(let l=0;l<updatedRows.length;l++){
          const replacement=updatedRows[rowIndex].sv.previousValue
          const isAlreadyFound=updatedRows[l].sv.options.filter((option)=>option==replacement)
          if(isAlreadyFound==undefined || isAlreadyFound.length){
            continue
          }
          if(replacement) {
          updatedRows[l].sv.options.push(replacement)
          }
        }
      updatedRows[rowIndex].sv = {
        previousValue: prevRows[rowIndex].sv.previousValue?prevRows[rowIndex].sv.previousValue:selectedValue,
        actualValue: selectedValue,
        options:salesForceVariablesCopy
      };
            // FREE UP SELECTED VALUE IN OTHER ELEMENTS
            for(let i=0;i<updatedRows.length;i++){
              // same element so need to skip
              if(updatedRows[i].sv?.actualValue==selectedValue){
                for(let j=0;j<updatedRows.length;j++){
                  if(j==rowIndex){
                    continue
                  }else{
                    const selectedValue=updatedRows[j].sv.actualValue
                    updatedRows[rowIndex].sv.options=updatedRows[rowIndex].sv.options.filter((option)=>option!==selectedValue)
                }
                }
              }else{
                updatedRows[i].sv.options=updatedRows[i].sv.options.filter((option)=>option!==selectedValue)
              }
            }
         
      return updatedRows;
    });

  };

  const handleCallHubValues = (e, rowIndex) => {
    const selectedValue = e.target.value;
    let callHubValuesCopy =[...callHubValues]
    setRows((prevRows) => {
      const updatedRows = [...prevRows];
         // Add UP previous VALUE IN OTHER ELEMENTS
         for(let l=0;l<updatedRows.length;l++){
          const replacement=updatedRows[rowIndex].callHubvalue.previousValue
          const isAlreadyFound=updatedRows[l].callHubvalue.options.filter((option)=>option==replacement)
          if(isAlreadyFound==undefined || isAlreadyFound.length){
            continue
          }
          if(replacement) {
          updatedRows[l].callHubvalue.options.push(replacement)
          }
        }
      updatedRows[rowIndex].callHubvalue = {
        previousValue: prevRows[rowIndex].callHubvalue.previousValue?prevRows[rowIndex].callHubvalue.previousValue:selectedValue,
        actualValue: selectedValue,
        options:callHubValuesCopy
      };
            // FREE UP SELECTED VALUE IN OTHER ELEMENTS
            for(let i=0;i<updatedRows.length;i++){
              // same element so need to skip
              if(updatedRows[i].callHubvalue?.actualValue==selectedValue){
                for(let j=0;j<updatedRows.length;j++){
                  if(j==rowIndex){
                    continue
                  }else{
                    const selectedValue=updatedRows[j].callHubvalue.actualValue
                    updatedRows[rowIndex].callHubvalue.options=updatedRows[rowIndex].callHubvalue.options.filter((option)=>option!==selectedValue)
                }
                }
              }else{
                updatedRows[i].callHubvalue.options=updatedRows[i].callHubvalue.options.filter((option)=>option!==selectedValue)
              }
            }
         
      return updatedRows;
    });
  };

  const AddAnotherField = () => {
    // const sfvArr=prevRows.forEach((row)=>)
    setRows((prevRows) => {
    // remove used salesforce variable values
    let salesForceVariablesCopy =[...salesForceVariables]
    prevRows.map((row)=>{
      salesForceVariablesCopy=salesForceVariablesCopy.filter((item)=> row.sv?.actualValue!==item
      )
    })
    // remove used callhub values
    let callHubVariablesCopy =[...callHubValues]
    prevRows.map((row)=>{
      callHubVariablesCopy=callHubVariablesCopy.filter((item)=>item!==row.callHubvalue.actualValue)
    })
    // this is to update options
    // const arr=prevRows.map((row)=>row.sv.options.filter((innerRow)=>))
    // this is to remove current value
      return [...prevRows, { sv: {options:salesForceVariablesCopy}, callHubvalue: {options:callHubVariablesCopy} }]
    });
  };

  const handleDelete = (index) => {
    setRows((prevRows) => {
      const copy = [...prevRows];
    // deleted values should be free up
      const sfv=prevRows[index].sv.actualValue
      const callHubValue=prevRows[index].callHubvalue.actualValue
      if(sfv){
        copy.map((eachCopy)=> {
          if(!eachCopy.sv.options.includes(sfv)){
            return eachCopy.sv.options.push(sfv)
          }
        })
      }
      if(callHubValue){
      copy.map((eachCopy)=>{
        if(!eachCopy.callHubvalue.options.includes(callHubValue)){
        return eachCopy.callHubvalue.options.push(callHubValue)
        }
      })
      }
      console.log(sfv)
      console.log(callHubValue)
      copy.splice(index,1);
      return copy;
    });
      
  };

  const SubFieldMapper=()=>{
    const result=[]
    rows.map((row)=>{
      console.log(row.sv.actualValue,row.callHubvalue.actualValue)
      if(row.sv.actualValue && row.callHubvalue.actualValue){
        result.push([row.sv.actualValue,row.callHubvalue.actualValue])
      }
      setFieldMappers(result)
    })
  }
  return (
    <section>
      <div className="titles-div">
        <p>SalesForce fields</p>
        <p>CallHub custom fields</p>
      </div>
      {rows.map((row, i) => 
       {
        return  (<div key={uuid()}>
          <select onChange={(e) => handleSfv(e, i)} value={row.sv.actualValue}>
            {row.sv.options.map((sfv) => (
              <option key={sfv}>{sfv}</option>
            ))}
          </select>
          <select
            onChange={(e) => handleCallHubValues(e, i)}
            value={row.callHubvalue.actualValue}
          >
            {row?.callHubvalue.options.map((sfv) => (
              <option key={sfv}>{sfv}</option>
            ))}
          </select>
          <button onClick={()=>handleDelete(i) } className="delete-cta"><RiDeleteBin5Line /></button>
        </div>
      )})}
      <div className="cta-group">
      <div className="cta" onClick={AddAnotherField}>
        <p className="cta-icon">+</p>
        <button >Map Another Field</button>
      </div>
      <button onClick={SubFieldMapper} className="submit-cta">Save and import lists</button>
      </div>
      {
        fieldMappers.length?<>
        <hr/>
        {fieldMappers.map((field)=><p key={uuid()}>{field[0]} {field[1]}</p>)}
        </>:null
      }
    </section>
  );
}
