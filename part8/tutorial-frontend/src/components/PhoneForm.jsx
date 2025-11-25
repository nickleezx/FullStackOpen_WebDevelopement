import { useState } from 'react'
import { ALL_PERSONS, EDIT_NUMBER } from '../queries/queries'
import { useMutation } from '@apollo/client/react'
import { useEffect } from 'react'

const PhoneForm = ({setError}) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [changeNumber, result] = useMutation(EDIT_NUMBER, {
        refetchQueries: [{ query: ALL_PERSONS }]
    })

    const submit = (e) => {
        e.preventDefault()

        changeNumber({ variables: { name, phone } })

        setName('')
        setPhone('')
    }

    useEffect(() => {
        if (result.data && result.data.editNumber === null) {
            setError("Person not found")
        }
    }, [result.data])

    return (
        <div>
            <h2>change number</h2>

            <form onSubmit={submit}>
                <div>
                    name <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    phone <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)} />
                </div>

                <button type="submit">change number</button>
            </form>
        </div>
    )
}

export default PhoneForm