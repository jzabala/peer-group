import React, {PropType} from 'react';
import classnames from 'classnames';
import './AutoCompleteList.css';


const AutoCompleteList = (props) => {
  console.log(props);
var world = props.world;

  return(
         <ul className={classnames('AutoCompleteList_list-style')}>
         {
           world.map((item) =>{
             console.log(item.id);
            return <li key={item.id} onClick={()=>props.onClick(item.country)}>{item.country}</li>;
         })
       }
       </ul>);

}


export default AutoCompleteList;
