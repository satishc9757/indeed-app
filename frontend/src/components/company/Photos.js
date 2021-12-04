import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import {connect} from 'react-redux'
import Grid from '@material-ui/core/Grid'
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera'
import { Modal } from '@material-ui/core'
import { Box } from '@mui/system'
import axios from 'axios';
import backendServer from '../../webConfig';
import ImageUpload from '../../pages/company/uploadProfile'
import PhotosUpload from '../../pages/company/uploadPhotos'
import store from '../../redux/store'

const styles = (theme) => ({
    ...theme.spread,
    img : {
        marginTop : '10px',
        height : "160px",
        width : "160px",
        backgroundSize: 'contain'
    },
    title : {
        fontSize : '30px',
        fontWeight : 700,
    },
    cnt : {
        marginTop : '30px',
        fontSize : '20px',
        // fontWeight : 700,
    },
    upload : {
        marginTop : '10px',
        marginBottom : '10px',
        color : 'white',
        padding : '10px 40px',
        textTransform : 'capitalize',
        borderRadius : '30px',
        backgroundColor : '#085FF7',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    },
})

const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
class Photos extends Component {
    state = {
        photos:[],

        open:false
    }
    
    async componentDidMount(){
        var response = await axios.get(`${backendServer}/company/photos?compId=${sessionStorage.getItem('emp_company_id')}`)
        
        await this.setState({
            photos: response.data
        })
    }
    
    render() {
        const handleOpen = () => {
        
            this.setState({open: true})
        }
      const  handleClose = () => {
        
            this.setState({open: false})
    }
    
        const { classes } = this.props
        const { comp_name } = this.props.company.selectedCompany
        const { photos } = this.state

        const appropriatePhotos = photos !== undefined && photos.filter(photo => {
            return photo.inappropriate === 0
        })

        let displayPhotos = appropriatePhotos && appropriatePhotos.map((data) => (
            <Grid item xs={3}>
                <div className={classes.img} style={{backgroundImage: `url(${data.comp_photos})`}}>
                </div>
            </Grid>
        ))

        return (    
            <Grid container >
                <Grid container item xs={12}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={11} className={classes.title}>
                        <LinkedCameraIcon style={{fontSize : '27px'}}/> <span style={{marginInline : '10px'}}>{comp_name} photos </span>
                    </Grid>
                </Grid>
                <Grid container item xs={12}>
                    <Grid item xs={1}>
                    </Grid>
                    <Grid item xs={5} className={classes.cnt}>
                        {appropriatePhotos.length} photos
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            onClick={handleOpen}
                            className={classes.upload}>
                            Upload a Photo
                        </Button>

                        <Modal
                        open={this.state.open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box sx={style1}>
                            <PhotosUpload handleClose= {handleClose} />
                        </Box>
                        </Modal>
                    </Grid>
                    <Grid item xs={3}>
                    </Grid>
                </Grid>
                <Grid item xs={1}>
                </Grid>
                <Grid container item direction="row" xs={7}>
                    {displayPhotos}
                </Grid>
                <Grid item xs={3}>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    company : state.company,
})

export default connect(mapStateToProps, {} )(withStyles(styles)(Photos))
