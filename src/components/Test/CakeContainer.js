import React from 'react'
import { connect } from 'react-redux';
import {buyCake} from '../../redux/cake/cakeAction';
function CakeContainer (props) {
    return (
      <div>
        <h2>Number of cakes - {props.numOfCakes} </h2>
        <button onClick={props.buyCake}>Buy Cake</button>
      </div>
    )
  }
  const mapStateToProps = state =>{
      return {
          numberOfCakes:state.numberOfCakes
      }
  }

const mapDispatchToProps = dispatch =>{
    return {
        buyCake:()=> dispatch(buyCake())
    }
}