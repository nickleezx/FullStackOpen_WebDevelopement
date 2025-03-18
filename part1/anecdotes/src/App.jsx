import { useState } from 'react'

const Button = (props) => {
    return (
        <button onClick={props.onClick}>{props.name}</button>

    )
}

const VoteCounter = ({ value }) => {
    console.log(value)
    if (value < 1 || !value) {
        return (<></>);
    } else {
        return (<div>
            has {value} votes
        </div>);

    }
}

const App = () => {

    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0);


    const [votes, setVotes] = useState(Object.fromEntries(anecdotes.map((_, index) => {
        return [index, 0];
    })));

    function handleNextAnecdote() {
        setSelected(Math.floor(Math.random() * anecdotes.length));
    }

    function incrementVote() {
        setVotes({ ...votes, [selected]: votes[selected] + 1 });
    }

    function getMostVotedIndex(votes) {
        const keys = Object.keys(votes)
        let max = 0
        let maxIndex = null
        for (let key in keys){
            if (votes[key] > max){
                max = votes[key];
                maxIndex = key;
            }
        }
        return maxIndex
    }

    return (
        <>
            <h1>Anecdote of the day</h1>
            <div>
                {anecdotes[selected]}
            </div>
            <VoteCounter value={votes[selected]} />
            
            <div>
                <Button onClick={incrementVote} name={"vote"} />
                <Button onClick={handleNextAnecdote} name={"next anecdote"} />
            </div>

            <h1>Anecdote with most votes</h1>
            <div>{anecdotes[getMostVotedIndex(votes)]}</div>
            <VoteCounter value={votes[getMostVotedIndex(votes)]} />


        </>
    )
}

export default App