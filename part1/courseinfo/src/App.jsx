const Header = ({ name }) => {
    return (
        <>
            <h1>{name}</h1>
        </>
    );
};

const Content = ({ props }) => {
    return (
        <>
            <Part prop={props[0]} />
            <Part prop={props[1]} />
            <Part prop={props[2]} />
        </>
    );
};

const Part = ({ prop }) => {
    return (
        <>
            <p>{prop.name} {prop.exercises}</p>
        </>
    )
}

const Total = ({array}) => {

    return (
        <>
            <p>Number of exercises {array[0].exercises + array[1].exercises + array[2].exercises}</p>
        </>
    );
};

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }
    return (
        <div>
            <Header name={course.name} />
            <Content props={course.parts} />
            <Total array={course.parts} />
        </div>
    );
}

export default App
