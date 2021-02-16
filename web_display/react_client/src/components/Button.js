



const Button = ({color,text}) => {

    const onClick = (e) => {
        // Run Search Event Here!
        console.log(e)
    }

    return <button onClick={onClick} style={{ backgroundColor: color}} className='btn'>{text}</button>

}

export default Button
