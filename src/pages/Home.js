import React, { useEffect } from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getTours, setCurrentPage } from '../redux/features/tourSlice';
import CardTour from '../components/CardTour';
import Spinner from '../components/Spinner';
import Pagination from '../components/Pagination';

const Home = () => {
    const {tours,loading,currentPage,numberOfPages,} = useSelector((state)=>({...state.tour}))
    console.log(tours)
    const dispatch = useDispatch()

    const excerpt = (str) => {
        if(str.length > 45){
            str = str.substring(0,45) + "..."
        }
        return str
    }
    
    useEffect(()=>{
        dispatch(getTours(currentPage))
    },[currentPage])
    
    if(loading){
        return <Spinner/>
    }
    return (
        <div style={{margin: "auto",padding: "15px",maxWidth: "1000px",alignContent: "center",}}>
                <MDBRow className="mt-5">
                    {tours.length === 0 && (
                        <MDBTypography className="text-center mb-0" tag="h2">
                            No Tours Found
                        </MDBTypography>
                    )}
                    
                    <MDBCol>
                        <MDBContainer>
                            <MDBRow className="row-cols-1 row-cols-md-3 g-2">
                                {tours && tours.map((item) =>
                                    <CardTour key={item._id} {...item} />
                                )}
                            </MDBRow>
                        </MDBContainer>
                    </MDBCol>
                </MDBRow>
                <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} numberOfPages={numberOfPages} dispatch={dispatch}/>
        </div>
    )
}

export default Home