import { useState } from "react"

const useField = (name) => {
  const [value, setValue] = useState("")

  const onChange = (e) => {
    setValue(e.target.value);
  }

  const reset = () => {
    setValue("");
  }

  return {
    onChange,
    value,
    name,
    reset
  }
}


export default useField;