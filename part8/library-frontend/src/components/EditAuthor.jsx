import { useMutation } from "@apollo/client/react";
import { ALL_AUTHORS, EDIT_AUTHOR_BIRTH_YEAR } from "../queries/AuthorQueries";
import { useState } from "react";

const EditAuthor = ({ authors }) => {
    const [author, setAuthor] = useState("")
    const [birthYear, setBirthYear] = useState("")

    const [editAuthor] = useMutation(EDIT_AUTHOR_BIRTH_YEAR,
        {
            refetchQueries:[{query: ALL_AUTHORS}]
        }
    )
    
    const submit = (e) => {
        e.preventDefault();
        console.log("editing author...")
        console.log(author)
        console.log(birthYear)
        if (Number.isNaN(birthYear)) {
            return
        }

        editAuthor({variables: {name: author, birth: Number(birthYear)}})
        setAuthor("")
        setBirthYear("")

    }

    if (!authors) {
        return null
    }

    return (
        <div>
            <h2>Set birthyear</h2>
            <label htmlFor="author-birth-select">set born to</label>
            <select name="birth year selection" id="author-birth-select" value={author} onChange={(e) => setAuthor(e.target.value)}>
                {authors.map(a => (
                    <option value={a.name} key={a.name}>{a.name}</option>
                ))}
            </select>
            <div>born
                <input type="number" value={birthYear} onChange={(e) => setBirthYear(e.target.value)}/>
            </div>
            <div>
                <button onClick={submit}>update author</button>
            </div>
        </div>
    )
}

export default EditAuthor