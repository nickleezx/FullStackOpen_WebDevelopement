import { useState } from 'react'
import './App.css'

const StatisticLine = (prop) => {
    return (
        <tr><td>{prop.name} {prop.value}</td></tr>
    )
}

const Button = (prop) => {
    return (
        <>
            <button onClick={prop.value}>{prop.name}</button>
        </>
    )
}

const StatisticsTable = ({ good, neutral, bad }) => {
    if (good + bad + neutral <= 0) {
        return (
            <p>No feedback given</p>
        )
    } else {
        return (
            <table>
                <tbody>
                    <StatisticLine name="good" value = {good}/>
                    <StatisticLine name="neutral" value = {neutral}/>
                    <StatisticLine name="bad" value = {bad}/>
                    <StatisticLine name="all" value = {good + neutral + bad}/>
                    <StatisticLine name="average" value = {(good - bad) / (good + bad + neutral)}/>
                    <StatisticLine name="positive" value = {good / (good + bad + neutral)}/>
                </tbody>
            </table>
        )
    }
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const stateValues = { good, neutral, bad };

    const handleGood = () => {
        setGood(good + 1);
    }
    const handleNeutral = () => {
        setNeutral(neutral + 1);
    }
    const handleBad = () => {
        setBad(bad + 1);
    }

    return (
        <div className='container'>
            <h1>give feedback</h1>

            <Button name="good" value={handleGood}/>
            <Button name="neutral" value={handleNeutral}/>
            <Button name="bad" value={handleBad}/>

            <h1>statistics</h1>
            <StatisticsTable {...stateValues} />

        </div>
    )
}

export default App