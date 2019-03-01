import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';
import Chip from '@material-ui/core/Chip';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper'
import { Redirect } from 'react-router-dom';
// import Select from 'react-select';
import SampleData from './SampleData.js';
import TextField from '@material-ui/core/TextField';
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    width: '100%',
    maxWidth: 500,
    padding: 50,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
};

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      zipcode: props.zipcode,
      userPlants: props.plants,
      open: false,
      description: '',
      image: '',
      loggedIn: false,
      currency: 'Select',
      userId: this.props.id,
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
    this.toggleButton = this.toggleButton.bind(this);
  }

  // remove plant from your plants completely
  deleteButton(plantId) {
    console.log('delete button clicked');
    console.log(this.state.userId);
    console.log('works', plantId);
    const { userId } = this.state;
    axios({
      method: 'delete',
      url: '/plant',
      data: {
        username: userId,
        plantid: plantId,
      },
    })
      .then(() => console.log('plant removed'))
      .catch((err) => { console.log('could not delete plant', err); });
  }

  // toggle to indicate no more plucking, but still on your plant profile
  toggleButton() {
    console.log('toggle button clicked');
    // const { userId } = this.state;
    // const { plantId } = this.props;
    // axios.post('/user/toggle', { userId, plantId })
    //   .then(() => console.log('plant toggled'))
    //   .catcch((err) => { console.log(`${err} in toggling plant`); });
  }
  // for the form that adds a plant demo version
  handleClickOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

// render username, zip, and user plants dynamically
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography
          variant="h5"
          gutterBottom
          // align="center"
        >
          {this.state.username.toUpperCase()}
        </Typography>

        <Typography
          variant="subtitle1"
          gutterBottom
        >
          {this.state.zipcode}
        </Typography>

        <div className={classes.root}>

          <Typography
            variant="subtitle1"
            gutterBottom
          >
          Your Plants
          </Typography>

          {this.state.userPlants === undefined ? null : this.state.userPlants.map((plant) => {
            return (
              <Card className={classes.card} key={plant.id}>
                <CardHeader
                  title={plant.title}
                />
                <CardMedia
                  className={classes.media}
                  image={plant.imagelink}
                  title={plant.title}
                />
                <CardContent>
                  <Typography component="p">
                    {plant.description}
                  </Typography>
                </CardContent>
                <IconButton aria-label="delete this plant" onClick={this.deleteButton(plant.id)}>
                  <DeleteOutlinedIcon className={classes.icon} />
                </IconButton>
                <IconButton aria-label="toggle on and off" onClick={this.toggleButton}>
                  {/* <Toggle style={iconStyles} color={red500} hoverColor={greenA200} /> */}
                  <FavoriteIcon />
                </IconButton>
              </Card>
            );
          })
          }
        </div>
        <div>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            Add a Plant
        </Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add a new plant for fellow Pluckers to Pluck! 
            </DialogContentText>
              <TextField
                id="outlined-with-placeholder"
                label="Pluck Me!"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-with-placeholder"
                label="Address"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
              <TextField
                id="outlined-with-placeholder"
                label="Zip Code"
                placeholder="Placeholder"
                className={classes.textField}
                margin="normal"
                variant="outlined"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Subscribe
            </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(MyProfile);
