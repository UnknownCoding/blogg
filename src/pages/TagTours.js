import React, { useEffect } from "react";
import {MDBCard,MDBCardTitle,MDBCardText,MDBCardBody,MDBCardImage,MDBRow,MDBCol,MDBBtn,MDBCardGroup,} from "mdb-react-ui-kit";
import Spinner from "../components/Spinner";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { tagTours } from "../redux/features/tourSlice";

const TagTours = () => {
    const { tagsTours, loading } = useSelector((state) => ({ ...state.tour }));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tag } = useParams();

    const excerpt = (str) => {
        if(str.length > 45){
            str = str.substring(0,45) + "..."
        }
        return str
    }

    useEffect(()=>{
        if(tag){
            dispatch(tagTours(tag))
        }
    },[tag])

    if (loading) {
        return <Spinner/>;
    }
    return (
        <div style={{margin: "auto",padding: "120px",maxWidth: "900px",alignContent: "center",}}>
            <h3 className="text-center">Tours with tag: {tag}</h3>
            <hr style={{ maxWidth: "570px" }} />
            {tagTours && tagsTours.map((item) => (
                <MDBCardGroup key={item._id}>
                    <MDBCard style={{ maxWidth: "600px" }} className="mt-2">
                        <MDBRow className="g-0">
                            <MDBCol md="4">
                            <MDBCardImage className="rounded" src={item.imageFile} alt={item.title} fluid/>
                            </MDBCol>
                            <MDBCol md="8">
                                <MDBCardBody>
                                    <MDBCardTitle className="text-start">
                                        {item.title}
                                    </MDBCardTitle>
                                    <MDBCardText className="text-start">
                                        {excerpt(item.description, 40)}
                                    </MDBCardText>
                                    <div style={{ float: "left", marginTop: "-10px" }}>
                                        <MDBBtn size="sm" rounded color="info" onClick={() => navigate(`/tour/${item._id}`)}>
                                            Read More
                                        </MDBBtn>
                                    </div>
                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCardGroup>
            ))}
        </div>
    )
}

export default TagTours