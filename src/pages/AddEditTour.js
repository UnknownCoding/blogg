import React, { useEffect, useState } from 'react'
import {MDBCard,MDBCardBody,MDBValidation,MDBBtn,MDBInput,} from "mdb-react-ui-kit";
import ChipInput from 'material-ui-chip-input'
import FileBase from 'react-file-base64'
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { getTours, tourCreate, updTour } from '../redux/features/tourSlice';


const initialState = {
    title: "",
    description: "",
    tags: [],
};

const AddEditTour = () => {
    const [tourData,setTourData] = useState(initialState);
    const [tagerror,setTagError] = useState(null)
    const {title,description,tags} = tourData;
    const {error,loading,userTours} = useSelector((state)=>({...state.tour}))
    const {user} = useSelector((state)=>({...state.auth}))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams();

    useEffect(()=>{
        if(id){
            const singleTour = userTours.find((tour)=>{
                return tour._id === id
            })
            setTourData({...singleTour})
        }
    },[id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!tags.length){
            setTagError("Please provide som tags")
        }
        if(title&&description&&tags){
            const updatedTourData = {...tourData,name:user?.result?.name}
            if(!id){
                dispatch(tourCreate({ updatedTourData, navigate, toast }));
            }else{
                console.log(updatedTourData)
                dispatch(updTour({ id,updatedTourData, navigate, toast }))
            }
            handleClear()
        }
    }
    useEffect(()=>{
        error && toast.error(error) 
    },[error])

    const onInputChange = (e) => {
        const {name,value} = e.target
        setTourData({...tourData,[name]:value})
    }

    const handleAddTag =(tag) => {
        setTagError(null);
        setTourData({...tourData,tags:[...tourData.tags,tag]})
    }

    const handleDeleteTag =(Deltag) => {
        setTourData({...tourData,tags:tourData.tags.filter((tagz)=>tagz !== Deltag)})
    }


    const handleClear =() => {
        setTourData({ title: "", description: "", tags: [] });
    }



    return (
        <div style={{margin: "auto",padding: "15px",maxWidth: "450px",alignContent: "center",marginTop: "120px",}}className="container">
            <MDBCard alignment="center">
                <h5>{id ? "Update Tour " : "Add Tour "}</h5>
                <MDBCardBody>
                    <MDBValidation onSubmit={handleSubmit} className="row g-3" noValidate>
                            <div className="col-md-12">
                                <MDBInput
                                    placeholder="Enter Title"
                                    type="text"
                                    value={title || ""}
                                    name="title"
                                    onChange={onInputChange}
                                    className="form-control"
                                    required
                                    invalid
                                    validation="Please provide title"
                                />
                            </div>
                            <div className="col-md-12">
                                <MDBInput
                                    placeholder="Enter Description"
                                    type="text"
                                    value={description}
                                    name="description"
                                    onChange={onInputChange}
                                    className="form-control"
                                    required
                                    invalid
                                    textarea
                                    rows={4}
                                    validation="Please provide description"
                                />
                            </div>
                            <div className="col-md-12">
                                <ChipInput
                                    name="tags"
                                    variant="outlined"
                                    placeholder="Enter Tag"
                                    fullWidth
                                    value={tags}
                                    onAdd={(tag) => handleAddTag(tag)}
                                    onDelete={(tag) => handleDeleteTag(tag)}
                                />
                                {tagerror && <div className="tagErrMsg">{tagerror}</div>}
                            </div>
                            <div className="d-flex justify-content-start">
                                <FileBase
                                    type="file"
                                    multiple={false}
                                    onDone={({ base64 }) =>
                                    setTourData({ ...tourData, imageFile: base64 })}
                                />
                            </div>
                            <div className="col-12">
                                <MDBBtn style={{ width: "100%" }}>
                                    {id ? "Update " : "Submit"}
                                </MDBBtn>
                                <MDBBtn style={{ width: "100%" }} className="mt-2" color="danger" onClick={handleClear}>
                                    Clear
                                </MDBBtn>
                            </div>
                    </MDBValidation>
                </MDBCardBody>
            </MDBCard>
        </div>
    )
}

export default AddEditTour