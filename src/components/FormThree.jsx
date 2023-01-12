import React, { useContext,useState,useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { OrderFormContext } from './App'
import Header from './Header'
import NextBtn from './NextBtn'
import PrevBtn from './PrevBtn'

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
  const [selectedDishes,setSelectedDishes]=useState([])
  console.log(orderState)

  const selectHandler =(e)=>{
    console.log(e.target.value)
    const dishToAdd = JSON.parse(e.target.value)
    let dishAlreadySelected =false
    if( selectedDishes.length>0){
      dishAlreadySelected = selectedDishes.length>0 && selectedDishes.find((dishObj)=>dishObj.dish.id===dishToAdd.id)
    }
     if(dishAlreadySelected) return
     else setSelectedDishes([...selectedDishes,{dish:dishToAdd,servings:1}])
  }

  const servingsChangeHandler =(e)=>{
    console.log(e.target.value)
    const selectedServings = Number(e.target.value)
    if(selectedDishes.length===0){
      setSelectedDishes([{dish:allAvailableDishes[0],servings:selectedServings}])
    }else{
      const updatedSelectedDishes = selectedDishes.reduceRight((updatedSelectedDishes,current,index)=>{
        if(index===0){
          let updatedDish = {...current,servings:selectedServings}
          updatedSelectedDishes=[updatedDish,...updatedSelectedDishes]
        }else updatedSelectedDishes=[current,...updatedSelectedDishes]
        return updatedSelectedDishes
      },[])
      setSelectedDishes([...updatedSelectedDishes])
    }
  }

useEffect(()=>{
 console.log(selectedDishes)
},[selectedDishes])

  return (
    <section className='order-first-step'>
      <div className='steps-header-container'>
     <Header currentStep={orderState.currentFormStep}/>
      </div>
      <div className='steps-form-container'>
      <div className='steps-form'>
        <div className='dish-selection-container'>
          <label htmlFor='dishSelect'>  Please select a dish</label>
          <Form.Select onChange={selectHandler} name='dishSelect' >
            {
              allAvailableDishes.map((dish,index)=>{
                return(
                  <>
                  <option value={JSON.stringify(dish)} key={`${index}-${dish.name}-${dish.id}`}>{dish.name}</option>
                  </>
                )
              })
            }
          </Form.Select>
        </div>
        <div className='serving-selection-container'>
         
            <label htmlFor='totalServings'> Please  enter number of servings</label>
            <input type='number' min={1} max={10} name='totalServings' defaultValue={1} onChange={servingsChangeHandler}/>
      
        </div>
      </div>
     </div>
     <div className='steps-btn-container'>
      <PrevBtn dispatch={orderDispatch}/>
      <NextBtn dispatch={orderDispatch}/>
     </div>
    </section>
  )
}

export default FormThree