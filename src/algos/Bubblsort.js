export function GetBubblsort(arr)
{
    const animation = [];
    const copy = [...arr];
    bubblesort(copy , 0 , arr.length -1 , animation ); 
    return animation;
}

function  bubblesort(arr ,left , right , animation )
{
    for(let i=0;i<=right;i++)
    {  
        for(let j=1;j<=right - i;j++)  
         {
            
            if(arr[j-1] > arr[j])
            {  
                animation.push([[j , arr[j-1]] , true]);
                animation.push([[j-1 , arr[j]] , true]);   
                swap(arr,j-1,j);
            }
           else
            {
              animation.push([[j] , false]);
              animation.push([[j-1] , false]);
              
            } 
         }
    } 
   
    return animation;

}

function swap(arr ,i , j)
{
     let temp = arr[j];
     arr[j]=arr[i];
     arr[i]=temp;

}
