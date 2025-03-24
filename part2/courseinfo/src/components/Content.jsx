import Part from './Part'

const Content = ({ parts }) => {
    const sum = parts.reduce((sum, part) => sum+=part.exercises, 0)
    return (
        <>
           {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
            <p style={{fontWeight:'bold'}}>total of {sum} exercises</p>
        </>
    )
}

export default Content