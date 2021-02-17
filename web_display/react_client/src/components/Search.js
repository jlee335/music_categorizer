'rafce -> Makes react component!'
import PropTypes from 'prop-types';
import Button from './Button'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



const Search = ({array}) => {
    return (
        <search className='search'>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={array.array}
                getOptionLabel={(option) => option.Title}
                style={{ width: 300 }}
                renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search input"
                      margin="normal"
                      variant="outlined"
                      InputProps={{ ...params.InputProps, type: 'search' }}
                    />
                  )}
            />
        </search>
    )
}

export default Search
