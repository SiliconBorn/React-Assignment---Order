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

  const addDishBtnHandler = ()=>{
     setSelectedDishes([...selectedDishes,{dish:allAvailableDishes[0],servings:1}])
  }

  const selectHandler =(e,index,dishToupdateId,dishToupdateName)=>{
    console.log(e.target.value)
    const dishToAdd = JSON.parse(e.target.value)
    let dishAlreadySelected = false
    if( selectedDishes.length>0){
      dishAlreadySelected =  selectedDishes.find((dishObj)=>dishObj.dish.id===dishToAdd.id)
    }
     if(dishAlreadySelected){

        alert('dish already selected. Please increase the servings ,if same dish is needed')
          e.target.value = selectedDishes[index].dish.name
        setSelectedDishes([...selectedDishes]) 

     } else {
      const updatedSelectedDishes = selectedDishes.map((selectedDish)=>{
        if(selectedDish.dish.id===dishToupdateId && selectedDish.dish.name ===dishToupdateName){
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
    <section className='order-first-step'>
      <div className='steps-header-container'>
     <Header currentStep={orderState.currentFormStep}/>
      </div>
      <div className='steps-form-container'>
      <div className='steps-form'>
        <div className='selected-dishes-container'>
          {
            selectedDishes.length>0 && selectedDishes.map((selectedDish,index)=>{
              return(
                <>
                <div className='dish-selection-container'>
          <label htmlFor='dishSelect'>  Please select a dish</label>
          <Form.Select onChange={(e)=>selectHandler(e,index,selectedDish.dish.id,selectedDish.dish.name)} name='dishSelect'  value={selectedDish.dish.name}>
            {
              allAvailableDishes.map((dish,index)=>{
                return(
                  <>
                  <option value={JSON.stringify(dish)} key={`${index}-${dish.name}-${dish.id}`} selected={selectedDish.dish.name===dish.name && selectedDish.dish.id === dish.id}>{dish.name}</option>
                  </>
                )
              })
            }
          </Form.Select>
        </div>
        <div className='serving-selection-container'>
         
            <label htmlFor='totalServings'> Please  enter number of servings</label>
            <input type='number' min={1} max={10} name='totalServings' defaultValue={selectedDish.servings} onChange={(e)=>servingsChangeHandler(e,selectedDish.dish.id,selectedDish.dish.name)}/>
      
        </div>
                </>
              )
            })
          }
        </div>
      </div>
      <div className='add-dishes-btn-container'>
        <button className='add-dish-btn' onClick={addDishBtnHandler}>Add dish</button>
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