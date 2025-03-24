import Content from './Content'

const Course = ({course}) => {
    let {id, name, parts} = course;
    return (
        <>
            <h2>{name}</h2>
            <Content parts={parts} />
        </>
    )
}

export default Course