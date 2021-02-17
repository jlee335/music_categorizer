'rafce -> Makes react component!'
import PropTypes from 'prop-types';
import Button from './Button'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React, { useState, useEffect } from "react";



const Search = ({array,handleClickOpen}) => {


    const [value, setValue] = useState(array[0]);
    const [inputValue, setInputValue] = useState('');


    function setValueEvent(newValue) {
        // newValue 에 해당되는 Drawer 열기!
        var title = newValue["Title"]
        var thumbnail_link = newValue["Thumbnail"]
        var youtube_link = newValue["link"]

        handleClickOpen([title,thumbnail_link,youtube_link])
        setValue(newValue)
    }


    console.log(array)
    return (
            <Autocomplete
            
                style={{
                    zIndex: 2,
                    backgroundColor: "#FFFFFF",
                    width: 300}}
                position="absolute" 
                value={value}
                onChange={(event, newValue) => {
                    setValueEvent(newValue);
                }}

                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}

                margin="30px"
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={array}
                getOptionLabel={(option) => option["Title"]}
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
    )
}

export default Search
