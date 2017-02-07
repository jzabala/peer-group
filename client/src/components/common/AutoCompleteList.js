import React, {PropType} from 'react';
import classnames from 'classnames';
import './AutoCompleteList.css';


const AutoCompleteList = (props) => {
const world = props.world.world;
  console.log(world);
  return(
         <ul>
         {
           world.map((item) =>{
            return <li key={item.place.id}>{item.place.country}</li>;
         })
       }
       </ul>);
}


export default AutoCompleteList;
