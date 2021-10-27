case WISHLIST_DATA_Del: {
      const stateTemp = [
        ...state.wishlist_data.slice(0, payload),
        ...state.wishlist_data.slice(payload + 1)
      ];
      return {
        ...state,
        wishlist_data: stateTemp
      };
    }
    
    
    
    
    
    export const addtoWishlist = data => dispatch => {
  if (typeof window != "undefined") {
    const local = JSON.parse(localStorage.getItem("token"));
    console.log(`${HTTPURL}wishList/wishList/${local.id}`);
    axios
      .post(`${HTTPURL}/wishList/wishList/${local.id}`, {
        product_details: data
      })
      .then(response => {
        dispatch({
          type: ADD_TO_WISHLIST,
          payload: response.data
        });
        swal({
          text: "Item added to Wishlist",
          title: "Sucess",
          icon: "success"
        });
      })
      .catch(err => {
        dispatch({ type: ADD_TO_WISHLIST, payload: err });
        swal({
          title: "Failed",
          icon: "error",
          text: `${JSON.stringify(err, null, 2)}`
        });
      });
  }
};

export const deletetoWishlist = index => dispatch => {
  //   let local;
  if (typeof window !== "undefined") {
    let local = JSON.parse(localStorage.getItem("wishlist"));
    local.splice(index, 1);
    localStorage.setItem("wishlist", JSON.stringify(local));
    dispatch({
      type: DELETE_TO_WISHLIST,
      payload: index
    });
  }
};

export const wishList_data = () => dispatch => {
  //   let local;
  if (typeof window !== "undefined") {
    let local = JSON.parse(localStorage.getItem("token"));
    if(local){ 
      console.log(`${HTTPURL}/wishList/user/${local.id}`);     
      axios
      .get(`${HTTPURL}/wishList/user/${local.id}`)
      .then(response => {
        dispatch({
          type: WISHLIST_DATA,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: WISHLIST_DATA,
          payload: { data: false, err }
        });
      });
    // console.log("local", local);

    }
  }
};

// axios.delete(`${HTTPURL}/wishList/delete/${id}`)

export const delApprovedProducts = (index,  _id) => dispatch => {
  
    if (typeof window != "undefined") {
      //const token = JSON.parse(localStorage.getItem("token"));
      //window.open(`http://localhost:4000/wishList/delete/${_id}`);
      //console.log(`${HTTPURL}/wishList/delete/${idd}`);
     // console.log(token);
      axios
        .delete(`http://localhost:4000/wishList/delete/${_id}`)
        .then(response => {
          dispatch({
            type: WISHLIST_DATA_Del,
            payload: index
          });
          
        })
        .catch(err => {
          dispatch({ type: WISHLIST_DATA_Del, payload: { data: false, err } });
        
        });
    }
  };
