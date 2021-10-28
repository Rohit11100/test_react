import Select from 'react-select';

 let myddat = products?.map((product)=>{
    return({ value: product._id, label: product.title ? product.title : `product ${product._id}` })
  })

  
  const options = [myddat]
  console.log(options);



 <Select
                            isMulti
                            name="Product_id"
                            options={options[0]}
                            className="basic-multi-select"
                            onChange={(e) => setSelectval({...selectval , value :e} )}
                            //onChange={handleChange}
                            
                            />
