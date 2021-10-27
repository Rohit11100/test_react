import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getApprovedProducts , delApprovedProducts, wishList_data} from "../Redux/Action/Actionfunction";









const Wishlist = () => {
  const [list, setList] = useState();
  const [wish, setWish] = useState();
 
  const dispatch = useDispatch();
  const selector = useSelector(state => state.Reducerfunction);
  useEffect(() => {
    dispatch(getApprovedProducts());
    dispatch(wishList_data());
  // Safe to add dispatch to the dependencies array
  }, [dispatch])
   //dispatch({getApprovedProducts()})
  useEffect(() => {
    //dispatch(getApprovedProducts())
    let myresult =selector.approvedProducts.filter(function (o1) {
      
      //console.log(o1);
      return   selector.wishlist_data.some(function (o2) {
        //console.log('favi    ' + o2.product_details[0]);
        
        return o1._id === o2.product_details[0];
   });
  }).map((e)=>{
    //console.log(e);
     return e 
  })
  setList(myresult);
  }, [selector])

 

 
  // let iid = selector.wishlist_data.filter((r)=>{
  //  //console.log(r._id);
  //  return r._id

  // }).map((r)=>{
  //   return r._id
  // })
  



  

  

 
 




    






  
  //console.log();

  
 

  const handleDelete = (index,id) => {
    //alert(id);

   
    let iidd= selector.wishlist_data.filter((q)=>{
        return id === q.product_details[0]
    }).map((q)=>{
      return q._id
    })

    //console.log();

   
     dispatch(delApprovedProducts(index, iidd))
    // let del = list && list.filter((e,i)=>{
    //   e.splice(i,1)
    //  return e
    // }).map((r,i)=>{
    //   console.log(i);




     
    // })
    // swal({
    //   title: "Are you sure?",
    //   text: "Are you sure you want to delete item from cart ?",
    //   icon: "warning",
    //   buttons: true,
    //   dangerMode: true
    // }).then(willDelete => {
    //   if (willDelete) {
    //     swal("Your wishlist item has been deleted!", {
    //       icon: "success"
    //     });
    //     list.splice(index, 1);
    //     setList([...list]);
    //   } else {
    //     swal({
    //       title: "Sure",
    //       text: "Your wishlist is safe!",
    //       icon: "success"
    //     });
    //   }
    // });
  };











