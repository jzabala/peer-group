import React, {PropType} from 'react';
import classnames from 'classnames';
import AutoCompleteItem from './AutoCompleteItem.js';
import './AutoCompleteList.css';


export class AutoCompleteList extends React.Component{

  render(){
    var item = this.props.world.map((item, i) =>{
                var full_place = item.city + " " + item.country;
                return (<li key={i} onClick={()=>this.props.onClick(full_place)}>{full_place}</li>)
              })

    return(
           <ul className={classnames('AutoCompleteList_list-style')}>
             {item}
         </ul>);
  }
}

export default AutoCompleteList;
