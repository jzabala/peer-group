import React, {PropType} from 'react';
import classnames from 'classnames';
import './AutoCompleteList.css';


export class AutoCompleteList extends React.Component{

  render(){
    var item = this.props.world.map((item, i) =>{
                const regExpComa = /,/;
                let city;
                if(item.country != null && !item.country.match(regExpComa)){
                  city = item.city + ',';
                }
                else{
                  city = item.city;
                }
                var full_place = city + " " + item.country;
                return (<li key={i} onClick={()=>this.props.onClick(full_place)}>{full_place}</li>)
              })
    return(
           <ul className={classnames('AutoCompleteList_list-style')}>
             {item}
         </ul>);
  }
}

export default AutoCompleteList;
