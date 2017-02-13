import React, {PropType} from 'react';
import classnames from 'classnames';
import './AutoCompleteList.css';

const AutoCompleteItem = (props) => {
  /*var item = props.place.map((item, i) =>{
              return (<li key={i} onClick={()=>props.onClick(item.country)}>{item.country}</li>)
            })*/

  var look = [1,2,3];
  var look_ = this.look.map((item_,i)=>{
    return <li key={i}>{item_}</li>
  });
   return(
            {look_}
          //<li key={5} onClick={()=>props.onClick("Alemania")}>Alemania</li>
     )
}
export default AutoCompleteItem;
