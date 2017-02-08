import React, {PropType} from 'react';
import classnames from 'classnames';
import './AutoCompleteList.css';


const AutoCompleteList = (props) => {
const world = props.world;


  return(
         <ul className={classnames('AutoCompleteList_list-style')}>
         {
           world.map((item) =>{
            return <li key={item.place.id} onClick={()=>props.onClick(item.place.country)}>{item.place.country}</li>;
         })
       }
       </ul>);

}


export default AutoCompleteList;
