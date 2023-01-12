
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

function Popup_validate(props) {


  return (
    <>
      <div>
        {/* <Button onClick={props.handleOpen}>Open modal</Button> */}
        <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.type}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {props.msg}
            </Typography>
            {/* --buttons-- */}
            <Stack direction="row" spacing={2} sx={{ margin: "2rem 0 0 0", justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={props.handleClose}>
                Cancel
              </Button>
              <Button variant="outlined" >
                Confirm
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    </>
  )
}

export default Popup_validate