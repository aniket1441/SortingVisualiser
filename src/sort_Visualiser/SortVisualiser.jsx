import React, { useEffect, useState , useRef } from 'react'
import "./SortVisualiser.css";
import { getQuickSortAnimations } from "../algos/QuickSort";
import {GetBubblsort  } from "../algos/Bubblsort";

const ArrayLength =100;
const MIN_NUM = 5;
const MAX_NUM = 80;
const DELAY = 5;
const ACCESSED_COLOUR = 'turquoise';
const SORTED_COLOUR = 'green';


function SortVisualiser(props) {
    
    const [arr,setArr] = useState([]); 
    const [isSorted,setIsSorted] = useState(false);
    const [isSorting, setSorting] = useState(false);
    const containerRef = useRef(null);

    useEffect(initialiseArray ,[]);

   function initialiseArray()
   {  
      if(isSorting)
        return;
     
      if(isSorted)
        resetArrayColour();  


     setIsSorted(false);  

      const arr=[];

      for(let i=0;i<ArrayLength ; i++){
          arr.push((MAX_NUM - MIN_NUM) * (i / ArrayLength) + MIN_NUM);
      }
      
      // for shuffling array element 
      for (let i = arr.length - 1; i >= 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[randomIndex];
        arr[randomIndex] = temp;
      }

      setArr(arr);

   }

   function quicksort(){
 
    if(isSorted)
     return ;
         
      const animation = getQuickSortAnimations(arr);
      animateArray(animation);
   }


   function bubblesort(){
 
    if(isSorted)
     return ;

     
      const animation = GetBubblsort(arr);
      animateArray(animation);
   }


   function animateArray(animation)
   {
       if(isSorting)
       return;
      
       setSorting(true);
      
      animation.forEach(([comparison , swapped] , index) =>{
            setTimeout(() =>{
               
                if(!swapped)
                {
                    if(comparison.length === 2){
                        const [i,j]= comparison;
                        animateArrayAccess(i);
                        animateArrayAccess(j);
                    }
                   else
                    {
                        const [i] =comparison;
                        animateArrayAccess(i);
                    }                 
                }
               else
               {
                   setArr((preArr) =>{
                        const [k,newValue]=comparison;
                        const newArr = [...preArr];
                        newArr[k]=newValue;
                        return newArr;
                   });   
               } 
            } , index * DELAY )      
      } );

     
      setTimeout(()=>{
          animateSortedArray();
      } , animation.length * DELAY);
       
   }

   function animateArrayAccess(index)
   {
       const arrayBars = containerRef.current.children;
       const arrayBarstyle = arrayBars[index].style;

       setTimeout(()=>{
         arrayBarstyle.backgroundColor = ACCESSED_COLOUR;
       },DELAY);
        
       setTimeout(()=>{
        arrayBarstyle.backgroundColor = '';
      },DELAY * 2);
      
   }
 
   function animateSortedArray(){
     
     

       const arrayBars = containerRef.current.children;
        
       for(let i=0;i<arrayBars.length ;i++)
       {
           const arrayBarStyle = arrayBars[i].style;

          setTimeout(() => {
              arrayBarStyle.backgroundColor = SORTED_COLOUR
          },arrayBars.length*DELAY ); 
       }

       setTimeout(()=>{
         setIsSorted(true);
         setSorting(false);      
       } , DELAY);
        
   }

   function resetArrayColour() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arr.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      arrayBarStyle.backgroundColor = '';
    }
  }




  
    return (
        <div className="visualiser-container">
            <h1> Lets complete today </h1>
           <div className="array-container" ref={containerRef}>
              {
                  arr.map((barHeight,index) =>(
                       <div 
                       className="array-bar"
                       style={{
                           height: `${barHeight}vmin`,
                           width : `${100/ArrayLength}vw`,  
                       }}
                       ket = {index} 
                       > </div>  
                  ) )
              }  
           </div>  

           <div className="app-footer">
               <ul>
               <li>
                   <button className="app-button" onClick={initialiseArray}>
                          Create new array 
                  </button>
                  <button className="app-button" onClick={quicksort}>
                          Quick sort 
                  </button> 
                  <button className="app-button" onClick={bubblesort}>
                          Bubble sort 
                  </button> 

               </li>
               </ul> 
           </div> 

        </div>
    );
}

export default SortVisualiser;

