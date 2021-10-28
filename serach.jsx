/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 28/10/2021 - 11:06:17
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 28/10/2021
    * - Author          : 
    * - Modification    : 
**/
import HomePage from "../../Layout/home";
import { Container, Row, Col } from "react-bootstrap";
import classes from "./search.module.scss";
import productData from "../../Layout/fakeData.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faStar } from "@fortawesome/fontawesome-free-solid";
import Link from "next/link";
import { useEffect, useState , useRef } from "react";
import { UserConsumer } from "../../Layout/usercontext";
import { findAndReplace } from "../../components/common_function";
import { useDispatch, useSelector } from "react-redux";
import { getApprovedProducts , seachvalue } from "../../Redux/Action/Actionfunction";

const search = () => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state)

  const myddata = useRef(null)
  const [local, setLocal] = useState(selector.Reducerfunction.searchval);
  const [search, setSearch] = useState("");
  const [displaytData, setDisplayData] = useState();

  const handleShop = id => {
    if (typeof window !== "undefined") {
      localStorage.setItem("product_id", JSON.stringify(id));
    }
  };
  
  console.log("local ", local);
  useEffect(() => {
     if (typeof window != "undefined") {
      //setLocal(JSON.parse(localStorage.getItem("search")));
      dispatch(getApprovedProducts())
      setLocal(selector.Reducerfunction.searchval);
      setDisplayData(selector.Reducerfunction.approvedProducts);
      console.log(selector.Reducerfunction,'okok')           
    }
  }, [selector]);

  
  // useEffect(() => {
  //   console.log('2')
  //   dispatch(seachvalue())
  //     }, [dispatch])
  useEffect(() => {
    console.log('3')
    if (typeof window != "undefined") {
      //setLocal(JSON.parse(localStorage.getItem("search")));
      setLocal(selector.Reducerfunction.searchval);
      setDisplayData(selector.Reducerfunction.approvedProducts);
     
    }},[selector]
    const myData = selector.Reducerfunction.approvedProducts?.filter((item) => {
      let keep = true;
      if(item.title && local){
        keep = keep && item.title.toLowerCase().includes(local.toLowerCase())
      }
      return keep
           //return item.title.toLowerCase().includes(local.toLowerCase())



      // item.product_category?.filter((i) => {
      //   if (i.value.toLowerCase().includes(local.toLowerCase())) {
      //     console.log("ttttt ", i)
      //     return i.value.toLowerCase().includes(local.toLowerCase())
      //   } else if (item.title.toLowerCase().includes(local.toLowerCase())) {
      //     return item.title.toLowerCase().includes(local.toLowerCase())
      //   }
      // })
    })

console.log(displaytData);

    console.log("item.title.toLowerCase().includes(local.toLowerCase()) ", myData);
    const filter = selector.Reducerfunction.approvedProducts?.filter((item, index) => {
      let keep = true;
      if(item.title && local){
        if (item.title.toLowerCase().includes(local.toLowerCase())) {
          keep = keep &&  item.title.toLowerCase().includes(local.toLowerCase());
           }

      }else if(item.brief_description &&  local){
         if (item.brief_description.includes(local)) {
          keep = keep &&  item.brief_description.toLowerCase().includes(local.toLowerCase());
           }

      }else{
        keep = setDisplayData({data:[]})
      }
      return keep
    });

   // const filter = selector.Reducerfunction.approvedProducts?.filter((item, index) => {
      // if (item.title.includes(local)) {
      //   return item.title.toLowerCase().includes(local.toLowerCase());
      // } else if (item.brief_description.includes(local)) {
      //   return item.brief_description.toLowerCase().includes(local.toLowerCase());
      // } else setDisplayData({ data: [] });
   // });
    setDisplayData({
      data: myData
        .sort((a, b) => (a.price > b.price ? 1 : -1))
        .map((item, i) => item)
    });
    // console.log("productData ", filter, displaytData);
  }, [selector]);

  const handlefilter = e => {
    console.log("ee ", e.target.value);
    const { name, value } = e.target;
    if (value === "Price(0-9)") {
      const sortData = displaytData.data
        .sort((a, b) => (a.price > b.price ? 1 : -1))
        .map((item, i) => item);
      setDisplayData({ data: sortData });
    }
    if (value === "Price(9-0)") {
      const sortData = displaytData.data
        .sort((a, b) => (a.price < b.price ? 1 : -1))
        .map((item, i) => item);
      setDisplayData({ data: sortData });
    }
    if (value === "Name(A-Z)") {
      const sortData = displaytData.data
        .sort((a, b) => (a.title > b.title ? 1 : -1))
        .map((item, i) => item);
      setDisplayData({ data: sortData });
    }
    if (value === "Name(Z-A)") {
      const sortData = displaytData.data
        .sort((a, b) => (a.title < b.title ? 1 : -1))
        .map((item, i) => item);
      setDisplayData({ data: sortData });
    }
  };


 //console.log(displaytData.data);
