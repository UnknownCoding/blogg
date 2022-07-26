import React from "react";
import {MDBCard,MDBCardBody,MDBCardTitle,MDBCardText,MDBCardImage,MDBCardGroup,MDBBtn,MDBIcon,MDBTooltip,} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setlikes } from "../redux/features/tourSlice";

const CardTour = ({imageFile,description,title,tags,_id,name,likes}) => {
    
    const { user } = useSelector((state) => ({ ...state.auth }));
    const userId = user?.result?._id || user?.result?.googleId; 
    const dispatch = useDispatch()
    const excerpt = (str) => {
        if(str.length > 45){
            str = str.substring(0,45) + "..."
        }
        return str
    }

    const LikesFunc = () =>{
        return(
            <>
                <MDBIcon fas icon="thumbs-up" />
                &nbsp;Error

            </>
        )
    }
    
    const handleLike = () =>{
        dispatch(setlikes({_id}))
    }

    return (
        
        <MDBCardGroup>
            <MDBCard className="h-100 mt-2 d-sm-flex" style={{ maxWidth: "20rem" }}>
                <MDBCardImage src={imageFile} alt={title} position="top" style={{ maxWidth: "100%", height: "180px" }}/>
                <div className="top-left">{name}</div>
                <span className="text-start tag-card">
                    {tags.map((tag) => (
                        <Link to={`/tours/tag/${tag}`}> #{tag}</Link>
                    ))}
                    <MDBBtn style={{ float: "right" }} tag="a" color="none" onClick={handleLike}>
                        <LikesFunc />
                    </MDBBtn>

                </span>
                <MDBCardBody>
                        <MDBCardTitle className="text-start">{title}</MDBCardTitle>
                        <MDBCardText className="text-start">
                            {excerpt(description)}
                            <Link to={`/tour/${_id}`}>Read More</Link>
                        </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </MDBCardGroup>
    )
}

export default CardTour