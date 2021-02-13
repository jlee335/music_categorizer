'rafce -> Makes react component!'
import PropTypes from 'prop-types';
import Button from './Button'

const Search = ({name}) => {
    return (
        <search className='search'>
            <h3>{name}'s searchbar</h3>
            <Button color='green' text='Search'/>
        </search>
    )
}



Search.defaultProps = {
    name:'Anonymous'
}

// For robustness of what kind of data is given
Search.propTypes = {
    name: PropTypes.string.isRequired,
}

// Can add inside the css thingy code
const headingStyle = {
    color: 'blue',backgroundColor: "gray"
}

export default Search
