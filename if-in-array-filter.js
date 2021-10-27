useEffect(() => {
  const filterdaa = selector.Reducerfunction.approvedProducts?.filter((i) =>{
    console.log(i.title);
    let keep = true;
    if(i.title){
      keep = keep && i.title.toLowerCase().includes(local.toLowerCase())
    }
    return keep

  });
       
