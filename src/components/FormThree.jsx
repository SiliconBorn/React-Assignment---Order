import React, { useContext,useState,useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { OrderFormContext } from './App'
import Header from './Header'
import NextBtn from './NextBtn'
import PrevBtn from './PrevBtn'
import PlusIcon from './PlusIcon'

const FormThree = () => {
  const {orderState,orderDispatch,dishesData} = useContext(OrderFormContext)
  const [allAvailableDishes] = useState(()=>{
     const dishesAvailable = dishesData.dishes.reduce((dishesAvailable,current)=>{
      if(current.restaurant.includes(orderState.selectedRestaurant)){
        dishesAvailable = [...dishesAvailable,{name:current.name,id:current.id}]
      }
      return dishesAvailable
     },[])
     return dishesAvailable
  })
  const [selectedDishes,setSelectedDishes]=useState(orderState.selectedDishes.length>0?orderState.selectedDishes:[])
  console.log(orderState)

  useEffect(()=>{

    if(selectedDishes.length>0){
      orderDispatch({
        type:"UPDATE_SELECTED_DISHES",
        payload:selectedDishes
      })
    }
  },[selectedDishes])

  const addDishBtnHandler = ()=>{
    let dishNotAddedYet;
    if(selectedDishes.length===0){
      dishNotAddedYet=allAvailableDishes[0]
    }else if(selectedDishes.length<allAvailableDishes.length){
      
        dishNotAddedYet = allAvailableDishes.filter((available)=>!selectedDishes.find(selected=>selected.dish.name===available.name))[0]
    }else{
        alert("no more dishes available to add")
        return
      }
      setSelectedDishes([...selectedDishes,{dish:dishNotAddedYet,servings:1}])
    }
  

  const selectHandler =(e,index,dishToupdateId,dishToupdateName)=>{
    console.log(e.target.value)
    const dishToAddName = e.target.value
    let dishAlreadySelected = false
    if( selectedDishes.length>0){
      dishAlreadySelected =  selectedDishes.some((dishObj)=>dishObj.dish.name===dishToAddName)
    }
     if(dishAlreadySelected){

        alert('dish already selected. Please increase the servings ,if same dish is needed')
          // e.target.value = selectedDishes[index].dish.name
        setSelectedDishes([...selectedDishes]) 
        return false

     } else {
      const updatedSelectedDishes = selectedDishes.map((selectedDish)=>{
        if(selectedDish.dish.id===dishToupdateId && selectedDish.dish.name ===dishToupdateName){
          let dishToAdd = allAvailableDishes.find(dish=>dish.name===dishToAddName)
         let updatedCurrentDish = {...selectedDish,dish:dishToAdd}
         return updatedCurrentDish
        }
        return selectedDish
  })

  setSelectedDishes([...updatedSelectedDishes])
     }
  }

  const servingsChangeHandler =(e,dishToupdateId,dishToupdateName)=>{
    console.log(e.target.value)
    const selectedServings = Number(e.target.value)
   
         const updatedSelectedDishes = selectedDishes.map((selectedDish)=>{
               if(selectedDish.dish.id===dishToupdateId && selectedDish.dish.name ===dishToupdateName){
                let updatedCurrentDish = {...selectedDish,servings:selectedServings}
                return updatedCurrentDish
               }
               return selectedDish
         })

         setSelectedDishes([...updatedSelectedDishes])
    
  }

useEffect(()=>{
 console.log(selectedDishes)
},[selectedDishes])

  return (
    <section className='order-third-step'>
      <div className='steps-form-container'>
      <div className='steps-form' style={{fontSize:"13px"}}>
        <div className='selected-dishes-container'>
          {
            selectedDishes.length>0 && selectedDishes.map((selectedDish,index)=>{
              return(
                <div className='selected-dish-container'>
                <div className='dish-selection-container'>
          <label htmlFor='dishSelect'>  Please select a dish</label>
          <select onChange={(e)=>selectHandler(e,index,selectedDish.dish.id,selectedDish.dish.name)} name='dishSelect' value={selectedDish.dish.name}>
            {
              allAvailableDishes.map((dish,index)=>{
                return(
                  <>
                  <option value={dish.name} key={`${index}-${dish.name}-${dish.id}`}>{dish.name}</option>
                  </>
                )
              })
            }
          </select>
        </div>
        <div className='serving-selection-container'>
         
            <label htmlFor='totalServings'> Please  enter number of servings</label>
            <input type='number' min={1} max={10} name='totalServings' defaultValue={selectedDish.servings} onChange={(e)=>servingsChangeHandler(e,selectedDish.dish.id,selectedDish.dish.name)}/>
      
        </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='add-dishes-btn-container'>
        <button className='add-dish-btn' onClick={addDishBtnHandler}>Add dish  <PlusIcon/></button>
      </div>
     </div>
     <div className='double steps-btn-container'>
      <PrevBtn dispatch={orderDispatch}/>
      <NextBtn dispatch={orderDispatch}/>
     </div>
    </section>
  )
}

export default FormThree