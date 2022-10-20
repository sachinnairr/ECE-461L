import Field from "./field";
export default function FieldSet(props){
    function generateFields(names){
    const arr = [];
    let i = 0
    while(i < names.length){
      arr.push(<Field label={names[i]}/> )
       i++;
       }
    return arr;
    }
    return(
        <div className="field-set">
            <h2 className="field-set-title">{props.title}</h2>
            {generateFields(props.fields)}
        </div>
    )
}