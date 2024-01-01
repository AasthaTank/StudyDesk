import React, { useState } from 'react'

const RequirementField = ({name, label, register, errors, setValue, getValue}) => {

    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList]= useState([]);

    const handleAddRequirement = () => {
        if(requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");   
        }
    }

    const handleRemoveRequirement = () => {
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

  return (
    <div>
      
    </div>
  )
}

export default RequirementField