//  displaytData && displaytData.map((e)=>{
//    console.log(e);
//  })



  return (
    
    <HomePage footer={true} category={true}>
      

      <Row>
      
        <Col>
          <div className={classes.products}>
            <Container>
              <div className="form-group">
                <label>Sort By :-</label>
                <select className="form-control" onChange={handlefilter}>
                  <option value="" selected hidden disabled>
                    select...
                  </option>
                  <option value="Price(0-9)">Price(0-9)</option>
                  <option value="Price(9-0)">Price(9-0)</option>
                  <option value="Name(A-Z)">Name(A-Z)</option>
                  <option value="Name(Z-A)">Name(Z-A)</option>
                </select>
              </div>
              <div className={classes.sliderTitle}>
                <Row>


                   
             
                  {/* {displaytData && displaytData.map((item, index) => (
                      <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                        {console.log("itemmmm data", item)}
                        <div className={classes.sliderBox}>
                          <div className={classes.productListPanel}>
                            <div key={index} className={classes.ProductBox}>
                              <div className={classes.salesBadge}>
                                {(
                                  ((item.seller_price - item.price.regularPrice) *
                                    100) /
                                  item.seller_price
                                ).toFixed(0) + "% OFF"}
                              </div>
                              <div
                                className={classes.producticons}
                                onClick={() => {
                                  handleShop(item.id);
                                }}
                              >
                                <Link
                                  href="/shop/product/[link]"
                                  as={`/shop/product/${(findAndReplace(
                                    item.title
                                  ),
                                    " ",
                                    "-")}`}
                                >
                                  <a>
                                    <img
                                      className="d-block"
                                      src={
                                        item.product_SKU_images
                                          ? item.product_SKU_images[0]
                                          : "https://wallpaperaccess.com/full/1588284.jpg"
                                      }
                                      title={
                                        item.product_name
                                          ? item.product_name
                                          : item.title
                                      }
                                    />
                                  </a>
                                </Link>
                              </div>
                              <div className={classes.wish}>
                                <a href="#">
                                  <i className="bi bi-heart"></i>
                                </a>
                              </div>
                              <div
                                className={classes.ProductName}
                                title={
                                  item.product_name
                                    ? item.product_name
                                    : item.title
                                }
                              >
                                {item.product_name
                                  ? item.product_name.length > 25
                                    ? item.product_name.substring(0, 25) + "..."
                                    : item.product_name
                                  : item.title
                                    ? item.title.length > 25
                                      ? item.title.substring(0, 25) + "..."
                                      : item.title
                                    : ""}
                              </div>
                              <div className={classes.productPrice}>
                                <div className={classes.productpriceBlue}>
                                  <img
                                    className="d-block"
                                    src={"/images/peso.svg"}
                                  />
                                  {item.price.regularPrice ? parseFloat(item.price.regularPrice).toFixed(2) : 0}
                                </div>
                                <div className={classes.productPriceOff}>
                                {parseInt(item.seller_price).toFixed(2)}
                                </div>
                              </div>
                              <div className={classes.salesEndingSoon}>
                                Sales Ending Soons
                              </div>
                              <div className={classes.priceMatch}>
                                <FontAwesomeIcon icon={faTag} /> Price match
                                Guarantee
                              </div>
                              <div className={classes.rating}>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                              </div>
                              <div className={classes.shipingDate}>
                                1 Day shipping, Get it done By Sun, Jun 27
                              </div>
                              {item.stock > 0 ? (
                                <Link
                                  href="/shop/product/[link]"
                                  as={`/shop/product/${(findAndReplace(
                                    item.title
                                  ),
                                    " ",
                                    "-")}`}
                                >
                                  <a
                                    title="Quick Shop"
                                    className={classes.QuickShop}
                                    onClick={() => {
                                      handleShop(item.id);
                                    }}
                                  >
                                    + Quick Shop
                                  </a>
                                </Link>
                              ) : (
                                  <Link
                                    href="/shop/product/[link]"
                                    as={`/shop/product/${(findAndReplace(
                                      item.title
                                    ),
                                      " ",
                                      "-")}`}
                                  >
                                    <a
                                      title="Out of Stock"
                                      className={classes.OutofStock}
                                      // style={{ backgroundColor: "#deebf7" }}
                                      onClick={() => {
                                        handleShop(item.id);
                                      }}
                                    >
                                      + Out of Stock
                                  </a>
                                  </Link>
                                )}
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))} */}
                    {/* {
                      displaytData && displaytData?.map((w)=>{
                        console.log(w)
                      })
                    } */}
                  
                </Row>
              </div>
            </Container>
          </div>
        </Col>
      </Row>
    </HomePage>
  );
};
export default search;
