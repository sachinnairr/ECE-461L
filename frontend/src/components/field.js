import TextField from '@mui/material/TextField';

export default function Field(props){
    return(
        <div className='field'>
            <div className='field-label'>{props.label}</div>
            <TextField id="outlined-basic" label="" variant="outlined" />
        </div>
    )
}